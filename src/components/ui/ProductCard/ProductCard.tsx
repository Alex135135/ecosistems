'use client'

import { useRouter } from 'next/navigation'
import { Heart, Trash2 } from 'lucide-react'
import { useAppDispatch } from '@/lib/store'
import { toggleLike, deleteProduct } from '@/lib/store/slices/productsSlice'
import { Product } from '@/services/api/fakeStoreApi'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleCardClick = () => {
        router.push(`/products/${product.id}`)
    }

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        dispatch(toggleLike(product.id))
    }

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        dispatch(deleteProduct(product.id))
    }

    const truncatedDescription = product.description.length > 100
        ? `${product.description.substring(0, 100)}...`
        : product.description

    return (
        <div
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleCardClick}
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={handleLikeClick}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <Heart
                            size={20}
                            className={product.isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}
                        />
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className="p-1 hover:bg-gray-100 rounded text-red-500"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-3"
            />

            <p className="text-gray-600 mb-2">{truncatedDescription}</p>

            <div className="flex justify-between items-center">
                <span className="font-bold text-lg">${product.price}</span>
                <span className="text-sm text-gray-500">{product.category}</span>
            </div>

            <div className="flex items-center mt-2">
                <span className="text-yellow-500">★ {product.rating.rate}</span>
                <span className="text-gray-400 text-sm ml-1">({product.rating.count})</span>
            </div>
        </div>
    )
}