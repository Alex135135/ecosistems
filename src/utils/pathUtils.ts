export const getBasePath = () => {
    if (typeof window !== 'undefined') {
        return window.location.pathname.includes('/ecosistems') ? '/ecosistems' : ''
    }
    return process.env.NODE_ENV === 'production' ? '/ecosistems' : ''
}

export const withBasePath = (path: string) => {
    const basePath = getBasePath()
    return `${basePath}${path.startsWith('/') ? path : `/${path}`}`
}