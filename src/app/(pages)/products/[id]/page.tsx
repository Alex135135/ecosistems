'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/store'
import { Product } from '@/services/api/fakeStoreApi'
import Link from 'next/link'
import styles from './productDetailPage.module.css'

export default function ProductDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { items } = useAppSelector(state => state.products)
    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        const foundProduct = items.find(item => item.id === params.id)
        if (foundProduct) {
            setProduct(foundProduct)
        } else {
            router.push('/products')
        }
    }, [params.id, items, router])

    if (!product) {
        return <div className={styles.loading}>Loading...</div>
    }

    return (
        <div className={styles.container}>
            <Link
                href="/products"
                className={styles.backLink}
            >
                ← Вернуться к продуктам
            </Link>

            <div className={styles.grid}>
                <div>
                    <img
                        src={product.image}
                        alt={product.title}
                        className={styles.image}
                    />
                </div>

                <div className={styles.content}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.price}>${product.price}</p>

                    <div>
                        <span className={styles.category}>
                            {product.category}
                        </span>
                    </div>

                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.details}>
                        <div className={styles.rating}>
                            <span className={styles.star}>★ {product.rating.rate}</span>
                            <span className={styles.reviews}>({product.rating.count} reviews)</span>
                        </div>

                        <div className={styles.date}>
                            Added: {new Date(product.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}