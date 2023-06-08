import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import asset from "../components/image/asset6.jpg";
import asset from "../image/asset6.jpg";
// import {useFormik} from "formik";
// import { signUpSchema } from "../schemas/schemalogin";
import { Action } from "@remix-run/router";
import { useState } from "react";
import { validate, setFormErrors, setIsSubmit } from "react";
import login from "../../Services/user-service";
import { doLogin, getRole } from "../../Tokens/token";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = (props) => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkValidateUsername, setcheckValidateUsername] = useState(true);
  const [checkValidateUsernameRegex, setcheckValidateUsernameRegex] =
    useState(true);
  const [checkValidatePassword, setcheckValidatePassword] = useState(true);
  const [checkValidatePassRegex, setcheckValidatePassRegex] = useState(true);
  const [checkAllValidate, setcheckAllValidate] = useState(true);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length === 0) {
      setcheckValidateUsername(false);
      setcheckValidateUsernameRegex(true);
      setcheckAllValidate(true);
    } else if (!e.target.value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$/)) {
      setcheckValidateUsernameRegex(false);
      setcheckValidateUsername(true);
      setcheckAllValidate(true);
    } else {
      setcheckValidateUsername(true);
      setcheckValidateUsernameRegex(true);
      setcheckAllValidate(false || !checkValidatePassword);
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length === 0) {
      setcheckValidatePassword(false);
      setcheckValidatePassRegex(true);
      setcheckAllValidate(true);
    }
     else if(!e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
      setcheckValidatePassRegex(false);
      setcheckValidatePassword(true);
      setcheckAllValidate(true);
      } else{
      setcheckValidatePassword(true);
      setcheckValidatePassRegex(true);
      setcheckAllValidate(false || !checkValidateUsername);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = { username, password };
    console.log(formValues);

    login(formValues)
      .then((resp) => {
        console.log(resp);
        console.log("Success log");
        doLogin(resp, () => {
          console.log("login detail is saved to local storage");
          toast.success("Logged in Successfully!")
        });
        console.log(getRole());
        if (username === "null" && password === "null") {
        } else if (getRole() == 1) {
          navigate("/admin/asset");
          window.location.reload();

        } else if (getRole() == 2) {
          navigate("/user/dashboard");
          window.location.reload();
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Error Log");
        toast.error("Invalid Email or Password")
      });
  };

  return (
    <div className="backbg">
      <br></br>
      <div style={{ marginLeft: "500px" }}>
        <h1>
          <b>Asset Management System</b>
        </h1>
      </div>
      <br />
      <br />
      <br />
      <div className="fmm">
        <Form onSubmit={handleSubmit} className="fm">
          <h3 style={{ marginLeft: "29px", marginTop: "55px" }}>Login</h3>
          <Form.Group style={{ marginLeft: "30px", marginTop: "30px" }}>
            <Form.Label>
              Email Id<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <div
              className={
                checkValidateUsername ? "hidden" : "text-danger textRight"
              }
            >
              This field is required!
            </div>
            <div
              className={
                checkValidateUsernameRegex ? "hidden" : "text-danger textRight"
              }
            >
              Please enter valid Email
            </div>
            <Form.Control
              type="text"
              placeholder="Enter Email Id"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              style={{ width: "400px" }}
            />
          </Form.Group>
          <br />
          <Form.Group style={{ marginLeft: "30px" }}>
            <Form.Label>
              Password<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <div
              className={
                checkValidatePassword ? "hidden" : "text-danger textRight"
              }
            >
              This field is required!
            </div>
            <div
              className={
                checkValidatePassRegex ? "hidden" : "text-danger textRight"
              }
            >
              Please enter valid Password
            </div>
            <Form.Control
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ width: "400px" }}
            />
          </Form.Group>

          <br />
          <Button
            type="submit"
            style={{ marginLeft: "30px" }}
            onClick={handleSubmit}
            disabled={password.length===0 || checkAllValidate||username.length===0}
          >
            Login
          </Button>
          
        </Form>
        <div>
          <span>
            <img className="lgnpic" src={asset} thumbnail style={{}} />
          </span>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
