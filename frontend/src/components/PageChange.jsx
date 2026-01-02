import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function PageChange({ totalCount, changePage, currentPage }) {
  // limit is hardcoded for now
  const limit = 5;
  const pageCount = Math.ceil(totalCount / limit);
  const [pageStart, setPageStart] = useState(1);
  const windowSize = 2;

  const handleRightSlider = (e) => {
    if(currentPage < (pageStart + windowSize -1) && (currentPage +1) <=pageCount) {
        changePage(currentPage +1);
    }
    else {
        if(pageStart +1 <= pageCount) {
            setPageStart(pageStart +1);
            changePage(pageStart +1);
        }
    }
  }
  const handleLeftSlider = (e) => {
      if(currentPage > 1 && pageStart < currentPage) {
          changePage(currentPage -1);
        }
        else {
        if(pageStart -1 > 0) {
            setPageStart(prev => prev-1);
        }
    }
  }
  return (
    <div className="bg-gray-800 flex justify-center items-center py-2 space-x-2">
      <div id="leftSlider"
        className="bg-slate-700 px-2 py-2 rounded-lg text-white cursor-pointer"
        onClick={handleLeftSlider}
      >
        <ChevronLeft />

      </div>
      {(() => {
        const items = [];
        for (let i = pageStart; i < (pageStart +windowSize) && i <= pageCount; i++) {
          items.push(
            <div
              className={`px-4 py-2 cursor-pointer select-none text-white rounded-lg ${currentPage==i?"bg-slate-500":"bg-slate-700"}`}
              onClick={() => changePage(i)}
              key={i}
            >
              {i}
            </div>
          );
        }
        return items;
      })()}
      <div
        id="rightSlider"
        className="bg-slate-700 px-2 py-2 rounded-lg text-white cursor-pointer"
        onClick={handleRightSlider}
      >
        <ChevronRight />
      </div>
    </div>
  );
}
