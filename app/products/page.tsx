import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
import AddProduct from "./addProduct";

const getProducts = async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      brandId: true,
      brand: true,
    },
  });
  return products;
};

const getBrand = async () => {
  const brands = await prisma.brand.findMany();
  return brands;
};

const Product = async () => {
  const [products, brands] = await Promise.all([getProducts(), getBrand()]);

  return (
    <div>
      <div className="mb-2">
        <AddProduct brands={brands} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Brand</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td> {product.name}</td>
              <td> {product.price}</td>
              <td> {product.description}</td>
              <td> {product.brand.name}</td>
              <td className="flex justify-center gap-2">
                <UpdateProduct product={product} brands={brands} />
                <DeleteProduct product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
