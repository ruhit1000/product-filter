export default function TopBar() {
  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
      <div className="max-w-350 mx-auto flex justify-between items-center gap-4">
        <h1 className="text-xl font-bold hidden sm:block">PhoneFinder</h1>
        <input 
          type="text" 
          placeholder="Search mobiles..." 
          className="border rounded-md px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50"
        />
      </div>
    </header>
  );
}