import React from "react";
import { useState ,useEffect} from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Container, Span } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import LogoutIcon from "../components/image/LogoutIcon.png";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { doLogout } from "../Tokens/token";
import lg from "../components/image/LogoutIcon.png";



export default function HeaderComponent() {
  const [show, setShow] = useState(false);

  const [username, setUsername] = useState(null);

  useEffect(()=>{
    const user =  JSON.parse(localStorage.getItem("data"))
    setUsername(user.employee.employeeName);

   })


  return (
    <div className="bg">
      <div className="header">
        <nav class="navbar navbar-expand-lg navbar-light bg">
          <a
            class="navbar-brand"
            href="#"
            style={{ color: "white", fontSize: "xx-large", marginLeft:"560px" }}
          >
            Asset Management System
          </a>

          <ul class="navbar-nav" style={{ marginLeft: "250px" }}>
            <div style={{display:"flex", displayDirection:"row", marginTop:"3px"}}>
            <li style={{fontWeight: "bold",fontSize: "large",color:"white",marginRight:"30px",marginTop:"6px"}}>Hello</li>
            <li class="nav-item active" style={{color:"white",fontWeight:"bold", fontSize:"large",marginRight:"18px",marginTop:"6px"}}>{username}</li>
            <li style={{marginRight:"30px"}}><button type="button" class="btn btn-dark" style={{fontWeight: "bold",fontSize: "large"}} onClick={doLogout}>Logout</button></li>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
  }
