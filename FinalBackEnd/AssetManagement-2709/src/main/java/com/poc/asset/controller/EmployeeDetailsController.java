package com.poc.asset.controller;

import java.awt.PageAttributes.MediaType;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poc.asset.model.Asset;
import com.poc.asset.model.EmployeeDetails;
import com.poc.asset.service.EmployeeDetailsService;
import javax.validation.Valid;
@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping(path="/admin/employee")
public class EmployeeDetailsController {
    
    @Autowired
    EmployeeDetailsService empService;
    
    @GetMapping(path="/displaylist")
    public List<EmployeeDetails> displayAll()
    {
        return empService.displayEmployee();
    }
    
    
    
    @DeleteMapping(path="/delete/employeeId/{id}")
    public ResponseEntity<Object> deleteByID(@PathVariable int id)
    
    {
    	return empService.deleteByEmployeeId(id);
       
        
    }
    
    
    
    @PutMapping(path="/update/{id}")
    public EmployeeDetails updateEmployee( @Valid @RequestBody EmployeeDetails newemployee,@PathVariable int id) {
    	
        
         return empService.updateEmployee(newemployee,id);
       
   }
    
    @GetMapping(path="/toUpdate/{id}")
    public EmployeeDetails getUpdateEmployee(@PathVariable int id) {
    	return empService.getUpdateEmployee(id);
    }
    
    @PostMapping(path="/addEmployee")
    public ResponseEntity<Object> registerEmployee(@RequestBody EmployeeDetails employee) {
		return  this.empService.registerNewEmployee(employee);
//    	return new ResponseEntity<EmployeeDetails>(newEmployee, HttpStatus.CREATED);
    	
		
		
	}
    @GetMapping(path="/search/employee/{id}")
    public EmployeeDetails findByID(@PathVariable int id)
    
    {
		return empService.findByID(id);
    	
    }
    
    @GetMapping(path="/find/employee/{employeeName}")
	public List<EmployeeDetails> findByName(@PathVariable String employeeName)
	{
		return empService.findEmployeeByName(employeeName);
	}
//    
    
}
    