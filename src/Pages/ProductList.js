import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import ProductContext from "../store/product/Product-Context";

const ProductList = () => {
  const navigate = useNavigate();

  const ProductCtx = useContext(ProductContext);
  const { fetchProducts, products, deleteProduct } = ProductCtx;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="product-list-page">
      <button className="add-prod" onClick={() => navigate("/add-product")}>
        + Add Product
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((prod, idx) => (
              <tr key={idx}>
                <td>{idx}</td>
                <td>
                  <img
                    src={process.env.REACT_APP_BASE_URL + "/" + prod.pImage}
                    alt={prod.pName}
                  />
                </td>
                <td>{prod.pName}</td>
                <td>{`${prod.pPrice} $`}</td>
                <td>
                  <FiEdit
                    onClick={() => navigate(`/update-product/${prod._id}`)}
                  />
                </td>
                <td>
                  <AiOutlineDelete onClick={() => deleteProduct(prod._id)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
