'use client'

import { useRouter } from 'next/navigation'
import { Heart, Trash2 } from 'lucide-react'
import { useAppDispatch } from '@/lib/store'
import { toggleLike, deleteProduct } from '@/lib/store/slices/productsSlice'
import { Product } from '@/services/api/fakeStoreApi'
import { useState } from 'react'
import styles from './ProductCard.module.css'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [isLiked, setIsLiked] = useState(product.isLiked)

    const handleCardClick = () => {
        router.push(`/products/${product.id}`)
    }

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsLiked(!isLiked)
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
        <div className={styles.card} onClick={handleCardClick}>
            <div className={styles.header}>
                <h3 className={styles.title}>{product.title}</h3>
                <div className={styles.actions}>
                    <button
                        onClick={handleLikeClick}
                        className={`${styles.likeButton} ${isLiked ? styles.likeButtonLiked : styles.likeButtonNotLiked
                            }`}
                    >
                        <Heart
                            size={20}
                            className={styles.heartIcon}
                        />
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className={styles.deleteButton}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <img
                src={product.image}
                alt={product.title}
                className={styles.image}
            />

            <p className={styles.description}>{truncatedDescription}</p>

            <div className={styles.footer}>
                <span className={styles.price}>${product.price}</span>
                <span className={styles.category}>{product.category}</span>
            </div>

            <div className={styles.rating}>
                <span className={styles.star}>★ {product.rating.rate}</span>
                <span className={styles.reviewCount}>({product.rating.count} reviews)</span>
            </div>
        </div>
    )
}