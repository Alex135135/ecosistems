'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { fetchProducts } from '@/lib/store/slices/productsSlice'
import Filter from '@/components/ui/Filter/Filter'
import ProductCard from '@/components/ui/ProductCard/ProductCard'

export default function ProductsPage() {
    const dispatch = useAppDispatch()
    const { items, loading, error, filter } = useAppSelector(state => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const filteredProducts = filter === 'favorites'
        ? items.filter(product => product.isLiked)
        : items

    if (loading) return <div className="text-center p-8">Loading products...</div>
    if (error) return <div className="text-red-500 text-center p-8">Error: {error}</div>

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Our Products</h1>
            <Filter />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}