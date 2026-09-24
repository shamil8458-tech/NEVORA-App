import { useState } from "react"


function usePagination(data , itemsPerPage = 10) {

    const [currentPage , setCurrentPage] = useState(1)


    const totalPages = Math.ceil(
        data.length / itemsPerPage
    );


    const currentItems = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const changePage = (page) => {
        setCurrentPage(page)
    }
  return {
    currentPage,
    totalPages,
    currentItems,
    changePage,
  };
}

export default usePagination
