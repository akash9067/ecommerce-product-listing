import { NextResponse } from 'next/server';

export async function GET() {
  const products = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    sku: `SKU-${index + 1000}`,
    price: (10 + Math.random() * 50).toFixed(2),
    image: `product.svg`,
    sizesAvailable: Math.random() > 0.5,
    category: ["Lube-Tech", "Chemicals", "Supplies", "Equipment", "Auto Parts"][Math.floor(Math.random() * 5)],
    sizeOptions: [
      "1 Quart",
      "5 Quarts",
      "1 Gallon",
      "Bulk 1 Drum",
      "Half-Quart",
      "Bulk 1 Tote"
    ][Math.floor(Math.random() * 6)],
    viscosity: [
      "0W-20",
      "0W-30",
      "5W-20",
      "5W-30",
      "10W-30",
      "10W-40"
    ][Math.floor(Math.random() * 6)],
    brand: ["Mobil", "Old World", "Peak"][Math.floor(Math.random() * 3)]
  }));
	console.log("TCL: products", products)
  return NextResponse.json(products);
}
