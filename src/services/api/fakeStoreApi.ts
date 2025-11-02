const BASE_URL = 'https://fakestoreapi.com'

export interface ApiProduct {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

export interface Product {
    id: string
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
    isLiked: boolean
    createdAt: string
}

export const productsApi = {
    async getProducts(): Promise<Product[]> {
        const response = await fetch(`${BASE_URL}/products`)
        const data: ApiProduct[] = await response.json()

        return data.map(product => ({
            ...product,
            id: product.id.toString(),
            isLiked: false,
            createdAt: new Date().toISOString()
        }))
    },

    async getProductById(id: string): Promise<Product> {
        const response = await fetch(`${BASE_URL}/products/${id}`)
        const data: ApiProduct = await response.json()

        return {
            ...data,
            id: data.id.toString(),
            isLiked: false,
            createdAt: new Date().toISOString()
        }
    }
}