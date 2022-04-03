import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ProductFrom from "../components/ProductFrom";
import ProductContext from "../store/product/Product-Context";

const UpdateProduct = () => {
  const ProductCtx = useContext(ProductContext);
  const { products } = ProductCtx;

  const { pId } = useParams();

  let product = null;
  if (pId) {
    product = products.filter((prod) => prod._id === pId)[0];
  }

  return (
    <div className="product-form">
      <h3>Update Product</h3>
      <ProductFrom product={product} />
    </div>
  );
};

export default UpdateProduct;
