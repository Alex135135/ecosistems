import { RootState } from '..'
import { getFilteredItems, getPaginatedItems, getPaginationInfo } from '../slices/productsSlice'

export const selectAllProducts = (state: RootState) => state.products.items
export const selectProductsLoading = (state: RootState) => state.products.loading
export const selectProductsError = (state: RootState) => state.products.error
export const selectProductsFilter = (state: RootState) => state.products.filter
export const selectSearchTerm = (state: RootState) => state.products.searchTerm
export const selectCurrentPage = (state: RootState) => state.products.currentPage
export const selectItemsPerPage = (state: RootState) => state.products.itemsPerPage

export const selectFilteredProducts = (state: RootState) =>
    getFilteredItems(state.products)

export const selectPaginatedProducts = (state: RootState) =>
    getPaginatedItems(state.products)

export const selectPaginationInfo = (state: RootState) =>
    getPaginationInfo(state.products)

export const selectFavoriteProducts = (state: RootState) =>
    state.products.items.filter(product => product.isLiked)

export const selectProductById = (state: RootState, productId: string) =>
    state.products.items.find(product => product.id === productId)