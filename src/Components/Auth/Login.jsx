import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../schema";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate()


  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    // validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(isLogin ? "Login Data:" : "Signup Data:", values);
      navigate("/home")
      formik.resetForm();
    },
  });

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h3>{isLogin ? "Login" : "Sign Up"}</h3>
        <form onSubmit={formik.handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-rounded"
                onChange={formik.handleChange}
                value={formik.values.name}
                autoComplete="name"
              />
              {formik.errors.name && formik.touched.name && (
                <small className="text-danger">{formik.errors.name}</small>
              )}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-rounded"
              onChange={formik.handleChange}
              value={formik.values.email}
              autoComplete="username"
            />
            {formik.errors.email && formik.touched.email && (
              <small className="text-danger">{formik.errors.email}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control form-control-rounded"
                style={{ paddingRight: "3rem" }}
                onChange={formik.handleChange}
                value={formik.values.password}
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {formik.errors.password && formik.touched.password && (
              <small className="text-danger">{formik.errors.password}</small>
            )}
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="form-control form-control-rounded"
                  style={{ paddingRight: "3rem" }}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  autoComplete="new-password"
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </span>
              </div>
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <small className="text-danger">{formik.errors.confirmPassword}</small>
              )}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Login;
