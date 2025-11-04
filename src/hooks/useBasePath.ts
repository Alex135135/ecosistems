'use client'

export const useBasePath = () => {
    if (typeof window !== 'undefined') {
        return window.location.pathname.includes('/ecosistems') ? '/ecosistems' : ''
    }
    return process.env.NODE_ENV === 'production' ? '/ecosistems' : ''
}

export const useWithBasePath = () => {
    const basePath = useBasePath()

    return (path: string) => {
        const normalizedPath = path.startsWith('/') ? path : `/${path}`
        return `${basePath}${normalizedPath}`
    }
}