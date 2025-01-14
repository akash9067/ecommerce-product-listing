import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  id: number;
  title: string;
  sku: string;
  price: number;
  image: string;
  dimensions: string;
  sizesAvailable: boolean;
  category: string[];
  sizeOptions: string;
  viscosity: string;
  brand: string;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  title,
  sku,
  price,
  image,
  sizesAvailable,
}) => {
  return (
    <div className="bg-white shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="object-contain mb-4"
        />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">SKU: {sku}</p>
      {sizesAvailable && (
        <span className="text-green-500 text-sm">Multiple Sizes Available</span>
      )}
      <p className="text-xl font-bold text-blue-500 mt-2">From ${price}</p>
      <Link href={`/products/${id}`}>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md mt-4">
          VIEW PRODUCT
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
