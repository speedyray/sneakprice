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
    <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-neutral-950">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>
        ) : null}
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
}
