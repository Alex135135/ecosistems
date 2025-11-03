'use client'

import ProductForm from '@/components/forms/ProductForm/ProductForm'
import styles from './createProductPage.module.css'


export default function CreateProductPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Создать новый товар</h1>
                <p className={styles.subtitle}>Добавить новый товар в ваш каталог</p>
            </div>
            <ProductForm />
        </div>
    )
}