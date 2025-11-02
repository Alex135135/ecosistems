'use client'

import { useAppDispatch, useAppSelector } from '@/lib/store'
import { setFilter } from '@/lib/store/slices/productsSlice'

export default function Filter() {
    const dispatch = useAppDispatch()
    const { filter } = useAppSelector((state: { products: any }) => state.products)

    return (
        <div className="flex gap-4 mb-6">
            <button
                onClick={() => dispatch(setFilter('all'))}
                className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
            >
                All Products
            </button>
            <button
                onClick={() => dispatch(setFilter('favorites'))}
                className={`px-4 py-2 rounded ${filter === 'favorites' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
            >
                Favorites
            </button>
        </div>
    )
}