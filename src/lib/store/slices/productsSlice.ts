import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { productsApi, type Product } from '@/services/api/fakeStoreApi'

interface ProductsState {
    items: Product[]
    loading: boolean
    error: string | null
    filter: 'all' | 'favorites'
    searchTerm: string
    currentPage: number
    itemsPerPage: number
}

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    filter: 'all',
    searchTerm: '',
    currentPage: 1,
    itemsPerPage: 6
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        return await productsApi.getProducts()
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<'all' | 'favorites'>) => {
            state.filter = action.payload
            state.currentPage = 1
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
            state.currentPage = 1
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload
            state.currentPage = 1
        },
        toggleLike: (state, action: PayloadAction<string>) => {
            const product = state.items.find(item => item.id === action.payload)
            if (product) {
                state.items = state.items.map(item =>
                    item.id === action.payload
                        ? { ...item, isLiked: !item.isLiked }
                        : item
                )
            }
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload)

            const totalFilteredItems = getFilteredItems(state).length
            const totalPages = Math.ceil(totalFilteredItems / state.itemsPerPage)
            if (state.currentPage > totalPages && totalPages > 0) {
                state.currentPage = totalPages
            }
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.items.push(action.payload)
        },
        updateProduct: (state, action: PayloadAction<Partial<Product> & { id: string }>) => {
            const product = state.items.find(item => item.id === action.payload.id)
            if (product) {
                Object.assign(product, action.payload)
            }
        },
        editProduct: (state, action: PayloadAction<Partial<Product> & { id: string }>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.items[index] = { ...state.items[index], ...action.payload }
            }
        },
        clearSearch: (state) => {
            state.searchTerm = ''
            state.currentPage = 1
        },
        resetFilters: (state) => {
            state.filter = 'all'
            state.searchTerm = ''
            state.currentPage = 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch products'
            })
    },
})

export const getFilteredItems = (state: ProductsState) => {
    let filtered = state.items


    if (state.filter === 'favorites') {
        filtered = filtered.filter(product => product.isLiked)
    }

    if (state.searchTerm.trim()) {
        const searchLower = state.searchTerm.toLowerCase()
        filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower)
        )
    }

    return filtered
}


export const getPaginatedItems = (state: ProductsState) => {
    const filteredItems = getFilteredItems(state)
    const startIndex = (state.currentPage - 1) * state.itemsPerPage
    const endIndex = startIndex + state.itemsPerPage
    return filteredItems.slice(startIndex, endIndex)
}


export const getPaginationInfo = (state: ProductsState) => {
    const filteredItems = getFilteredItems(state)
    const totalItems = filteredItems.length
    const totalPages = Math.ceil(totalItems / state.itemsPerPage)

    return {
        totalItems,
        totalPages,
        hasNextPage: state.currentPage < totalPages,
        hasPrevPage: state.currentPage > 1,
        currentPage: state.currentPage,
        itemsPerPage: state.itemsPerPage
    }
}

export const {
    setFilter,
    setSearchTerm,
    setCurrentPage,
    setItemsPerPage,
    toggleLike,
    deleteProduct,
    addProduct,
    updateProduct,
    editProduct,
    clearSearch,
    resetFilters
} = productsSlice.actions

export default productsSlice.reducer