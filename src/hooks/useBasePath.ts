'use client'

export const useBasePath = () => {
    return ''
}

export const useWithBasePath = () => {
    return (path: string) => {
        const normalizedPath = path.startsWith('/') ? path : `/${path}`
        return normalizedPath
    }
}