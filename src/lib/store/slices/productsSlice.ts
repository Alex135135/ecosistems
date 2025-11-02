import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { productsApi, type Product } from '@/services/api/fakeStoreApi'

interface ProductsState {
    items: Product[]
    loading: boolean
    error: string | null
    filter: 'all' | 'favorites'
}

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    filter: 'all',
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
        },

        addProduct: (state, action: PayloadAction<Product>) => {
            state.items.push(action.payload)
        },

        updateProduct: (state, action: PayloadAction<Partial<Product> & { id: string }>) => {
            const product = state.items.find(item => item.id === action.payload.id)
            if (product) {
                Object.assign(product, action.payload)
            }
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

export const {
    setFilter,
    toggleLike,
    deleteProduct,
    addProduct,
    updateProduct
} = productsSlice.actions

export default productsSlice.reducer