import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import ProductContext from "../store/product/Product-Context";
import Spinner from "../components/Spinner";
import UserContext from "../store/user/User-Context";

const ProductList = () => {
  const navigate = useNavigate();

  const ProductCtx = useContext(ProductContext);
  const { fetchProducts, products, deleteProduct, loading } = ProductCtx;

  const UserCtx = useContext(UserContext);
  const { token } = UserCtx;

  useEffect(() => {
    if (token) {
      fetchProducts(token);
    }
  }, [fetchProducts, token]);

  return (
    <div className="product-list-page">
      <button className="add-prod" onClick={() => navigate("/add-product")}>
        + Add Product
      </button>
      {loading ? (
        <Spinner />
      ) : (
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
                  <td>{idx + 1}</td>
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
                    <AiOutlineDelete
                      onClick={() => deleteProduct(prod._id, token)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
