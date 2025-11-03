'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/store'
import { editProduct } from '@/lib/store/slices/productsSlice'
import { Product } from '@/services/api/fakeStoreApi'
import styles from './EditProductForm.module.css'

interface EditProductFormProps {
    product: Product
    onCancel: () => void
}

export default function EditProductForm({ product, onCancel }: EditProductFormProps) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: product.title,
        price: product.price.toString(),
        description: product.description,
        category: product.category,
        image: product.image
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        setFormData({
            title: product.title,
            price: product.price.toString(),
            description: product.description,
            category: product.category,
            image: product.image
        })
    }, [product])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.title.trim()) newErrors.title = 'Поле названия товара обязательное'
        if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Укажите корректную цену'
        if (!formData.description.trim()) newErrors.description = 'Поле описание товара обязательное'
        if (!formData.category.trim()) newErrors.category = 'Поле категория товара обязательное'
        if (!formData.image.trim()) newErrors.image = 'URL изображения обязателен'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        const updatedProduct: Partial<Product> & { id: string } = {
            id: product.id,
            title: formData.title,
            price: Number(formData.price),
            description: formData.description,
            category: formData.category,
            image: formData.image
        }

        dispatch(editProduct(updatedProduct))
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
                <label className={styles.label}>Титул *</label>
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
                <label className={styles.label}>Цена *</label>
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
                <label className={styles.label}>Описание *</label>
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
                <label className={styles.label}>Категория *</label>
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
                    Сохранить изменения
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className={getButtonClassName('cancel')}
                >
                    Отмена
                </button>
            </div>
        </form>
    )
}