type SellerPageTitleProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export default function SellerPageTitle({
  title,
  subtitle,
  action,
}: SellerPageTitleProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-neutral-400">{subtitle}</p>
        ) : null}
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
}