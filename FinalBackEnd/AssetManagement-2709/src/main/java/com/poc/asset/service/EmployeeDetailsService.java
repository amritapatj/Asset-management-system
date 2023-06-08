package com.poc.asset.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.poc.asset.exceptions.ResourceNotFoundException;
import com.poc.asset.model.Asset;
import com.poc.asset.model.EmployeeDetails;
import com.poc.asset.model.Roles;
import com.poc.asset.repository.AssetRepository;
import com.poc.asset.repository.EmployeeDetailsRepository;
import com.poc.asset.repository.RolesRepository;

@Service
public class EmployeeDetailsService {

	public static final Integer NORMAL_USER = 2;

	@Autowired
	EmployeeDetailsRepository empRepo;
	
	@Autowired
	AssetRepository assetRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RolesRepository rolesRepository;

	public ResponseEntity<Object> registerNewEmployee(EmployeeDetails employee) {
		int id = employee.getEmployeeID();
		if (empRepo.existsById(id)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employee with same id already exists");
		}

		else {

			// encoded the password
			employee.setPassword(this.passwordEncoder.encode(employee.getPassword()));

			// get roles
			Roles role = this.rolesRepository.findById(NORMAL_USER).get();
			employee.getRoles().add(role);
			this.empRepo.save(employee);

			return ResponseEntity.status(HttpStatus.OK).body("Employee Details saved");
		}
	}

	public List<EmployeeDetails> displayEmployee() {
		// TODO Auto-generated method stub
		return empRepo.findAll();
	}

	public EmployeeDetails save(EmployeeDetails employee) {
		// TODO Auto-generated method stub
		return empRepo.save(employee);
	}

	public ResponseEntity<Object> deleteByEmployeeId(int id) {
		// TODO Auto-generated method stub
//		if (!empRepo.existsById(id)) {
//			throw new ResourceNotFoundException("Employee", "id", id);
//		}
		Optional<EmployeeDetails> a1 = empRepo.findById(id);
		EmployeeDetails employeeToDelete = a1.get();
		System.out.println(employeeToDelete.getAssets()); 
		
		if(employeeToDelete.getAssets().isEmpty()) {
			empRepo.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body("Employee with id "+id+" is deleted.");
		}
		else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Assets have been allocated to the employee.");
		}
				
		

		
	}

	public EmployeeDetails updateEmployee(EmployeeDetails employee, int id) {
		// TODO Auto-generated method stub
		Optional<EmployeeDetails> e1 = empRepo.findById(id);
		EmployeeDetails emp = e1.get();
		emp.setEmployeeName(employee.getEmployeeName());
		//emp.setUsername(employee.getUsername());
		//emp.setPassword(employee.getPassword());
		emp.setDepartment(employee.getDepartment());
		
		
		
//		List<Roles> roles = new ArrayList<>();
//		roles = (List<Roles>) this.rolesRepository.findById(NORMAL_USER).get();
//		emp.getRoles().add(roles);
		
		//roles.add(Role.ROLE_USER);
		//user.setRoles(roles);
		
		
		EmployeeDetails updatedEmployee = empRepo.save(emp);
		return updatedEmployee;

	}

	public EmployeeDetails getUpdateEmployee(int id) {
		EmployeeDetails toUpdateEmployee = empRepo.findById(id).get();
		return toUpdateEmployee;
		
	}

	public EmployeeDetails findByID(int id) {
		// TODO Auto-generated method stub
		return empRepo.findById(id).get();
	}

	public List<EmployeeDetails> findEmployeeByName(String employeeName) {
		// TODO Auto-generated method stub
		return empRepo.findByName(employeeName);
	}
//
//	

	

}