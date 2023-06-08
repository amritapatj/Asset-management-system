import React from "react";
import axios from "axios";
import { tokenkey } from "../../Tokens/token";
import { useEffect, useState } from "react";
import HeaderEmployeeComp from "../../Layouts/HeaderEmployeeComp";


function UserDashboard() {
  let currentUserName = JSON.parse(localStorage.getItem("data"))?.employee
    ?.employeeName;
  let currentUserID = JSON.parse(localStorage.getItem("data"))?.employee
    ?.employeeID;
    let currentUserDepartment = JSON.parse(localStorage.getItem("data"))?.employee
    ?.department;

  const [assets, setAssets] = useState([]);
  // const tempId={curentUsserID}
  console.log(currentUserID);

  useEffect(() => {
    // window.location.reload()
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(
      `http://localhost:8080/user/find/employeeId/${currentUserID}`,
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
    setAssets(result.data);
  };

  return (
    <div>
      <HeaderEmployeeComp />
     

        
        <br></br>
        <h1 style={{ textAlign: "center" }}>Hello {currentUserName}</h1>
        <h2 style={{ textAlign: "center" }}>Employee ID : {currentUserID}</h2>
        <h2 style={{ textAlign: "center" }}>Department : {currentUserDepartment}</h2>

        <br></br>

        <table
          className="table table-striped"
          style={{
            border: "1px solid black",
            height: "100px",
            width: "400px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <thead>
            <tr>
              <th scope="col">Asset Id</th>
              <th scope="col">Asset Name</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr>
                <th>{asset.assetId}</th>
                <th>{asset.assetName}</th>
              </tr>
            ))}
          </tbody>
        </table>
        
     
    </div>
  );
}

export default UserDashboard;
