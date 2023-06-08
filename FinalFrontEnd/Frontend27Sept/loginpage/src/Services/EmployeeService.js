import axios, { Axios } from 'axios';
import { tokenkey } from '../Tokens/token';

// const EMPLOYEE_API_BASE_URL="http://localhost:8080/admin/employee/displaylist"
// const ADD_EMPLOYEE_API_URL="http://localhost:8080/admin/employee/addEmployee"
// const DELETE_EMPLOYEE_API_URL="http://localhost:8080/admin/employee/delete"




class EmployeeService {

    getEmployees(){
    
        return axios.get("http://localhost:8080/admin/employee/displaylist",{
           mode : 'no-cors',
           headers: {       
               'Authorization' : `Bearer ${tokenkey}`,
               'Content-type':'application/json',
               'Access-Control-Allow-Origin':`*`
       
           }
        }); }



    // addEmployee(employee)
    // {
        
    //     return axios.post("/admin/employee/addEmployee", employee,{
            

    //         mode : 'no-cors',
    //        headers: {       
    //            'Authorization' : `Bearer ${tokenkey}`,
    //            'Content-type':'application/json',
    //            'Access-Control-Allow-Origin':`*`
       
    //        }
    //     }
            
    //     );
    // }
    // deleteEmployee(employeeID)
    // {
    //     return axios.delete(DELETE_EMPLOYEE_API_URL+"/"+employeeID);
    // }
}
export default new EmployeeService()