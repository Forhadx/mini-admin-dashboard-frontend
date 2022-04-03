import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import UserContext from "../../store/user/User-Context";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const UserCtx = useContext(UserContext);
  const { userSignup, token } = UserCtx;

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "too small username, minimum 3 character")
      .max(60, "too big username, maximum 60 character "),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password at least 6 character"),
    image: Yup.mixed().test(
      "file",
      "Image is required (minimum 5MB)",
      (value) => {
        if (!value.length) {
          return false;
        }
        return value[0].size <= 5000000;
      }
    ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const formSubmitHandler = (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", data.image[0]);
    userSignup(formData);
    reset();
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="auth-page">
      <h3>User Signup</h3>
      <form onSubmit={handleSubmit(formSubmitHandler)} className="form">
        <input
          type="text"
          {...register("username")}
          placeholder="enter username"
        />
        <p>
          <small>{errors.username?.message}</small>
        </p>

        <input type="text" {...register("email")} placeholder="enter email" />
        <p>{errors.email?.message}</p>

        <input
          type="password"
          {...register("password")}
          placeholder="enter password"
        />
        <p>
          <small>{errors.password?.message}</small>
        </p>
        <input type="file" {...register("image")} accept="image/*" />
        <p>
          <small>{errors.image?.message}</small>
        </p>
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an Account?
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
