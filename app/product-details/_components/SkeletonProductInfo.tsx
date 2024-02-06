import React from "react";

function SkeletonProductInfo() {
  return (
    <div className="flex flex-col gap-5">
      <div className="h-[20px] w-[400px] bg-slate-200  animate-pulse"></div>
      <div className="h-[20px] w-[70px] bg-slate-200  animate-pulse"></div>
      <div className="h-[20px] w-[400px] bg-slate-200  animate-pulse"></div>
      <div className="h-[20px] w-[400px] bg-slate-200  animate-pulse"></div>
      <div className="h-[20px] w-[100px] bg-slate-200  animate-pulse"></div>
      <div className="w-full px-4 pt-6 md:pt-0"></div>
    </div>
  );
}

export default SkeletonProductInfo;
