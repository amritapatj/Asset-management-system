import React from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';

// import Validation from "./Validation";


import Registration from "./components/Registration";
import { Container, Navbar,Row,Col } from "react-bootstrap";

import AssetDashboard from './components/Asset/ListAssetComponent';
import UpdateAssetComponent from "./components/Asset/UpdateAssetComponent"
import AdminPrivateRoutes from './components/PrivateRoutes/AdminPrivateRoutes';
import UserDashboard from './components/User/UserDashboard';
import UserPrivateRoutes from './components/PrivateRoutes/UserPrivateRoutes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListEmployeeComponent from './components/Employee/ListEmployeeComponent';
import AddEmployeeComponent from './components/Employee/AddEmployeeComponent';
import UpdateEmployeeComponent from './components/Employee/UpdateEmployeeComponent';
import ListAssetComponent from './components/Asset/ListAssetComponent';
import AddAssetComponent from './components/Asset/AddAssetComponent';
import LoginPage from "./components/User/LoginPage";




function App() {
  return (
    <div>
      <BrowserRouter>     
                    <Routes>

                      <Route path="/" element={<LoginPage />} />

                      <Route path="/admin" element={<AdminPrivateRoutes/>}>
                        <Route path="asset" element={<ListAssetComponent />}  />  
                        <Route path="asset/addAsset" element={<AddAssetComponent/>} />
                        <Route path="asset/update/:assetId" element={<UpdateAssetComponent/>} />
                        <Route path="employee/displaylist" element={<ListEmployeeComponent/>} />  
                        <Route path="employee/addEmployee" element={<AddEmployeeComponent/>} />  
                        <Route path = "employee/updateEmployee/:employeeID" element={<UpdateEmployeeComponent/> } />              
                      </Route>

                      <Route path="/user" element={<UserPrivateRoutes/>}>
                        <Route path="dashboard" element={<UserDashboard/>} />
                      </Route>

                    </Routes>
           </BrowserRouter>
           <ToastContainer autoClose={5000} />
    </div>

  );

}

// let App = () => {
//   return (
//     <div>
//       {/* <Navbar bg="dark" expand="sm" variant="dark">
//         <Container>
//           <Navbar.Brand href="/">*Asset Management Portol</Navbar.Brand>
//           {/* <Validation/> */}

//         {/* </Container>
//       </Navbar> */} */}


//     <div/>
//   );
// }

export default App;
