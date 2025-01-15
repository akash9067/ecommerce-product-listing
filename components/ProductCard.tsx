import Image from "next/image";
import Link from "next/link";
import productImage from "../public/images/images.png";

interface ProductProps {
  id: number;
  title: string;
  sku: string;
  price: string;
  sizesAvailable: boolean;
  category: string;
  sizeOptions: string;
  viscosity: string;
  brand: string;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  title,
  sku,
  price,
  sizesAvailable,
  brand,
}) => {
  return (
    <div className="bg-white shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm font-medium mb-1 inline sm:hidden">
          {brand}
        </p>
        <h3 className="text-base font-semibold text-gray-900 inline sm:hidden">
          {title}
        </h3>
      </div>
      <div className="relative w-full h-48 mb-4">
        <Image
          src={productImage}
          alt={title}
          layout="fill"
          objectFit="contain"
          className="rounded"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm font-medium mb-1 hidden sm:inline">
          {brand}
        </p>
        <h3 className="text-base font-semibold text-gray-900 hidden sm:inline">
          {title}
        </h3>
      </div>
      <div className="flex items-center sm:flex-row flex-col">
        <p className="text-gray-600 text-sm">SKU: {sku}</p>
        {sizesAvailable && (
          <div className="text-green-600 text-sm mt-1 inline-block">
            Multiple Sizes Available
          </div>
        )}
      </div>
      <p className="text-lg font-bold text-gray-800 mt-2">From ${price}</p>
      <Link href={`/products/${id}`}>
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md mt-4 text-center lg:text-sm md:py-3">
          <span className="hidden sm:inline">VIEW PRODUCT</span>
          <span className="inline sm:hidden">VIEW</span>
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
