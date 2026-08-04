import { useState, useEffect } from "react";
import { fetchFilters, fetchProducts } from "./lib/server";
import TopBar from "./TopBar";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";

function App() {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Combine fetches to load data concurrently
    const getData = async () => {
      try {
        const [filtersData, productsData] = await Promise.all([
          fetchFilters(),
          fetchProducts()
        ]);
        setFilters(filtersData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      <TopBar />
      
      <div className="flex flex-1 flex-col md:flex-row max-w-350 w-full mx-auto">
        <FilterSidebar filters={filters} />
        
        <main className="flex-1 p-4 md:p-6">
          {isLoading ? (
            <div className="flex justify-center mt-10">
              <span className="text-gray-500 font-medium">Loading products...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center mt-20">
              <h2 className="text-2xl font-bold text-gray-700">No Products Found</h2>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((phone) => (
                <ProductCard key={phone._id} phone={phone} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;