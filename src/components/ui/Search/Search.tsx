'use client'

import { useState } from 'react'
import { useAppDispatch } from '@/lib/store'
import { setSearchTerm } from '@/lib/store/slices/productsSlice'
import styles from './Search.module.css'

export default function Search() {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState('')

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)
        dispatch(setSearchTerm(value))
    }

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Поиск товаров..."
                value={search}
                onChange={handleSearchChange}
                className={styles.input}
            />
        </div>
    )
}