import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../store/user/User-Context";

const Login = () => {
  const navigate = useNavigate();
  const UserCtx = useContext(UserContext);
  const { userLogin, token } = UserCtx;

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password at least 6 character"),
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
    userLogin(data);
    reset();
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="auth-page">
      <h3>User Login</h3>
      <form onSubmit={handleSubmit(formSubmitHandler)} className="form">
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

        <button type="submit">Login</button>
      </form>
      <p>
        New at here?
        <Link to="/signup">Create Account</Link>
      </p>
    </div>
  );
};

export default Login;
