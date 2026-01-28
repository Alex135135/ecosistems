'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { fetchProducts } from '@/lib/store/slices/productsSlice'
import { selectPaginatedProducts, selectPaginationInfo } from '@/lib/store/selectors/productSelectors'
import Filter from '@/components/ui/Filter/Filter'
import Search from '@/components/ui/Search/Search'
import ProductCard from '@/components/ui/ProductCard/ProductCard'
import Pagination from '@/components/ui/Pagination/Pagination'
import styles from './productsPage.module.css'

export default function ProductsPage() {
    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector(state => state.products)
    const filteredProducts = useAppSelector(selectPaginatedProducts)
    const paginationInfo = useAppSelector(selectPaginationInfo)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (loading) return <div className={styles.loading}>Загрузка товаров...</div>
    if (error) return <div className={styles.error}>Error: {error}</div>

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Покупай у нас!</h1>
            <Search />
            <Filter />

            {filteredProducts.length === 0 ? (
                <div className={styles.empty}>
                    Товары не найдены. Попробуйте настроить поиск или фильтр.
                </div>
            ) : (
                <>
                    <div className={styles.productsGrid}>
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {paginationInfo.totalPages > 1 && (
                        <Pagination />
                    )}
                </>
            )}
        </div>
    )
}