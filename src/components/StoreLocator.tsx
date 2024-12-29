import { useState, useMemo } from 'react';
import { MapPin, Phone, Clock, Search } from 'lucide-react';

// Sample store data
const stores = [
  {
    id: 1,
    name: 'RO3 Water Windhoek Central',
    address: '123 Independence Ave, Windhoek',
    coordinates: { lat: -22.5609, lng: 17.0658 },
    phone: '+264 61 123 4567',
    hours: '8:00 AM - 6:00 PM',
    region: 'Central'
  },
  {
    id: 2,
    name: 'RO3 Water Klein Windhoek',
    address: '456 Nelson Mandela Ave, Klein Windhoek',
    coordinates: { lat: -22.5700, lng: 17.0900 },
    phone: '+264 61 234 5678',
    hours: '8:00 AM - 7:00 PM',
    region: 'East'
  },
  {
    id: 3,
    name: 'RO3 Water Swakopmund',
    address: '789 Sam Nujoma Dr, Swakopmund',
    coordinates: { lat: -22.6784, lng: 14.5258 },
    phone: '+264 64 345 6789',
    hours: '9:00 AM - 6:00 PM',
    region: 'Coastal'
  },
  {
    id: 4,
    name: 'RO3 Water Walvis Bay',
    address: '321 Beach Road, Walvis Bay',
    coordinates: { lat: -22.9576, lng: 14.5053 },
    phone: '+264 64 456 7890',
    hours: '8:30 AM - 6:30 PM',
    region: 'Coastal'
  },
  {
    id: 5,
    name: 'RO3 Water Oshakati',
    address: '654 Main Street, Oshakati',
    coordinates: { lat: -17.7883, lng: 15.7044 },
    phone: '+264 65 567 8901',
    hours: '8:00 AM - 5:30 PM',
    region: 'North'
  }
];

const regions = [
  { id: 'all', name: 'All Regions' },
  { id: 'Central', name: 'Central' },
  { id: 'East', name: 'East' },
  { id: 'Coastal', name: 'Coastal' },
  { id: 'North', name: 'North' }
];

export default function StoreLocator() {
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const filteredStores = stores.filter(store => {
    const matchesSearch = 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || store.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <section id="find-store" className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#002B5B] mb-4">Find a Store</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            With over 360 stores across Southern Africa, there's always a RO3 Water store near you. 
            Find your nearest location and enjoy pure, refreshing water today.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Store List */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-lg p-6">
            {/* Search and Filter */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-transparent"
                />
              </div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-transparent"
              >
                {regions.map(region => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Store List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {filteredStores.map(store => (
                <button
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedStore.id === store.id
                      ? 'bg-[#002B5B] text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <h3 className="font-semibold mb-2">{store.name}</h3>
                  <p className={`text-sm ${selectedStore.id === store.id ? 'text-gray-200' : 'text-gray-600'}`}>
                    {store.address}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Map and Store Details */}
          <div className="lg:col-span-8 space-y-6">
            {/* Map */}
            <div className="aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden">
              <img 
                src="https://cdn.prod.website-files.com/5c29380b1110ec92a203aa84/66e5ce469b48938aa34d8684_Google%20Maps%20-%20Compressed.jpg"
                alt="Store Location Map"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Selected Store Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#002B5B] mb-4">
                {selectedStore.name}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#002B5B] mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-gray-600">{selectedStore.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#002B5B] mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-gray-600">{selectedStore.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#002B5B] mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Hours</h4>
                    <p className="text-gray-600">{selectedStore.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}