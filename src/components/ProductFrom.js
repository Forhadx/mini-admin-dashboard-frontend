import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ProductContext from "../store/product/Product-Context";
import { useNavigate } from "react-router-dom";

const ProductFrom = (props) => {
  const navigate = useNavigate();
  const { product } = props;
  const ProductCtx = useContext(ProductContext);
  const { addProduct, updateProduct } = ProductCtx;

  const validationSchema = Yup.object().shape({
    pName: Yup.string()
      .required("Product name is required")
      .min(3, "too small Product name, minimum 3 character")
      .max(60, "too big Product name, maximum 60 character "),
    pPrice: Yup.number()
      .required("price is required")
      .typeError("price is required")
      .min(10, "minimum price 10$")
      .max(200, "maximum price 200$"),
    pImage: product
      ? Yup.mixed()
      : Yup.mixed().test("file", "Image is required (minimum 5MB)", (value) => {
          if (!value.length) {
            return false;
          }
          return value[0].size <= 5000000;
        }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (product) {
      setValue("pName", product.pName);
      setValue("pPrice", product.pPrice);
    }
  }, [product]);

  const formSubmitHandler = async (data) => {
    const formData = new FormData();
    formData.append("pName", data.pName);
    formData.append("pPrice", data.pPrice);
    if (product) {
      if (data.pImage[0]) {
        formData.append("pImage", data.pImage[0]);
      } else {
        formData.append("pImage", product.pImage);
      }
      updateProduct(product._id, formData);
      navigate("/products");
    } else {
      formData.append("pImage", data.pImage[0]);
      addProduct(formData);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className="form">
      <input
        type="text"
        {...register("pName")}
        placeholder="enter product name"
      />
      <p>
        <small>{errors.pName?.message}</small>
      </p>
      <input
        type="number"
        {...register("pPrice")}
        placeholder="enter product Price"
      />
      <p>
        <small>{errors.pPrice?.message}</small>
      </p>
      <input type="file" {...register("pImage")} accept="image/*" />
      <p>
        <small>{errors.pImage?.message}</small>
      </p>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductFrom;
