import React from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button className="add-prod" onClick={() => navigate("/add-product")}>
        + Add Product
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Image</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12</td>
            <td>
              <img
                src="https://ak.picdn.net/offset/photos/5e8cf9bfd164c0404ea4c2ef/medium/offset_925123.jpg?DFghwDcb"
                alt=""
              />
            </td>
            <td>forhad</td>
          </tr>
          <tr>
            <td>12</td>
            <td>
              <img
                src="https://ak.picdn.net/offset/photos/5e8cf9bfd164c0404ea4c2ef/medium/offset_925123.jpg?DFghwDcb"
                alt=""
              />
            </td>
            <td>forhad</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
