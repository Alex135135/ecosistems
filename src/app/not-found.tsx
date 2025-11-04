'use client'

import Link from 'next/link'
import { useWithBasePath } from '@/hooks/useBasePath'

export default function NotFound() {
    const withBasePath = useWithBasePath()

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Страница не найдена</h1>
            <p style={{ marginBottom: '2rem' }}>Извините, запрашиваемая страница не существует.</p>
            <Link
                href={withBasePath('/')}
                style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '0.375rem'
                }}
            >
                Вернуться на главную
            </Link>
        </div>
    )
}