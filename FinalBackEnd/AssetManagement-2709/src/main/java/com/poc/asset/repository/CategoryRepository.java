package com.poc.asset.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poc.asset.model.Category;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{

	
	
}
