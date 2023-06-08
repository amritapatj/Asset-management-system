package com.poc.asset.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.AbstractPasswordEncoder;
import org.springframework.stereotype.Service;

import com.poc.asset.model.Asset;
import com.poc.asset.model.EmployeeDetails;
import com.poc.asset.model.Roles;
import com.poc.asset.repository.AssetRepository;
import com.poc.asset.repository.EmployeeDetailsRepository;

@Service
public class AssetService {

	@Autowired
	AssetRepository assetRepo;

	@Autowired
	EmployeeDetailsRepository empRepo;

	public List<Asset> display() {

		return assetRepo.findAll();
	}
	
	 

	public ResponseEntity<Object> addNewAsset(Asset asset) {

		int id = asset.getAssetId();
		if (assetRepo.existsById(id)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Asset with same id already exists");
		}

		else {
			asset.setStatus("Not Allocated");
			asset.setEmployee(null);
			asset.setTimestamp(LocalDateTime.now ());
			this.assetRepo.save(asset);
			return ResponseEntity.status(HttpStatus.OK).body("Asset Details saved");
		}

	}

	public ResponseEntity<Object> deleteByAssetId(int id) {

		Optional<Asset> a1 = assetRepo.findById(id);
		Asset assetToDelete = a1.get();

		System.out.println(assetToDelete.getStatus());
		if (assetToDelete.getStatus().equalsIgnoreCase("Allocated")) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Asset is Allocated");
		} else {
			assetRepo.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body("Asset Deleted");
		}

	}

	public Asset findByAssetId(int id) {

		return assetRepo.findById(id).get();
	}
	public List<Asset> findAssetByCategoryId(int category_id) {
		// TODO Auto-generated method stub
		return assetRepo.findByCategoryId(category_id);
	}

	public List<Asset> findAssetByStatus(String status) {
		// TODO Auto-generated method stub
		return assetRepo.findByStatus(status);
	}

	public List<Asset> findAssetByEmployeeId(int employee_id) {
		return assetRepo.findByEmployeeId(employee_id);
	}

	public ResponseEntity<Object> updateById(Asset asset, int id) {

		Optional<Asset> assetoptional = assetRepo.findById(id);
		Asset assetdetails = assetoptional.get();
		Integer allocatingEmp = asset.getEmployee().getEmployeeID();
		if(empRepo.existsById(allocatingEmp)) {
			assetdetails.setEmployee(asset.getEmployee());
			assetdetails.setStatus("Allocated");
			asset.setTimestamp(LocalDateTime.now ());
			
			this.assetRepo.save(assetdetails);

			return ResponseEntity.status(HttpStatus.OK).body("Asset Allocated");			
		}
		else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employee with id " + allocatingEmp + " does not exist.");
		}

	}

	public ResponseEntity<Object> deallocateByAssetId(int id) {
		// TODO Auto-generated method stub
		Optional<Asset> assetoptional = assetRepo.findById(id);
		Asset assetdetails = assetoptional.get();
		
		if(assetdetails.getStatus().equalsIgnoreCase("Allocated")) {
			assetdetails.setEmployee(null);
			assetdetails.setStatus("Not Allocated");
			assetdetails.setTimestamp(LocalDateTime.now ());
			this.assetRepo.save(assetdetails);
			return ResponseEntity.status(HttpStatus.OK).body("Deallocated");		
		}
		else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Asset is already Deallocated");
		}
		
	}

}
