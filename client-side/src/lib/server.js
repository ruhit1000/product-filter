const apiUrl = import.meta.env.VITE_API_URL;

export const fetchFilters = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/filters`);
        if (!response.ok) {
            throw new Error('Failed to fetch filters');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching filters:', error);
        throw error;
    }
}

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}