"use client";

import Image from "next/image";
import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import type { ListingFormState, ListingFormValues } from "@/lib/marketplace-form";

const brandSuggestions = ["Nike", "Jordan", "Adidas", "New Balance", "Asics", "Vans"];
const modelSuggestions = [
  "Air Jordan 1",
  "Air Jordan 4",
  "Dunk Low",
  "Air Max 95",
  "Yeezy Boost 350 V2",
  "Samba OG",
  "Campus 00s",
  "990v6",
];
const formConditions = [
  { value: "NEW", label: "New" },
  { value: "NEW_WITH_BOX", label: "New With Box" },
  { value: "USED", label: "Used" },
];
const formInputClassName =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black transition placeholder:text-neutral-500 focus:border-emerald-500/70 focus:outline-none";
const MAX_IMAGE_FILE_SIZE = 2 * 1024 * 1024;

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-2xl border border-emerald-600/30 bg-emerald-500/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700 transition hover:border-emerald-600/50 disabled:cursor-not-allowed disabled:border-black/10 disabled:bg-white disabled:text-neutral-500"
    >
      {pending ? "Saving..." : label}
    </button>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return (
    <p className="rounded-xl border border-rose-500/25 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-700">
      {error}
    </p>
  );
}

type ListingFormProps = {
  action: (state: ListingFormState, formData: FormData) => Promise<ListingFormState>;
  submitLabel: string;
  initialValues: ListingFormValues;
  listingId?: string;
};

export function ListingForm({
  action,
  submitLabel,
  initialValues,
  listingId,
}: ListingFormProps) {
  const [state, formAction] = useActionState(action, {
    status: "idle",
    values: initialValues,
  });
  const [selectedFileName, setSelectedFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialValues.imageUrl || null);
  const [clientImageError, setClientImageError] = useState<string | null>(null);

  const values = state.values;
  const previewSource = useMemo(() => previewUrl || values.imageUrl || null, [previewUrl, values.imageUrl]);

  return (
    <form
      action={formAction}
      className="mt-6 grid gap-4 sm:grid-cols-2"
      onSubmit={(event) => {
        if (clientImageError) {
          event.preventDefault();
        }
      }}
    >
      {listingId ? <input type="hidden" name="listingId" value={listingId} /> : null}

      <div className="col-span-full flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white px-4 py-3">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-600">
          Seller form with validation, image upload, and saved-state feedback
        </p>
        {state.status === "error" && state.message ? (
          <p className="text-sm text-rose-700">{state.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <input
          name="brand"
          list="brand-suggestions"
          placeholder="Brand (e.g., Nike)"
          className={formInputClassName}
          defaultValue={values.brand}
          required
        />
        <FieldError error={state.fieldErrors?.brand} />
      </div>

      <div className="space-y-2">
        <input
          name="model"
          list="model-suggestions"
          placeholder="Model (e.g., Air Jordan 1)"
          className={formInputClassName}
          defaultValue={values.model}
          required
        />
        <FieldError error={state.fieldErrors?.model} />
      </div>

      <div className="space-y-2">
        <input
          name="colorway"
          placeholder="Colorway (e.g., Bred Toe)"
          className={formInputClassName}
          defaultValue={values.colorway}
          required
        />
        <FieldError error={state.fieldErrors?.colorway} />
      </div>

      <div className="space-y-2">
        <input
          name="sku"
          placeholder="SKU / Style code (optional)"
          className={formInputClassName}
          defaultValue={values.sku}
        />
        <p className="text-xs text-neutral-500">
          Optional. Sellers can usually find this on the box label or inside the shoe tag.
        </p>
        <FieldError error={state.fieldErrors?.sku} />
      </div>

      <div className="space-y-2">
        <input
          name="size"
          placeholder="Size (e.g., 10.5)"
          className={formInputClassName}
          defaultValue={values.size}
          required
        />
        <FieldError error={state.fieldErrors?.size} />
      </div>

      <div className="space-y-2">
        <input
          name="price"
          type="number"
          min="1"
          step="0.01"
          placeholder="Ask price (USD)"
          className={formInputClassName}
          defaultValue={values.price}
          required
        />
        <FieldError error={state.fieldErrors?.price} />
      </div>

      <div className="space-y-2">
        <input
          name="retailPrice"
          type="number"
          min="1"
          step="0.01"
          placeholder="Retail price (optional)"
          className={formInputClassName}
          defaultValue={values.retailPrice}
        />
        <FieldError error={state.fieldErrors?.retailPrice} />
      </div>

      <div className="space-y-2">
        <select
          name="condition"
          className={formInputClassName}
          defaultValue={values.condition || "NEW"}
        >
          {formConditions.map((condition) => (
            <option key={condition.value} value={condition.value}>
              {condition.label}
            </option>
          ))}
        </select>
        <FieldError error={state.fieldErrors?.condition} />
      </div>

      <div className="col-span-full grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-2">
          <input
            name="imageUrl"
            type="url"
            placeholder="Image URL fallback (optional)"
            className={formInputClassName}
            defaultValue={values.imageUrl}
          />
          <FieldError error={state.fieldErrors?.imageUrl} />

          <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-black/15 bg-white px-4 py-3 text-sm text-neutral-700 transition hover:border-black/30">
            <span>{selectedFileName || "Upload listing image (JPG, PNG, WebP up to 2MB)"}</span>
            <span className="rounded-full border border-black/15 bg-white px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em]">
              Choose
            </span>
            <input
              name="imageFile"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (!file) {
                  setSelectedFileName("");
                  setClientImageError(null);
                  setPreviewUrl(initialValues.imageUrl || values.imageUrl || null);
                  return;
                }

                if (file.size > MAX_IMAGE_FILE_SIZE) {
                  setSelectedFileName(file.name);
                  setClientImageError("Image uploads must be 2MB or smaller.");
                  setPreviewUrl(initialValues.imageUrl || values.imageUrl || null);
                  event.currentTarget.value = "";
                  return;
                }

                setSelectedFileName(file.name);
                setClientImageError(null);

                const reader = new FileReader();
                reader.onload = () => setPreviewUrl(reader.result?.toString() ?? null);
                reader.readAsDataURL(file);
              }}
            />
          </label>
          <FieldError error={clientImageError || state.fieldErrors?.imageFile} />
        </div>

        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-4 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
            Preview
          </p>
          <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
            {previewSource ? (
              <Image src={previewSource} alt="Listing preview" fill className="object-contain" unoptimized />
            ) : (
              <div className="flex h-full items-center justify-center px-8 text-center text-xs uppercase tracking-[0.35em] text-neutral-500">
                Sneaker image preview
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-span-full">
        <SubmitButton label={submitLabel} />
      </div>

      <datalist id="brand-suggestions">
        {brandSuggestions.map((brand) => (
          <option key={brand} value={brand} />
        ))}
      </datalist>

      <datalist id="model-suggestions">
        {modelSuggestions.map((model) => (
          <option key={model} value={model} />
        ))}
      </datalist>
    </form>
  );
}
