package com.poc.asset.payloads;

import org.springframework.security.core.userdetails.UserDetails;

import com.poc.asset.model.EmployeeDetails;

public class JwtAuthResponse {
	
	private String token;
	
	private EmployeeDetails employee;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public EmployeeDetails getEmployee() {
		return employee;
	}

	public void setEmployee(EmployeeDetails employee) {
		this.employee = employee;
	}

	@Override
	public String toString() {
		return "JwtAuthResponse [token=" + token + ", employee=" + employee + "]";
	}

	public JwtAuthResponse(String token, EmployeeDetails employee) {
		super();
		this.token = token;
		this.employee = employee;
	}

	public JwtAuthResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	

}
