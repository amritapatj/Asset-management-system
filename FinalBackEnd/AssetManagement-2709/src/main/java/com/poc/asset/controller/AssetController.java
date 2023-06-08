package com.poc.asset.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.poc.asset.service.AssetService;

@RestController
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AssetController {

	@Autowired
	AssetService assetService;
	
	@PreAuthorize("hasRole('ROLE_ADMIN')") ///// ADMIN ACCESS ONLY
	@GetMapping(path = "/admin/asset/list", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Asset> list() {
		return assetService.display();

	}

	@PostMapping(path = "/admin/asset/addAsset", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> addAsset(@RequestBody Asset asset) {
		return assetService.addNewAsset(asset);

	}

	@GetMapping(path = "/admin/asset/find/assetId/{id}")
	public Asset findByAssetId(@PathVariable int id) {
		return assetService.findByAssetId(id);
	}

	@GetMapping(path = "/admin/asset/find/categoryId/{id}")
	public List<Asset> findByCategoryId(@PathVariable int id) {
		return assetService.findAssetByCategoryId(id);
	}

	@GetMapping(path = "/admin/asset/find/status/{status}")
	public List<Asset> findByStatus(@PathVariable String status) {
		return assetService.findAssetByStatus(status);
	}

	@DeleteMapping(path = "/admin/asset/delete/assetId/{id}")
	public ResponseEntity<Object> deleteByID(@PathVariable int id)

	{
		return assetService.deleteByAssetId(id);

	}
	
	@PutMapping(path = "/admin/asset/deallocate/assetId/{id}")
	public ResponseEntity<Object> deallocatebyID(@PathVariable int id) {
		return assetService.deallocateByAssetId(id);
	}

	@PutMapping(path = "/admin/asset/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> updateAssetById(@RequestBody Asset asset, @PathVariable int id) {

		return assetService.updateById(asset, id);
	}

	// LATEST
	@GetMapping(path = "/admin/asset/toUpdate/{id}")
	public Asset findByAssetToBeUpdatedId(@PathVariable int id) {
		return assetService.findByAssetId(id);
	}

	@GetMapping(path = "/user/find/employeeId/{id}")
	public List<Asset> findAssetByEmployeeId(@PathVariable int id) {
		return assetService.findAssetByEmployeeId(id);
	}

}
