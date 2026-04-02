import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

function readJson(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
}

function sortObjectEntries(value) {
  return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)));
}

function normalizeValue(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, child]) => [key, normalizeValue(child)])
    );
  }

  return value;
}

function getDirectDependencies(packageJson) {
  return sortObjectEntries({
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  });
}

function validateSpecValue(name, spec, policy, errors, sourceName) {
  if (typeof spec !== "string") {
    errors.push(`${sourceName} "${name}" must use a string version spec.`);
    return;
  }

  const trimmedSpec = spec.trim();
  if (policy.disallowedSpecValues.includes(trimmedSpec)) {
    errors.push(`${sourceName} "${name}" uses disallowed version "${trimmedSpec}".`);
  }

  if (policy.disallowedSpecPrefixes.some((prefix) => trimmedSpec.startsWith(prefix))) {
    errors.push(`${sourceName} "${name}" uses disallowed source "${trimmedSpec}".`);
  }
}

function validateNoUnsafeSpecs(entries, policy, errors, sourceName, parentKey = "") {
  for (const [name, spec] of Object.entries(entries)) {
    const qualifiedName = parentKey ? `${parentKey} > ${name}` : name;

    if (typeof spec === "string") {
      validateSpecValue(qualifiedName, spec, policy, errors, sourceName);
      continue;
    }

    if (spec && typeof spec === "object" && !Array.isArray(spec)) {
      validateNoUnsafeSpecs(spec, policy, errors, sourceName, qualifiedName);
      continue;
    }

    errors.push(`${sourceName} "${qualifiedName}" must use a string or nested override map.`);
  }
}

function compareExactMaps(actual, expected, label, errors) {
  const actualKeys = new Set(Object.keys(actual));
  const expectedKeys = new Set(Object.keys(expected));

  for (const key of expectedKeys) {
    if (!actualKeys.has(key)) {
      errors.push(`${label} is missing approved entry "${key}".`);
      continue;
    }

    const actualValue = JSON.stringify(normalizeValue(actual[key]));
    const expectedValue = JSON.stringify(normalizeValue(expected[key]));

    if (actualValue !== expectedValue) {
      errors.push(
        `${label} entry "${key}" changed from "${expectedValue}" to "${actualValue}". Update dependency-policy.json only after review.`
      );
    }
  }

  for (const key of actualKeys) {
    if (!expectedKeys.has(key)) {
      errors.push(`${label} contains unapproved entry "${key}". Review and add it to dependency-policy.json first.`);
    }
  }
}

function validateResolvedPackages(lockFile, policy, errors) {
  const allowedRegistries = policy.allowedRegistries ?? [];

  for (const [packagePath, pkg] of Object.entries(lockFile.packages ?? {})) {
    if (!pkg || pkg.link || !pkg.resolved) {
      continue;
    }

    if (!allowedRegistries.some((registry) => pkg.resolved.startsWith(registry))) {
      errors.push(
        `Package "${packagePath || "<root>"}" resolves from unapproved registry "${pkg.resolved}".`
      );
    }

    if (!pkg.integrity) {
      errors.push(`Package "${packagePath || "<root>"}" is missing an integrity hash in package-lock.json.`);
    }
  }
}

function validateInstallScripts(lockFile, policy, errors) {
  const actual = Object.entries(lockFile.packages ?? {})
    .filter(([, pkg]) => pkg?.hasInstallScript)
    .map(([packagePath]) => packagePath || "<root>")
    .sort();
  const expected = [...(policy.allowedInstallScriptPackages ?? [])].sort();

  if (actual.length !== expected.length || actual.some((value, index) => value !== expected[index])) {
    const actualDisplay = actual.join(", ") || "(none)";
    const expectedDisplay = expected.join(", ") || "(none)";
    errors.push(
      `Install-script package set changed.\nExpected: ${expectedDisplay}\nActual: ${actualDisplay}\nReview package lifecycle scripts before updating dependency-policy.json.`
    );
  }
}

function main() {
  const packageJson = readJson("package.json");
  const lockFile = readJson("package-lock.json");
  const policy = readJson("security/dependency-policy.json");
  const errors = [];

  if (lockFile.lockfileVersion !== 3) {
    errors.push(`package-lock.json lockfileVersion must stay at 3. Found ${lockFile.lockfileVersion}.`);
  }

  const directDependencies = getDirectDependencies(packageJson);
  const approvedDirectDependencies = sortObjectEntries(policy.approvedDirectDependencies ?? {});
  const overrides = sortObjectEntries(packageJson.overrides ?? {});
  const approvedOverrides = sortObjectEntries(policy.approvedOverrides ?? {});

  validateNoUnsafeSpecs(directDependencies, policy, errors, "Dependency");
  validateNoUnsafeSpecs(overrides, policy, errors, "Override");
  compareExactMaps(directDependencies, approvedDirectDependencies, "Direct dependency policy", errors);
  compareExactMaps(overrides, approvedOverrides, "Override policy", errors);
  validateResolvedPackages(lockFile, policy, errors);
  validateInstallScripts(lockFile, policy, errors);

  if (errors.length > 0) {
    console.error("Dependency policy check failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("Dependency policy check passed.");
  console.log(`Approved direct dependencies: ${Object.keys(directDependencies).length}`);
  console.log(
    `Approved install-script packages: ${
      Object.values(lockFile.packages ?? {}).filter((pkg) => pkg?.hasInstallScript).length
    }`
  );
}

main();
