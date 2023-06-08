package com.poc.asset.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poc.asset.model.EmployeeDetails;

@Repository
public interface EmployeeDetailsRepository extends JpaRepository<EmployeeDetails, Integer>{

	Optional<EmployeeDetails> findByUsername(String username);

	@Query(value = "SELECT * FROM employee_details WHERE employee_name=?1 ", nativeQuery = true)
	List<EmployeeDetails> findByName(String employeeName);

}
