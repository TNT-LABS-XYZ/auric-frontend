import type { Strategy } from "../hooks/useAccount";

const styles: Record<Strategy["status"], string> = {
  active: "text-[#00B97D] bg-[rgba(0,185,125,0.1)]",
  paused: "text-[#C4880D] bg-[#FFF8F0]",
  completed: "text-[#201F1D] bg-[#F5F4F2]",
  cancelled: "text-[#96938E] bg-[#F5F4F2]",
};

const labels: Record<Strategy["status"], string> = {
  active: "Active",
  paused: "Paused",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const StatusBadge = ({ status }: { status: Strategy["status"] }) => (
  <span
    className={`text-[11px] font-medium px-2 py-0.5 rounded-[6px] ${styles[status]}`}
  >
    {labels[status]}
  </span>
);
