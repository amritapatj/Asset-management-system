package com.poc.asset.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.poc.asset.model.Asset;
import com.poc.asset.model.Category;

@Repository
public interface AssetRepository extends JpaRepository<Asset,Integer>{


	@Query(value = "SELECT * FROM asset WHERE category_id=?1", nativeQuery = true)
	List<Asset> findByCategoryId(int category_id);

	@Query(value = "SELECT * FROM asset WHERE status=?1", nativeQuery = true)
	List<Asset> findByStatus(String status);
	
	@Query(value = "SELECT * FROM asset WHERE employee_id=?1" , nativeQuery = true)
	List<Asset> findByEmployeeId(int employee_id);
	
	//@Query(value = "UPDATE asset SET employee_id=?1")
	
	@Query(value = "SELECT COUNT(*) FROM asset WHERE status='Allocated'", nativeQuery = true)
	int countAlloctaedAssets();
	
	@Query(value = "SELECT COUNT(*) FROM asset WHERE status='Not Allocated'", nativeQuery = true)
	int countNotAlloctaedAssets();
	
	

	

}
