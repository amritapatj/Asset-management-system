package com.poc.asset.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poc.asset.model.Category;
import com.poc.asset.service.CategoryService;

@RestController
@RequestMapping(path="/category")
public class CategoryController {

	
	@Autowired
	CategoryService categoryService;
	
	@GetMapping(path="/list",produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Category> list()
	{
		return categoryService.display();
	}
	
	@PostMapping(path="/save",consumes = MediaType.APPLICATION_JSON_VALUE)
	public Category save(@RequestBody Category category)
	{
		return categoryService.save(category);
	}
	
	@GetMapping(path="/find/id/{id}")
	public Category findCategoryById(@PathVariable int id)
	{
		return categoryService.findById(id);
	}
	
	
}
