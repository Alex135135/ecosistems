'use client'

import { useAppDispatch, useAppSelector } from '@/lib/store'
import { setCurrentPage } from '@/lib/store/slices/productsSlice'
import { selectPaginationInfo } from '@/lib/store/selectors/productSelectors'
import styles from './Pagination.module.css'

export default function Pagination() {
    const dispatch = useAppDispatch()
    const paginationInfo = useAppSelector(selectPaginationInfo)

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    if (paginationInfo.totalPages <= 1) return null

    return (
        <div className={styles.container}>
            <button
                onClick={() => handlePageChange(paginationInfo.currentPage - 1)}
                disabled={!paginationInfo.hasPrevPage}
                className={styles.navButton}
            >
                Назад
            </button>

            <div className={styles.pages}>
                {Array.from({ length: paginationInfo.totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`${styles.pageButton} ${page === paginationInfo.currentPage ? styles.active : ''
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => handlePageChange(paginationInfo.currentPage + 1)}
                disabled={!paginationInfo.hasNextPage}
                className={styles.navButton}
            >
                Далее
            </button>
        </div>
    )
}