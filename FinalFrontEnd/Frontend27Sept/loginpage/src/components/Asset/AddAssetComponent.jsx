
// import axios from 'axios';
// import React from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { tokenkey } from "../../Tokens/token";

// const options=[
//     {label:"111 : Laptop", value:111},
//     {label:"222 : Mouse", value:222},
//     {label:"333 : Headset", value:333}
// ];

// export default function AddAssetComponent() {

//     let navigate = useNavigate();

//     const [inputValue, setValue] = useState('');
//     const [selectedValue, setSelectedValue] = useState(null);

//     const [asset,setAsset]=useState({

//         assetId:"",
//         assetName:"",
//         category :{
//             categoryId : ""
//         }
//   })

//   const {assetId, assetName, categoryId} = asset

//   //handle selection
//   const handleChange = (value) =>{
//     console.log(value);
//     setSelectedValue(value.target.value);
//     // setValue(value);
//   }

//   const onInputChange = (e) => {
//     const name = [e.target.name];
//     setAsset({...asset, [e.target.name] : e.target.value})
//   }

//   const onDropDownChange = (e) =>{
//     console.log(e.target.value);
//     const temp = {
//         categoryId : e.target.value
//     }
//     setAsset({...asset, category : temp});
//   }

//   const onSubmit = async(e) => {
//     e.preventDefault();
//     console.log(asset)
//     await axios.post("http://localhost:8080/admin/asset/addAsset", asset, {
//         mode : 'no-cors',
//         headers:{
//             'Authorization' : `Bearer ${tokenkey}`,
//                'Content-type':'application/json',
//                'Access-Control-Allow-Origin':`*`
//         }
//     })
    
//     navigate("/admin/asset")
//   }

//   return (
//     <div>
//         <div className='container'>
//             <div className='row'>
//             <div className='card col-md-6 offset-md-3 offset-md-3'>
//                 <h2 className='text-center'>Add Asset</h2>
            
//             <div className='card-body'>
//                     <form onSubmit={(e)=>onSubmit(e)}>
//                        <div className='form-group'>
//                            <label>Asset ID:</label>
//                            <input type={"text"} placeholder='Asset Id' name="assetId" className='form-control' value={assetId} onChange={(e)=>onInputChange(e)}/>
//                         </div>

//                         <div className='form-group'>
//                            <label>Asset Name</label>
//                            <input type={"text"} placeholder='Asset Name' name="assetName" className='form-control' value={assetName} onChange={(e)=>onInputChange(e)}/>
//                         </div>

//                         {/* <div className='form-group'>
//                             <label>Category ID</label>
//                             <DropdownButton id="dropdown-basic-button" title="Category ID">
//                                 <Dropdown.Item href="#/action-1">111:Laptop</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-2">222:Mouse</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-3">333:Headset</Dropdown.Item>
//                             </DropdownButton>
//                         </div> */}

//                         <div className='form-group'>
//                             <label>Category ID</label>
//                             <select value={selectedValue} name="categoryId" onChange={(e) => onDropDownChange(e)}>
//                               <option >Select Category</option>
//                                 {options.map((option) => (
//                                     <option value={option.value}>{option.label}</option>
//                                 ))}
//                             </select>
//                         </div>
                        
    
//                       <br></br>

//                         <button className='btn btn-success'>Save</button>
//                        <button className='btn btn-danger'  style={{marginLeft:"10px"}}>Cancel</button>
//                     </form>
//                     </div>
//             </div>
//                     </div>
//         </div>
//     </div>
//   )
// }


import axios from 'axios';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from "react-bootstrap/Form";
// import HeaderComponent from './Layouts/HeaderComponent';
//import LogoutIcon from "../image/LogoutIcon";
import asset from "../image/asset2.jpg"
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { tokenkey } from "../../Tokens/token";
import itpic from "../image/asset7.png";
import HeaderComponent from '../../Layouts/HeaderComponent';
import { toast } from 'react-toastify';



const options=[
    {label:"Laptop", value:111},
    {label:"Mouse", value:222},
    {label:"Headset", value:333}
];

export default function AddAssetComponent() {

    let navigate = useNavigate();

    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    // const [checkValidateAssetIdRegex,setcheckValidateAssetIdRegex]=useState(true)
    // const [checkValidateAssetNameRegex, setcheckValidateAssetNameRegex]=useState(true)

    const [asset,setAsset]=useState({

        assetId:"",
        assetName:"",
        category :{
            categoryId : ""
        }
  })

  const {assetId, assetName, categoryId} = asset

  //handle selection
  const handleChange = (value) =>{
    console.log(value);
    setSelectedValue(value.target.value);
    // setValue(value);
  }

  const onInputChange = (e) => {
    const name = [e.target.name];
    setAsset({...asset, [e.target.name] : e.target.value})
    // if(!e.target.value.match(/^[0-9]+$/)){
    //   setcheckValidateAssetIdRegex(false)      
    // }
    // else{
    //   setcheckValidateAssetIdRegex(true)
    // }

  }

  const onDropDownChange = (e) =>{
    console.log(e.target.value);
    const temp = {
        categoryId : e.target.value
    }
    setAsset({...asset, category : temp});
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    console.log(asset)
    try{
    await axios.post("http://localhost:8080/admin/asset/addAsset", asset, {
        mode : 'no-cors',
        headers:{
            'Authorization' : `Bearer ${tokenkey}`,
               'Content-type':'application/json',
               'Access-Control-Allow-Origin':`*`
        }
    })
    toast.success("Asset Added Successfully!");
    navigate("/admin/asset");
    }
    catch(error){
      toast.error("Invalid data")
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
          <h3 className="text-center" style={{fontSize:"xx-large", fontWeight:"bold"}}>Add Asset</h3>
          <br></br>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginLeft:"50px"}}>
            <Form.Label>Asset ID</Form.Label>
            {/* <div className={checkValidateAssetIdRegex?"hidden":"text-danger textRight"}>Please enter AssetID</div> */}
            <Form.Control
              type="text"
              placeholder="Asset Id"
              name="assetId"
              value={assetId}
              onChange={(e) => onInputChange(e)}
              style={{width:"370px"}}
              required
              pattern="^[0-9]+$"
              title='Enter Only Numbers'
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginLeft:"50px"}}>
            <Form.Label>Asset Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Asset Name"
              name="assetName"
              value={assetName}
              onChange={(e) => onInputChange(e)}
              style={{width:"370px"}}
              required
              
              title='Enter Proper Name'
            />
          </Form.Group>
          <div className='form-group' style={{marginLeft:"50px"}}>
                             <label>Category ID</label>
                             <br></br>
                             <br></br>

                            <select value={selectedValue} name="categoryId" onChange={(e) => onDropDownChange(e)}>
                              
                               <option >Select Category</option>
                                 {options.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <br></br>
                        <button className='btn btn-primary' style={{marginLeft:"140px"}} onClick={()=>onSubmit()}>Submit</button>
                        <Link className='btn btn-danger' to="/admin/asset"  style={{marginLeft:"10px"}} >Cancel</Link>

        </Form>
       <div>
       <img
            src={itpic}
            alt=""
            style={{ marginTop: "80px", marginRight: "175px", height:"450px", width:"650px" }}
          />
       </div>
      </div>

    </div>
  )
    
}