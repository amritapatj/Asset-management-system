import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EmployeeService from "../../Services/EmployeeService";
import { Navigate, useNavigate } from "react-router-dom";
import { tokenkey } from "../../Tokens/token";
import { useParams } from "react-router-dom";
import HeaderComponent from "../../Layouts/HeaderComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

function ListEmployee() {
  let currentUserRole = JSON.parse(localStorage.getItem("data"))?.employee
    ?.roles[0]?.roleId;
  let currentUserID = JSON.parse(localStorage.getItem("data"))?.employee
    ?.employeeID;
  let navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const { employeeID } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [tableFilter, setTableFilter] = useState([]);
  // const [pageNumber, setpageNumber] = useState(1);

  // const empperpage=7;
  // const pagesVisited=pageNumber*empperpage;
  // const pagecount=Math.ceil(employees.length/empperpage);

  // const changePage=({selected})=>{
  //   setpageNumber(selected)
  // };

  useEffect(() => {
    loadUser();
  }, []);

  const filterData = async (e) => {
    e.preventDefault();

    if (e.target.value != "") {
      setSearchTerm(e.target.value);

      console.log(searchTerm);

      const filterTable = employees.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );

      await setTableFilter([...filterTable]);
    } else {
      setSearchTerm(e.target.value);

      setEmployees([...employees]);
    }
  };

  const loadUser = async () => {
    const result = await axios.get(
      "http://localhost:8080/admin/employee/displaylist",
      {
        mode: "no-cors",
        headers: {
          Authorization: `Bearer ${tokenkey}`,
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": `*`,
        },
      }
    );
    console.log(result.data);
    setEmployees(result.data);
  };

  let ondeleteClick = (employeeID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(employeeID);
      }
    });
  };

  const deleteUser = async (employeeID) => {
    if (currentUserID == employeeID) {
      toast.error("Admin cannot delete themselves!");
    } else {
      try {
        await axios.delete(
          `http://localhost:8080/admin/employee/delete/employeeId/${employeeID}`,
          {
            mode: "no-cors",
            headers: {
              Authorization: `Bearer ${tokenkey}`,
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": `*`,
            },
          }
        );
        toast.success("Employee Deleted successfully!");
        loadUser();
      } catch (error) {
        toast.error("Assets are allocated to the employee");
      }
    }
  };

  function navigateAddEmployee() {
    navigate("/admin/employee/addEmployee");
  }
  function navigateUpdateEmployee(employeeID) {
    navigate(`/admin/employee/updateEmployee/${employeeID}`);
  }

  return (
    <div>
      <HeaderComponent />
      <div className="container">
        <div className="py-4">
          <h2 className="text-center">Employees List</h2>
          {/* <br></br> */}
          <div className="buttons">
            <div className="searchb" style={{ float: "left" }}>
              <div class="input-group">
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  value={searchTerm}
                  onChange={filterData}
                />
                
              </div>
            </div>
            <button
              type="button"
              className="btn btn-success button-space button-color "
              style={{ marginRight: "2px", float: "right" }}
              onClick={navigateAddEmployee}
            >
              Add Employee
            </button>
          </div>

          <br></br>
          <br></br>
          <div className="tabcontainer" style={{ width: "100%" }}>
            <table
              className="table table-striped"
              style={{ border: "1px solid black" }}
            >
              <thead>
                <tr>
                  <th scope="col">Employee Id</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Department</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchTerm.length > 0
                  ? tableFilter.map((employee) => {
                      return (
                        <tr>
                          <th scope="row">{employee.employeeID}</th>

                          <td>{employee.employeeName}</td>

                          <td>{employee.department}</td>

                          <td>{employee.username}</td>

                          <td>
                           
                            <div
                              className="btn btn-primary"
                              style={{ marginLeft: "20px" }}
                              // to={`/admin/employee/updateEmployee/${employee.employeeID}`}
                              onClick={() =>
                                navigateUpdateEmployee(employee.employeeID)
                              }
                            >
                              Update
                            </div>
                            <button
                              className="btn btn-danger"
                              style={{ marginLeft: "10px",marginTop:"5px" }}
                              onClick={() => ondeleteClick(employee.employeeID)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : employees
                      // .slice(pagesVisited, pagesVisited+empperpage)
                      .map((employee) => (
                        <tr>
                          <th scope="row">{employee.employeeID}</th>
                          <td>{employee.employeeName}</td>
                          <td>{employee.department}</td>
                          <td>{employee.username}</td>
                          <td>
                            <div>
                              <div
                                className="btn btn-primary"
                                style={{ marginLeft: "20px" }}
                                // to={`/admin/employee/updateEmployee/${employee.employeeID}`}
                                onClick={() =>
                                  navigateUpdateEmployee(employee.employeeID)
                                }
                              >
                                Update
                              </div>
                              <button
                                className="btn btn-danger"
                                style={{ marginLeft: "10px" }}
                                onClick={() =>
                                  ondeleteClick(employee.employeeID)
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
              </tbody>
            </table>
          </div>
          <br></br>
          {/* <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pagecount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledLinkClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}

           /> */}
        </div>
      </div>
    </div>
  );
}

export default ListEmployee;
