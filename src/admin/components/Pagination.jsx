
// function Pagination({ currentPage , totalPage , onPageChange}) {
//   return (
//     <div>

//         <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}>
//             Previous
//         </button>

//         <span>
//             Page {currentPage} of {totalPage}
//         </span>

//         <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPage}>
//             Next
//         </button>
      
//     </div>
//   )
// }

// export default Pagination








function Pagination({
  currentPage,
  totalPage,
  onPageChange,
}) {
  return (
    <div className="flex items-center justify-center">

      <div className="flex items-center gap-2">

        {/* Previous */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-sm text-stone-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ←
        </button>


        {/* Current Page */}
        <button
          type="button"
          className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#17634f] px-3 text-sm font-medium text-white"
        >
          {currentPage}
        </button>


        {/* Next */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-sm text-stone-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          →
        </button>

      </div>

    </div>
  );
}

export default Pagination;