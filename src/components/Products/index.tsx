import ProductList from './ProductList';

export default function Products() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-lg text-gray-600">
            Experience pure hydration with our premium water products
          </p>
        </div>
        
        <ProductList />
      </div>
    </section>
  );
}