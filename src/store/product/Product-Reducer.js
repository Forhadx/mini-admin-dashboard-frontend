const Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_START":
      return {
        ...state,
        products: [],
        loading: true,
        error: false,
      };
    case "FETCH_PRODUCTS_ERROR":
      return {
        ...state,
        products: [],
        loading: false,
        error: true,
      };
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.products,
        loading: false,
        error: false,
      };
    case "ADD_PRODUCTS_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "ADD_PRODUCTS_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: state.products.concat(action.product),
        loading: false,
        error: false,
      };
    case "DELETE_PRODUCTS_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "DELETE_PRODUCTS_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "DELETE_PRODUCTS":
      let afterDeleteProducts = state.products.filter(
        (prod) => prod._id !== action.id
      );
      return {
        ...state,
        products: afterDeleteProducts,
        loading: false,
        error: false,
      };
    case "UPDATE_PRODUCT_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "UPDATE_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "UPDATE_PRODUCT":
      let updateEditProducts = [...state.products];
      let updateProductIndex = updateEditProducts.findIndex(
        (prod) => prod._id === action.product._id
      );
      updateEditProducts[updateProductIndex] = action.product;
      return {
        ...state,
        products: updateEditProducts,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default Reducer;
