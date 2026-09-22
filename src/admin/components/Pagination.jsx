
function Pagination({ currentPage , totalPage , onPageChange}) {
  return (
    <div>

        <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
            Previous
        </button>

        <span>
            Page {currentPage} of {totalPage}
        </span>

        <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}>
            Next
        </button>
      
    </div>
  )
}

export default Pagination
