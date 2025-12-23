import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Edit } from 'lucide-react'
import styles from './productDetailPage.module.css'
import { productsApi } from '@/services/api/fakeStoreApi'

export async function generateStaticParams() {
    try {
        const products = await productsApi.getProducts()
        return products.map((product) => ({
            id: product.id,
        }))
    } catch (error) {
        console.error('Error generating static params:', error)
        return []
    }
}

export default async function ProductDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    try {
        const product = await productsApi.getProductById(id)

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <Link
                        href="/products"
                        className={styles.backLink}
                    >
                        ← Вернуться к товарам
                    </Link>

                </div>

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
    } catch (error) {
        notFound()
    }
}