package com.poc.asset.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Asset {

	@Id
	private int assetId;
	private String assetName;
	private String status;
	
	@JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	private LocalDateTime timestamp;
	
	@PrePersist
    private void onCreate() {
        timestamp = LocalDateTime.now ();
    }
	
	@ManyToOne(targetEntity=Category.class)
	@JoinColumn(name="category_id")
	Category category;
	
	@ManyToOne
	@JoinColumn(name="employee_id")
	EmployeeDetails employee;

	public int getAssetId() {
		return assetId;
	}

	public void setAssetId(int assetId) {
		this.assetId = assetId;
	}

	public String getAssetName() {
		return assetName;
	}

	public void setAssetName(String assetName) {
		this.assetName = assetName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public EmployeeDetails getEmployee() {
		return employee;
	}

	public void setEmployee(EmployeeDetails employee) {
		this.employee = employee;
	}

	
	
	public Asset(int assetId, String assetName, String status, LocalDateTime timestamp, Category category,
			EmployeeDetails employee) {
		super();
		this.assetId = assetId;
		this.assetName = assetName;
		this.status = status;
		this.timestamp = timestamp;
		this.category = category;
		this.employee = employee;
	}

	public Asset()
	{
		
	}
}
