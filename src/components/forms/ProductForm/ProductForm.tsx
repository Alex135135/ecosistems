'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/store'
import { addProduct } from '@/lib/store/slices/productsSlice'
import { Product } from '@/services/api/fakeStoreApi'
import styles from './ProductForm.module.css'

export default function ProductForm() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.title.trim()) newErrors.title = 'Title is required'
        if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required'
        if (!formData.description.trim()) newErrors.description = 'Description is required'
        if (!formData.category.trim()) newErrors.category = 'Category is required'
        if (!formData.image.trim()) newErrors.image = 'Image URL is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        const newProduct: Product = {
            id: Date.now().toString(),
            title: formData.title,
            price: Number(formData.price),
            description: formData.description,
            category: formData.category,
            image: formData.image,
            rating: { rate: 0, count: 0 },
            isLiked: false,
            createdAt: new Date().toISOString()
        }

        dispatch(addProduct(newProduct))
        router.push('/products')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const getInputClassName = (fieldName: string) => {
        const baseClass = fieldName === 'description'
            ? `${styles.input} ${styles.textarea}`
            : styles.input

        return errors[fieldName]
            ? `${baseClass} ${styles.inputError}`
            : baseClass
    }

    const getButtonClassName = (type: 'submit' | 'cancel') => {
        return `${styles.button} ${type === 'submit' ? styles.submitButton : styles.cancelButton}`
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Title *</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={getInputClassName('title')}
                />
                {errors.title && <p className={styles.error}>{errors.title}</p>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Price *</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    className={getInputClassName('price')}
                />
                {errors.price && <p className={styles.error}>{errors.price}</p>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Description *</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={getInputClassName('description')}
                />
                {errors.description && <p className={styles.error}>{errors.description}</p>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Category *</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={getInputClassName('category')}
                />
                {errors.category && <p className={styles.error}>{errors.category}</p>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Image URL *</label>
                <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className={getInputClassName('image')}
                />
                {errors.image && <p className={styles.error}>{errors.image}</p>}
            </div>

            <div className={styles.buttons}>
                <button
                    type="submit"
                    className={getButtonClassName('submit')}
                >
                    Create Product
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className={getButtonClassName('cancel')}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}