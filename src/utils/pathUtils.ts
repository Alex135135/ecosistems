export const getBasePath = () => {
    return ''
}

export const withBasePath = (path: string) => {
    return path.startsWith('/') ? path : `/${path}`
}