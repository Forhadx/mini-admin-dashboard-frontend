import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import UserContext from "../../store/user/User-Context";

const Login = () => {
  const UserCtx = useContext(UserContext);
  const { userLogin } = UserCtx;

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

  return (
    <div className="form-page">
      <h3>User Signup</h3>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
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
