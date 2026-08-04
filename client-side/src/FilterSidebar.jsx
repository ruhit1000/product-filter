export default function FilterSidebar({ filters }) {
  if (!filters || Object.keys(filters).length === 0) {
    return <aside className="w-full md:w-64 p-5">Loading filters...</aside>;
  }

  const filterConfigs = [
    { label: "Brand", key: "brands" },
    { label: "Display Type", key: "displayTypes" },
    { label: "Chipset", key: "chipsets" },
    { label: "RAM (GB)", key: "ram" },
    { label: "Storage (GB)", key: "storage" },
    { label: "Battery (mAh)", key: "battery" }
  ];

  return (
    <aside className="w-full md:w-64 bg-white p-5 border-r shrink-0">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      
      <div className="space-y-6 text-sm">
        {filterConfigs.map(({ label, key }) => (
          <div key={key} className="border-b pb-4 last:border-0 last:pb-0">
            <h3 className="font-semibold mb-3 text-gray-800">{label}</h3>
            
            {/* Scrollable container for options */}
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {filters[key]?.map((item, index) => (
                <label 
                  key={index} 
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input 
                    type="checkbox" 
                    value={item}
                    className="w-4 h-4 rounded border-gray-300 accent-gray-900 cursor-pointer"
                  />
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}