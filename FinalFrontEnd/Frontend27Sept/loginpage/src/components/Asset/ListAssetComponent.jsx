
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { tokenkey } from '../../Tokens/token';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup'
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";


import Form from 'react-bootstrap/Form'
// import HeaderComponent from '../../Layouts/HeaderComponent';
import HeaderComponent from '../../Layouts/HeaderComponent';
import { toast } from 'react-toastify';

export default function ListAssetComponent() {

  let navigate = useNavigate(); 
  const [assets, setAssets] = useState([])

  const {assetId} = useParams()

//   const [tempasset,setTempAsset]=useState({

//     assetId:"",
//     assetName:"",
//     status:"",
//     timestamp:"",
//     category :{
//         categoryId : ""
//     }, 
//     employee:{
//       employeeId:""
//     }

// })
 
  const [searchTerm, setSearchTerm] = useState('')
  const [tableFilter, setTableFilter] = useState([])
  const [pageNumber, setpageNumber] = useState(2);


  // const assetperpage=5; 
  // const pagesVisited=pageNumber*assetperpage;
  // const pagecount=Math.ceil(assets.length/assetperpage);

  // const changePage=({selected})=>{
  //   setpageNumber(selected)
  // };

  useEffect(() => {
        loadAssets();
        // localStorage.setItem('dataKey', JSON.stringify(assets));
  }, []);

  const filterData = (e) => {
    e.preventDefault()
    if (e.target.value != "") {
      setSearchTerm(e.target.value)
      console.log(searchTerm)
      const filterTable = assets.filter(o => Object.keys(o)
        .some(k => String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        ));
      setTableFilter([...filterTable])
    } else {
      setSearchTerm(e.target.value)
      setAssets([...assets])
    }

  }

  const loadAssets = async() =>{
    const result = await axios.get("http://localhost:8080/admin/asset/list",{

        mode : 'no-cors',
        headers:{
            'Authorization' : `Bearer ${tokenkey}`,
               'Content-type':'application/json',
               'Access-Control-Allow-Origin':`*`
        }
    })
    console.log(result.data);
    setAssets(result.data);
  }


  let ondeleteClick=(assetId,status)=>{
    // totaldelete(assetId,status)
    if(status==="Not Allocated")
    { Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed){
        deleteAsset(assetId) }
    }) 
    }
    else{
      Swal.fire({
        title: 'This Asset is allocated',
        text: "You have to deallocate it first.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, deallocate it!'
      }).then((result) => {
        if(result.isConfirmed){
          deallocateAsset(assetId) }
      }) 
      
     
    }
}

  const deleteAsset = async (assetId) =>{

    await axios.delete(`http://localhost:8080/admin/asset/delete/assetId/${assetId}`, {
      mode : 'no-cors',
        headers:{
            'Authorization' : `Bearer ${tokenkey}`,
            'Content-type':'application/json',
            'Access-Control-Allow-Origin':`*`
        }

    })
    loadAssets()
    toast.success("Asset Deleted Successfully!");

  }

  const deallocateAsset = async (assetId) => {

    await axios.put(`http://localhost:8080/admin/asset/deallocate/assetId/${assetId}`,null, {
      mode : 'no-cors',
      headers:{
        'Authorization' : `Bearer ${tokenkey}`,
        'Content-type':'application/json',
        'Access-Control-Allow-Origin':`*`
      }
      
    })
    loadAssets()
    toast.success("Asset Deallocated Successfully!");
  

  }

  function navigateAddAsset()
  {
    navigate("/admin/asset/addAsset")
  }
 

  return (
    <div>
      <HeaderComponent/>
      <div className='container'>
        <div className='py-4'>
        <h2 className="text-center">Asset List</h2>
        <div className="buttons">
        
              <div className="searchb" style={{ float: "left" }}>
              <div className="input-group">
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"  //basic-addon1
                  value={searchTerm}
                  onChange={filterData}
                />
               
              </div>
            </div>
            <button
              type="button"
              className="btn btn-success button-space button-color "
              style={{ marginRight: "2px", float: "right" }}
              onClick={navigateAddAsset}>
              Add Asset
            </button>
          </div>
 
      </div>

      <br></br>
      <br></br>

      {/* <table className='table table-striped table-bordered'> */}
      {/* <div className="tabcontainer" style={{width:"100%"}}> */}
      <table className="table table-striped" style={{border:"1px solid black"}}>
                <thead>
                  <tr>
                    <th scope="col">Asset ID</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Asset Name</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">Status</th>
                    <th scope="col" >Employee Name</th>
                    <th scope="col" >Actions</th>
                  </tr>                    
                </thead>
                <tbody>
                    {
                      searchTerm.length > 0 ? tableFilter.map((asset) => {

                        return(
        
                        <tr>
        
                          <th scope="row">{asset.assetId}</th>
        
                          <td>{asset.category?.categoryName}</td>
        
                          <td>{asset.assetName}</td>
        
                          <td>{asset.timestamp}</td>
                          <td>{asset.status}</td>
                          <td>{asset.employee?.employeeName}</td>
        
                          {/* <td><button className='btn btn-danger' style={{ marginLeft: "10px" }} onClick={() => deleteUser(employee.employeeID)}>Delete</button></td>
        
                          <td><Link className='btn btn-primary' style={{ marginLeft: "10px" }} to={`/admin/employee/updateEmployee/${employee.employeeID}`}>Update</Link></td> */}
                           <td>
                                    <Link className='btn btn-primary' style={{marginLeft:"0px"}} to={`/admin/asset/update/${asset.assetId}`}>Manage</Link>
                                    <button className='btn btn-danger' style={{marginLeft:"10px"}} onClick={() => ondeleteClick(asset.assetId,asset.status)}>Delete</button>
                                    <button className='btn btn-warning' style={{marginLeft:"10px"}} onClick={() => deallocateAsset(asset.assetId)}>Deallocate</button>
                           </td>
                        </tr>
        
                        )
        
                      })
                      :
                        assets
                        // .slice(pagesVisited, pagesVisited+assetperpage)
                        .map(
                            a => 
                            <tr>
                                <td>{a.assetId}</td>
                                <td>{a.category?.categoryName}</td> 
                                <td>{a.assetName}</td>
                                <td>{a.timestamp}</td>
                                <td>{a.status}</td>
                                <td>{a.employee?.employeeName}</td>
                                <td>
                                    <Link className='btn btn-primary' style={{marginLeft:"0px"}} to={`/admin/asset/update/${a.assetId}`}>Assign</Link>
                                    <button className='btn btn-danger' style={{marginLeft:"10px"}} onClick={() => ondeleteClick(a.assetId,a.status)}>Remove</button>
                                    <button className='btn btn-warning' style={{marginLeft:"10px"}} onClick={() => deallocateAsset(a.assetId)}>Deallocate</button>
                                </td>
                            </tr>
                        )
                    }
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
          activeClassName={"paginationActive"} /> */}
      {/* </div> */}
    </div>
  )
}

