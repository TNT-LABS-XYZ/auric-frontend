export const Spinner = ({ className = "" }: { className?: string }) => (
  <div
    className={`inline-block w-8 h-8 border-[3px] border-[#EDEBE9] border-t-[#FFEA98] rounded-full animate-spin ${className}`}
  />
);

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#F5F4F2] rounded-md animate-pulse ${className}`} />
);

export const BalancesSkeleton = () => (
  <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
    <Skeleton className="h-3 w-16 mb-4" />
    <div className="flex justify-between items-center py-2">
      <Skeleton className="h-3.5 w-10" />
      <Skeleton className="h-4 w-20" />
    </div>
    <div className="flex justify-between items-center py-2 border-t border-[rgba(0,0,0,0.06)]">
      <Skeleton className="h-3.5 w-10" />
      <Skeleton className="h-4 w-16" />
    </div>
  </div>
);

export const RulesSkeleton = () => (
  <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
    <Skeleton className="h-3 w-20 mb-4" />
    <Skeleton className="h-3.5 w-48" />
  </div>
);

export const PriceSkeleton = () => (
  <div className="flex items-baseline justify-between px-1 mb-3 pb-3 border-b border-dashed border-[rgba(0,0,0,0.06)]">
    <Skeleton className="h-3 w-20" />
    <Skeleton className="h-4 w-24" />
  </div>
);
