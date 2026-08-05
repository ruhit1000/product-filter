import { useEffect, useState } from "react";
import { fetchFilters, fetchProducts } from "./lib/server";
import TopBar from "./TopBar";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";

const INITIAL_FILTER_QUERY = {
  searchQuery: "",
  brands: [],
  displayTypes: [],
  chipsets: [],
  ram: [],
  storage: [],
  battery: [],
  availability: null,
};

function App() {
  const [filterOptions, setFilterOptions] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState(INITIAL_FILTER_QUERY);

  useEffect(() => {
    const getFilters = async () => {
      try {
        const filtersData = await fetchFilters();
        setFilterOptions(filtersData);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    getFilters();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const productsData = await fetchProducts(filterQuery);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [filterQuery]);

  const updateMultiSelectFilter = (filterKey, filterValue) => {
    setFilterQuery((currentFilters) => {
      const currentValues = currentFilters[filterKey];
      const isAlreadySelected = currentValues.includes(filterValue);

      return {
        ...currentFilters,
        [filterKey]: isAlreadySelected
          ? currentValues.filter((currentValue) => currentValue !== filterValue)
          : [...currentValues, filterValue],
      };
    });
  };

  const clearFilters = () => {
    setFilterQuery(INITIAL_FILTER_QUERY);
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-transparent font-sans text-slate-800">
      <input
        id="product-filters-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isFiltersOpen}
        onChange={(event) => setIsFiltersOpen(event.target.checked)}
      />

      <div className="drawer-content flex min-w-0 flex-col">
        <TopBar
          onOpenFilters={() => setIsFiltersOpen(true)}
          searchQuery={filterQuery.searchQuery}
          onSearchChange={(value) =>
            setFilterQuery((currentFilters) => ({
              ...currentFilters,
              searchQuery: value,
            }))
          }
        />

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-500 shadow-sm ring-1 ring-slate-200/80 backdrop-blur">
                Loading products...
              </span>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-lg font-medium text-slate-900">
                No products found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                We couldn't find any products matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {products.map((phone) => (
                <ProductCard key={phone._id} phone={phone} />
              ))}
            </div>
          )}
        </main>
      </div>

      <div className="drawer-side z-40 lg:z-auto">
        <label
          htmlFor="product-filters-drawer"
          aria-label="close sidebar"
          className="drawer-overlay bg-slate-950/30 backdrop-blur-sm"
          onClick={() => setIsFiltersOpen(false)}
        />
        <FilterSidebar
          filterOptions={filterOptions}
          filterQuery={filterQuery}
          onToggleFilter={updateMultiSelectFilter}
          onAvailabilityChange={(value) =>
            setFilterQuery((currentFilters) => ({
              ...currentFilters,
              availability: value,
            }))
          }
          onClearFilters={clearFilters}
          onClose={() => setIsFiltersOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
