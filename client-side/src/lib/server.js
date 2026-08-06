const apiUrl = import.meta.env.VITE_API_URL;

export const fetchFilters = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/filters`);
    if (!response.ok) {
      throw new Error("Failed to fetch filters");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching filters:", error);
    throw error;
  }
};

export const fetchProducts = async (filterQuery) => {
  try {
    const response = await fetch(`${apiUrl}/api/products`, {
      method: "QUERY",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterQuery),
    });

    if (response.status === 405 || response.status === 501) {
      throw new Error("QUERY blocked by proxy");
    }

    const data = await response.json();

    return data;
    
  } catch (error) {
    console.log("Falling back to POST...", error.message);
    
    const response = await fetch(`${apiUrl}/api/products/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(filterQuery),
    });
    const data = await response.json();
    return data;
  }
};
