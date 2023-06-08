
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import asset from "../components/image/asset.jpg";
import { tokenkey } from "../../Tokens/token";
import asset from "../image/asset1.png";
import HeaderComponent from "../../Layouts/HeaderComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = [
  { label: "Dev", value: "Dev" },
  { label: "UI/UX", value: "UI/UX" },
  { label: "QA", value: "QA" },
  { label: "HR", value: "HR" },
  { label: "IT Team", value: "IT" },
];

export default function UpdateEmployeeComponent() {
  let navigate = useNavigate();

  const { employeeID } = useParams();
  const [selectedValue, setSelectedValue] = useState(null);
  

  const [employee, setEmployee] = useState({
    
    employeeID:"",
    employeeName: "",
    department: "",
    username: "",
    password: ""
    
  })

  const onDropDownChange = (e) => {
    console.log(e.target.value);
    const temp = e.target.value;

    setEmployee({ ...employee, department: temp });
  };

  // const { employeeName,department } = employee;

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log("code with arjun")
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const tempemployee = {employeeName: employee.employeeName, department: employee.department}

    const response = await axios.put(`http://localhost:8080/admin/employee/update/${employeeID}`, tempemployee, {
        mode: "no-cors",
        headers: {
          Authorization: `Bearer ${tokenkey}`,
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": `*`,
        }
      })
    console.log(response);
    navigate("/admin/employee/displaylist");
    toast.success("Employee Updated Successfully!");

    
  }

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/admin/employee/toUpdate/${employeeID}`,
      {
        mode: "no-cors",
        headers: {
          Authorization: `Bearer ${tokenkey}`,
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": `*`,
        }
      }
    )
    setEmployee(result.data)
    
  }

  return (
    <div>
      <HeaderComponent />
      <br></br>
      <br></br>

      <div className="Cardupdate" style={{ display: "flex" }}>
        <Form onSubmit={(e)=>onSubmit(e)}
          style={{
            width: "500px",
            marginLeft: "150px",
            border: "shadow",
            padding: "20px",
          }}
        >
          <h3
            className="text-center"
            style={{ fontSize: "xx-large", fontWeight: "bold" }}
          >Update Employee</h3>
          <br></br>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Employee ID:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Employee Id"
              name="employeeID"
              value={employee.employeeID}
              onChange={(e) => onInputChange(e)}
              required
              pattern="^[0-9]+$"
              title='Enter a valid Employee ID'
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Employee Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Employee Name"
              name="employeeName"
              value={employee.employeeName}
              onChange={(e) => onInputChange(e)}
              required
              pattern="^[a-zA-Z][a-zA-Z ]*$"
              title='Enter a Employee Name'

             
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
              <option>{employee.department}</option>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <br></br>

          <button
          className="btn btn-primary"
            variant="success"
            type="submit"
            style={{ marginLeft: "140px" }}
            onClick={() => onSubmit()}
          >
            Update
          </button>

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
            alt="cannot display"
            style={{ marginTop: "50px", marginRight: "120px" }}
          />
        </div>
      </div>
    </div>
  );
}
