export default function SkeletonLoader({ count = 3 }) {
  return (
    <div className="flex px-3 flex-wrap gap-4 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex relative w-[300px] h-auto flex-col bg-gray-50  animate-pulse rounded"
        >
          <div className="bg-gray-200 h-[220px] w-full rounded-t-xl" />
          {/* Skeleton for image */}
          <div className="p-4 md:px-3 md:py-4">
            <div className="bg-gray-200 w-[80%] h-6 mb-4 rounded" />
            {/* Skeleton for title */}
            <div className="flex justify-between gap-4 pt-4">
              <div className="bg-gray-300 w-[50%] h-9 rounded" />
              {/* Skeleton for edit button */}
              <div className="bg-gray-300 w-[50%] h-9 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
