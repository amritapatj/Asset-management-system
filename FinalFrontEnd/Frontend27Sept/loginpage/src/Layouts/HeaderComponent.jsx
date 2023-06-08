import React from "react";
import { useState ,useEffect} from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Container, Span } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import LogoutIcon from "../components/image/LogoutIcon.png";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { doLogout } from "../Tokens/token";
import useric from "../components/image/useric.png";


export default function HeaderComponent() {
  const [show, setShow] = useState(false);

  const [username, setUsername] = useState(null);

  useEffect(()=>{
    const user =  JSON.parse(localStorage.getItem("data"))
    setUsername(user.employee.employeeName);

  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="bg">
      <div className="header">
        <nav class="navbar navbar-expand-lg navbar-light bg">
          <ul class="navbar-nav" style={{ marginLeft: "40px" }}>
            <li class="nav-item active">
              <Link
                class="nav-link"
                type="button"
                tag={NavLink}
                to="/admin/asset"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "large",
                }}
              >
                Assets
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link"
                type="button"
                tag={NavLink}
                to="/admin/employee/displaylist"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "large",
                }}
              >
                Employees
              </Link>
            </li>
          </ul>

          <a
            class="navbar-brand"
            href="#"
            style={{ color: "white", fontSize: "xx-large" }}
          >
            Asset Management System
          </a>

          <ul class="navbar-nav" style={{ marginLeft: "250px" }}>
            <div style={{display:"flex", displayDirection:"row"}}>
            <li style={{fontWeight: "bold",fontSize: "large",color:"white",marginRight:"10px",marginTop:"6px"}}>Hello</li>
            <li class="nav-item active" style={{color:"white",fontWeight:"bold", fontSize:"large",marginRight:"18px",marginTop:"6px"}}>{username}</li>
            <li style={{marginRight:"70px",marginTop:"10px"}}><button type="button" class="btn btn-dark" style={{fontWeight: "bold",fontSize: "large"}} onClick={doLogout}>Logout</button></li>

            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}
