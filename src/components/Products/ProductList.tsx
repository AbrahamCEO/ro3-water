import ProductCard from './ProductCard';

const products = [
  {
    image: "https://ro3water.co.na/wp-content/uploads/2024/01/ice-cubes.png",
    title: "ice cubes",
    link: "/products/ice-cubes"
  },
  {
    image: "https://ro3water.co.na/wp-content/uploads/2024/01/refill-water.png",
    title: "refill water",
    link: "/products/refill-water"
  },
  {
    image: "https://ro3water.co.na/wp-content/uploads/2024/01/still-water.png",
    title: "still water",
    link: "/products/still-water"
  },
  {
    image: "https://ro3water.co.na/wp-content/uploads/2024/01/sparkling-water.png",
    title: "sparkling water",
    link: "/products/sparkling-water"
  }
];

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.title}
          image={product.image}
          title={product.title}
          link={product.link}
        />
      ))}
    </div>
  );
}