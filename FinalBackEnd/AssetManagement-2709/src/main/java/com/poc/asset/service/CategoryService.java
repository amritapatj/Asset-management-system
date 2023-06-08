package com.poc.asset.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poc.asset.model.Category;
import com.poc.asset.repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepo;
	public List<Category> display() {
		// TODO Auto-generated method stub
		return categoryRepo.findAll();
	}
	public Category save(Category category) {
		// TODO Auto-generated method stub
		return categoryRepo.save(category);
	}
	public Category findById(int id) {
		// TODO Auto-generated method stub
		return categoryRepo.findById(id).get();
	}
	

}
