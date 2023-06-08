
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import Form from "react-bootstrap/Form";
// import HeaderComponent from './Layouts/HeaderComponent';


import { useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import { tokenkey } from "../../Tokens/token";
import itpic from "../image/it2.jpg";
import HeaderComponent from '../../Layouts/HeaderComponent';
import { toast } from 'react-toastify';



const options=[
    {label:"111 : Laptop", value:111},
    {label:"222 : Mouse", value:222},
    {label:"333 : Headset", value:333}
];

export default function UpdateAssetComponent() {
    let navigate = useNavigate();
    const {assetId,assetName} = useParams();

    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    const [asset,setAsset]=useState({

        assetId:"",
        assetName:"",
        status:"",
        category :{
            categoryId : ""
        },
        employee:{
            employeeID:""
        }

  })

   //const {assetId, assetName} = asset

  //handle selection
  const handleChange = (value) =>{
    console.log(value);
    setSelectedValue(value.target.value);
    // setValue(value);
  }

  const onInputChange = (e) => {
    //const name = [e.target.name];
    // console.log({...asset, [e.target.name] : e.target.value});
    setAsset({...asset, employee: {[e.target.name] : e.target.value}})
  }

  // const onDropDownChange = (e) =>{
  //   const temp = {
  //       categoryId : e.target.value
  //   }
  //   setAsset({...asset, category : temp});
  // }

  useEffect(() => {
    console.log(assetId);
    loadAsset();
  }, []);

  
  const loadAsset = async ()=>{
    const result = await axios.get(`http://localhost:8080/admin/asset/toUpdate/${assetId}`, {
        mode : 'no-cors',
        headers:{
            'Authorization' : `Bearer ${tokenkey}`,
               'Content-type':'application/json',
               'Access-Control-Allow-Origin':`*`
        }
    })
    console.log(result.data)
    setAsset(result.data)
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    try{
    const tempasset = {assetId:asset.assetId, assetName:asset.assetName,employee:{"employeeID":asset.employee.employeeID}}
    
    const response = await axios.put(`http://localhost:8080/admin/asset/update/${assetId}`, tempasset, {
        mode : 'no-cors',
        headers:{
            'Authorization' : `Bearer ${tokenkey}`,
               'Content-type':'application/json',
               'Access-Control-Allow-Origin':`*`
        }
    })
    console.log(response);
    navigate("/admin/asset")
    toast.success("Asset Updated Successfully!");
  }
  catch(error){
    toast.error("Employee Id does not exist")

  }
}

  
  return(
    <div>
      <HeaderComponent/>
      <br></br>
      <div className='Cardupdate' style={{ display: "flex" }}>
        <Form onSubmit={(e)=>onSubmit(e)}
        style={{
          width: "500px",
          marginLeft: "150px",
          padding: "20px",
          border: "shadow",
          marginTop:"54px"
        }}
        >
          <h3 className="text-center" style={{fontSize:"xx-large", fontWeight:"bold"}}>Assign Asset</h3>
          <br></br>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginLeft:"50px"}}>
            <Form.Label>Asset ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Asset Id"
              name="AssetID"
              value={asset.assetId}
              onChange={(e) => onInputChange(e)}
              style={{width:"370px"}}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginLeft:"50px"}}>
            <Form.Label>Asset Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Asset Name"
              name="assetName"
              value={asset.assetName}
              onChange={(e) => onInputChange(e)}
              style={{width:"370px"}}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginLeft:"50px"}}>
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Employee ID"
              name="employeeID"
              value={asset.employee && asset.employee.employeeID}
              onChange={(e) => onInputChange(e)}
              style={{width:"370px"}}
              required
              pattern="^[0-9]+$"
              title='Enter a valid Employee ID'
            />
            {/* <input type={"text"} placeholder='Employee Id' name="employeeID" className='form-control' value={asset.employee && asset.employee.employeeID} onChange={(e)=>onInputChange(e)}/> */}
          </Form.Group>
          
                        <br></br>
                        <button className='btn btn-primary' style={{marginLeft:"140px"}} onClick={()=>onSubmit()}>Submit</button>
                        <Link className='btn btn-danger' to="/admin/asset"  style={{marginLeft:"10px"}}>Cancel</Link>

        </Form>
       <div>
       <img
            src={itpic}
            alt="cannot display"
            style={{ marginTop: "20px", marginRight: "220px", height:"450px", width:"550px"}}
          />
       </div>
      </div>

    </div>
  
  )
}
