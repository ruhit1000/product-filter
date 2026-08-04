export default function ProductCard({ phone }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <img src={phone.image} alt={phone.name} className="w-full h-48 object-contain mb-4" />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 truncate">{phone.name}</h3>
        <p className="text-xs text-gray-500 mb-3">{phone.brand}</p>
        <div className="text-sm text-gray-600 space-y-1">
          <p>💾 {phone.ram}GB RAM | {phone.internalStorage}GB ROM</p>
          <p>🔋 {phone.battery}mAh Battery</p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t">
        <span className="font-bold text-lg">${phone.price}</span>
      </div>
    </div>
  );
}