import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenkey } from "../../Tokens/token";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HeaderComponent from "../../Layouts/HeaderComponent";
import asset from "../image/asset2.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = [
  { label: "Dev", value: "Dev" },
  { label: "UI/UX", value: "UI/UX" },
  { label: "QA", value: "QA" },
  { label: "HR", value: "HR" },
  { label: "IT Team", value: "IT" },
];
let dropDownFlag = false;
let temp=""

function AddEmployeeComponent() {
  let navigate = useNavigate();
  let [selectedValue, setSelectedValue] = useState([]);
 

  const [employee, setEmployee] = useState({
    employeeID: "",
    employeeName: "",
    department: "",
    username: "",
    password: "",
  });

  const onDropDownChange = (e) => {
    temp = e.target.value;
    // console.log(temp)
    setSelectedValue=temp
    setEmployee({...employee, department: temp });
    console.log(employee.department)
    dropDownFlag=true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(dropDownFlag)
    // console.log(employee.department)
    if(dropDownFlag===true){

      console.log(dropDownFlag)
    
    try {
     
      await axios.post(
        "http://localhost:8080/admin/employee/addEmployee",
        employee,
        {
          mode: "no-cors",
          headers: {
            Authorization: `Bearer ${tokenkey}`,
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": `*`,
          },
        }
      );

      toast.success("Employee Added Successfully");
      navigate("/admin/employee/displaylist");
    } 
    catch(error){
      toast.error("Employee ID already exist")
    }
  }
  else{
    toast.error("Please Select Department")
  }
  
  };

  const { employeeID, employeeName, username, department, password } = employee;

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <HeaderComponent />
      <br></br>
      <div className="Cardupdate" style={{ display: "flex" }}>
        <Form
          onSubmit={(e) => onSubmit(e)}
          style={{
            width: "500px",
            marginLeft: "150px",
            padding: "20px",
            border: "shadow",
          }}
        >
          <h3
            className="text-center"
            style={{ fontSize: "xx-large", fontWeight: "bold" }}
          >
            Add Employee
          </h3>
          <br></br>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Employee Id"
              name="employeeID"
              value={employeeID}
              onChange={(e) => onInputChange(e)}
              required
              pattern="^[0-9]+$"
              title="Enter a valid Employee ID"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Employee Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Employee Name"
              name="employeeName"
              value={employeeName}
              onChange={(e) => onInputChange(e)}
              required
              pattern="^[a-zA-Z][a-zA-Z ]*$"
              title="Enter a Employee Name"
            />
          </Form.Group>

          <div className="form-group">
            <label>Department</label>
            <br></br>

            <select
              value={employee.department}
              name="department"
              onChange={(e) => onDropDownChange(e)}
            >
              <option>Select Department</option>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            style={{ marginTop: "10px" }}
          >
            <Form.Label>Email Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email Id"
              name="username"
              value={username}
              onChange={(e) => onInputChange(e)}
              required
              pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$"
              title="Enter a valid Department"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Employee Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
              required
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
              title="Enter a valid Password"
            />
          </Form.Group>
          <br></br>

          <Button
            variant="primary"
            type="submit"
            style={{ marginLeft: "140px" }}
          >
            Submit
          </Button>
          <Link
            className="btn btn-danger"
            to={`/admin/employee/displaylist`}
            style={{ marginLeft: "20px" }}
          >
            Cancel
          </Link>
        </Form>
        <div>
          <img
            src={asset}
            alt=""
            style={{ marginTop: "50px", marginRight: "120px" }}
          />
        </div>
      </div>
    </div>
  );
}


export default AddEmployeeComponent;
