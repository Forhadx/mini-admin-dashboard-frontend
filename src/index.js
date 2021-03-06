import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./store/user/User-Context";
import { ProductContextProvider } from "./store/product/Product-Context";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ProductContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
