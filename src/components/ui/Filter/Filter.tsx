'use client'

import { useAppDispatch, useAppSelector } from '@/lib/store'
import { setFilter } from '@/lib/store/slices/productsSlice'
import styles from './Filter.module.css'

export default function Filter() {
    const dispatch = useAppDispatch()
    const { filter } = useAppSelector((state: { products: any }) => state.products)

    const getButtonClass = (buttonFilter: 'all' | 'favorites') => {
        return filter === buttonFilter
            ? `${styles.button} ${styles.buttonActive}`
            : `${styles.button} ${styles.buttonInactive}`
    }

    return (
        <div className={styles.container}>
            <button
                onClick={() => dispatch(setFilter('all'))}
                className={getButtonClass('all')}
            >
                Все товары
            </button>
            <button
                onClick={() => dispatch(setFilter('favorites'))}
                className={getButtonClass('favorites')}
            >
                Избранное
            </button>
        </div>
    )
}