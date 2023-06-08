package com.poc.asset.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.poc.asset.exceptions.ResourceNotFoundException;
import com.poc.asset.model.EmployeeDetails;
import com.poc.asset.repository.EmployeeDetailsRepository;

@Service
public class CustomUserDetailService implements UserDetailsService{
	
	@Autowired
	private EmployeeDetailsRepository employeeDetailsRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		EmployeeDetails emp = this.employeeDetailsRepository.findByUsername(username).orElseThrow(()-> new ResourceNotFoundException("User","username:"+username, 0));
		return emp;
	}

}
