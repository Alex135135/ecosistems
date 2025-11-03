'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/store'
import { Product } from '@/services/api/fakeStoreApi'
import EditProductForm from '@/components/forms/EditProductForm/EditProductForm'
import styles from './editProductPage.module.css'

export default function EditProductPage() {
    const params = useParams()
    const router = useRouter()
    const { items, userItems } = useAppSelector(state => state.products)
    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        const allProducts = [...items, ...userItems]
        const foundProduct = allProducts.find(item => item.id === params.id)

        if (foundProduct) {
            setProduct(foundProduct)
        } else {
            router.push('/products')
        }
    }, [params.id, items, userItems, router])

    if (!product) {
        return <div className={styles.loading}>Загрузка...</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Редактировать товар</h1>
                <p className={styles.subtitle}>Внесите изменения в информацию о товаре</p>
            </div>
            <EditProductForm
                product={product}
                onCancel={() => router.push('/products')}
            />
        </div>
    )
}