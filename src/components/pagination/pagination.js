import { Button } from "../index";

export const Pagination = ({ onPageClick, currentPage, totalPages }) => {
    const pagesNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    const paginationList = ['prev', ...pagesNumbers, 'next']
    const renderPagination = paginationList.map(i => (
        <Button
            key={i}
            text={i}
            onClick={() => {
                if (i === 'prev') {
                    return onPageClick(currentPage - 1)
                }
                if (i === 'next') {
                    return onPageClick(currentPage + 1)
                }
                onPageClick(i)
            }}
            isActive={i === currentPage}
        />)
    )

    return (
        <div className="site__sub-menu__pagination">
            {renderPagination}
        </div>
    )
}

