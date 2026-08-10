'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Trash2, Edit } from 'lucide-react'

import { useAppDispatch } from '@/lib/store'
import { toggleLike, deleteProduct } from '@/lib/store/slices/productsSlice'
import { Product } from '@/services/api/fakeStoreApi'

import styles from './ProductCard.module.css'

// ==============================
// TYPES
// ==============================

interface ProductCardProps {
    product: Product
}

// ==============================
// HELPERS
// ==============================

const truncateText = (text: string, maxLength: number = 100): string =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text

// ==============================
// COMPONENT
// ==============================

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter()
    const dispatch = useAppDispatch()

    // Local state for optimistic UI
    const [isLiked, setIsLiked] = useState(product.isLiked)

    // ==============================
    // HANDLERS
    // ==============================

    const handleCardClick = () => {
        router.push(`/products/${product.id}`)
    }

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsLiked((prev) => !prev)
        dispatch(toggleLike(product.id))
    }

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        dispatch(deleteProduct(product.id))
    }

    // ==============================
    // RENDER
    // ==============================

    const description = truncateText(product.description)
    const likeButtonClass = isLiked
        ? `${styles.likeButton} ${styles.likeButtonLiked}`
        : `${styles.likeButton} ${styles.likeButtonNotLiked}`

    return (
        <div className={styles.card} onClick={handleCardClick}>
            {/* HEADER */}
            <div className={styles.header}>
                <h3 className={styles.title}>{product.title}</h3>

                <div className={styles.actions}>
                    {/* Like */}
                    <button onClick={handleLikeClick} className={likeButtonClass}>
                        <Heart size={20} className={styles.heartIcon} />
                    </button>

                    {/* Delete */}
                    <button onClick={handleDeleteClick} className={styles.deleteButton}>
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* IMAGE */}
            <img
                src={product.image}
                alt={product.title}
                className={styles.image}
            />

            {/* DESCRIPTION */}
            <p className={styles.description}>{description}</p>

            {/* FOOTER */}
            <div className={styles.footer}>
                <span className={styles.price}>${product.price}</span>
                <span className={styles.category}>{product.category}</span>
            </div>

            {/* RATING */}
            <div className={styles.rating}>
                <span className={styles.star}>★ {product.rating.rate}</span>
                <span className={styles.reviewCount}>
                    ({product.rating.count} reviews)
                </span>
            </div>
        </div>
    )
}