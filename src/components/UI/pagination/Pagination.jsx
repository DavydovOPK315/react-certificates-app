import React from 'react'
import { usePages } from '../../../hooks/userPages'
import cl from './Pagination.module.css'

const Pagination = ({ page, totalPages, changePage, ...props }) => {
    const pagesArray = usePages(totalPages, page);

    return (
        <div className={cl.page__wrapper} {...props}>
            <span className={cl.page} onClick={() => changePage(page - 1)}>Less</span>
            <span className={page === 1 ? [cl.page, cl.page__current].join(' ') : cl.page} onClick={() => changePage(1)}>1</span>
            {pagesArray.map(p =>
                <span
                    key={p}
                    onClick={() => changePage(p)}
                    className={page === p ? [cl.page, cl.page__current].join(' ') : cl.page}
                >
                    {p}
                </span>
            )}
            <span className={page === totalPages ? [cl.page, cl.page__current].join(' ') : cl.page} onClick={() => changePage(totalPages)}>{totalPages}</span>
            <span className={cl.page} onClick={() => changePage(page + 1)}>More</span>
        </div>
    )
}

export default Pagination
