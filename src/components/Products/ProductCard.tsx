interface ProductCardProps {
  image: string;
  title: string;
  link?: string;
}

export default function ProductCard({ image, title, link = "#" }: ProductCardProps) {
  return (
    <div className="relative group">
      <div className="relative aspect-square rounded-full bg-blue-50 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain p-8"
        />
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-4xl font-bold text-navy-900 mb-4">
          {title}
        </h3>
        <a
          href={link}
          className="inline-block px-6 py-2 bg-blue-50 text-blue-900 rounded-full hover:bg-blue-100 transition"
        >
          Explore →
        </a>
      </div>
    </div>
  );
}