export const toArray = (value) => {
    if (Array.isArray(value)) return value;
    if (value) return [value];
    return [];
}

export const getQuery = (req) => {
    const filterQuery = req.body;
      const searchQuery = filterQuery.searchQuery || '';
      const availability = filterQuery.availability === 'available' ? true : filterQuery.availability === 'unavailable' ? false : null;
      const brands = toArray(filterQuery.brands);
      const displayTypes = toArray(filterQuery.displayTypes);
      const chipsets = toArray(filterQuery.chipsets);
      const ram = toArray(filterQuery.ram);
      const storage = toArray(filterQuery.storage);
      const battery = toArray(filterQuery.battery);

      const query = {};

      if (searchQuery) {
        query.$or = [
          { brand: { $regex: searchQuery, $options: 'i' } },
          { model: { $regex: searchQuery, $options: 'i' } },
          { chipset: { $regex: searchQuery, $options: 'i' } },
        ];
      }

      if (availability !== null) {
        query.availability = availability;
      } else {
        query.availability = { $in: [true, false] };
      }
      
      if (brands.length > 0) {
        query.brand = { $in: brands };
      }

      if (displayTypes.length > 0) {
        query.displayType = { $in: displayTypes };
      }

      if (chipsets.length > 0) {
        query.chipset = { $in: chipsets };
      }

      if (ram.length > 0) {
        query.ram = { $in: ram.map(Number) };
      }

      if (storage.length > 0) {
        query.internalStorage = { $in: storage.map(Number) };
      }

      if (battery.length > 0) {
        query.battery = { $in: battery.map(Number) };
      }
    return query;
}