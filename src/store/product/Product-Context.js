import { createContext, useCallback, useReducer } from "react";
import axios from "../../Util/axios";
import Reducer from "./Product-Reducer";

const ProductContext = createContext({
  products: [],
  loading: false,
  error: false,
  fetchProducts: function () {},
  addProduct: function (data) {},
  updateProduct: function (id) {},
  deleteProduct: function (id) {},
});

const initialState = {
  products: [],
  loading: false,
  error: false,
};

export function ProductContextProvider(props) {
  const [productState, dispatch] = useReducer(Reducer, initialState);

  const onFetchProducts = useCallback(async (userToken) => {
    dispatch({ type: "FETCH_PRODUCTS_START" });
    try {
      const result = await axios.get("/api/products", {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });
      dispatch({
        type: "FETCH_PRODUCTS",
        products: result.data.products,
      });
    } catch (err) {
      dispatch({ type: "FETCH_PRODUCTS_ERROR" });
    }
  }, []);

  const onAddProduct = useCallback(async (data, userToken) => {
    dispatch({
      type: "ADD_PRODUCTS_START",
    });
    try {
      const result = await axios.post("/api/product", data, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });
      dispatch({
        type: "ADD_PRODUCTS",
        product: result.data.product,
      });
    } catch (err) {
      dispatch({
        type: "ADD_PRODUCTS_ERROR",
      });
    }
  }, []);

  const onUpdateProduct = useCallback(async (id, data, userToken) => {
    dispatch({
      type: "UPDATE_PRODUCT_START",
    });
    try {
      const result = await axios.patch(`/api/product/${id}`, data, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });
      dispatch({
        type: "UPDATE_PRODUCT",
        product: result.data.product,
      });
    } catch (err) {
      dispatch({
        type: "UPDATE_PRODUCT_ERROR",
      });
    }
  }, []);

  const onDeleteProduct = useCallback(async (id, userToken) => {
    dispatch({
      type: "DELETE_PRODUCTS_START",
    });
    try {
      await axios.delete(`/api/product/${id}`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });
      dispatch({
        type: "DELETE_PRODUCTS",
        id: id,
      });
    } catch (err) {
      dispatch({
        type: "DELETE_PRODUCTS_ERROR",
      });
    }
  }, []);

  const context = {
    products: productState.products,
    loading: productState.loading,
    error: productState.error,
    fetchProducts: onFetchProducts,
    addProduct: onAddProduct,
    updateProduct: onUpdateProduct,
    deleteProduct: onDeleteProduct,
  };
  return (
    <ProductContext.Provider value={context}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
