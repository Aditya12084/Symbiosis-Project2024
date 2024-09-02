package com.thetkhet.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thetkhet.entities.Customer;
import com.thetkhet.entities.Farmer;
import com.thetkhet.entities.Products;
import com.thetkhet.repos.CustomerRepository;
import com.thetkhet.repos.ProductsRepo;
import com.thetkhet.util.JwtUtil;

import io.jsonwebtoken.Claims;

@CrossOrigin("*")
@RequestMapping("/api/products/")
@RestController
public class ProductsController {
	    @Autowired
	    private ProductsRepo repo;

	    @Autowired
	    private JwtUtil jwtUtil;

	    @Autowired
	    private BCryptPasswordEncoder passwordEncoder;

	    @GetMapping("/all-products")
	    public List<Products> getProduct() {
	        return repo.findAll();
	    }
	    
	    @PostMapping("/add-product")
	    public Map<String, String> addFarmer(@RequestBody Products product) {
	        Map<String, String> response = new HashMap<>();
  
	        try {
	                  
	            repo.save(product);

	            response.put("message", "Product added successfully!!!");
	      
	        } catch (Exception e) {
	            e.printStackTrace();
	            response.put("error", e.getMessage());
	        }
	        return response;
	    }


	    
}
