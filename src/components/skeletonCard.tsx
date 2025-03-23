import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  className?: string;
}

export function SkeletonCard({ className = "" }: Props) {
  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <Skeleton className=" bg-gray-500/10 border-none  h-28" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-500/10" />
        <Skeleton className="h-4 w-[200px] bg-gray-500/10" />
      </div>
    </div>
  );
}
