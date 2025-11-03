'use client'

import ProductForm from '@/components/forms/ProductForm/ProductForm'
import styles from './createProductPage.module.css'
import React from 'react';

export default function CreateProductPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Create New Product</h1>
                <p className={styles.subtitle}>Add a new product to your catalog</p>
            </div>
            <ProductForm />
        </div>
    )
}