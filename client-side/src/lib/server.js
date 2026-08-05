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

export const fetchProducts = async (filterQuery) => {

    const params = new URLSearchParams();

    params.append('searchQuery', filterQuery.searchQuery);
    params.append('availability', filterQuery.availability);
    filterQuery.brands.forEach(brand => params.append('brands', brand));
    filterQuery.displayTypes.forEach(displayType => params.append('displayTypes', displayType));
    filterQuery.chipsets.forEach(chipset => params.append('chipsets', chipset));
    filterQuery.ram.forEach(ram => params.append('ram', ram));
    filterQuery.storage.forEach(storage => params.append('storage', storage));
    filterQuery.battery.forEach(battery => params.append('battery', battery));
    
    try {
        const response = await fetch(`${apiUrl}/api/products?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}