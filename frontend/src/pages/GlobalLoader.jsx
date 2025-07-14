import React from "react";
// import { Skeleton } from "@/components/ui/skeleton";

const GlobalLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* <Skeleton className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin " /> */}
      {/* <Skeleton className="h-12 w-12 mb-4 bg-" /> */}
      {/* <Skeleton className="h-40 w-full bg-black" /> */}

      <div class="flex justify-center items-center h-screen">
        <div class="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
        <div class="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
        <div class="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
      </div>
    </div>
  );
};

export default GlobalLoader;
