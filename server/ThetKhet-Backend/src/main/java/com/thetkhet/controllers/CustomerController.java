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
import com.thetkhet.repos.CustomerRepository;
import com.thetkhet.util.JwtUtil;

import io.jsonwebtoken.Claims;

@CrossOrigin("*")
@RequestMapping("/api/customer/")
@RestController
public class CustomerController {
	  @Autowired
	    private CustomerRepository repo;

	    @Autowired
	    private JwtUtil jwtUtil;

	    @Autowired
	    private BCryptPasswordEncoder passwordEncoder;

	    @GetMapping("/allCustomers/")
	    public List<Customer> getProduct() {
	        return repo.findAll();
	    }

	    @PostMapping("/reg-cust")
	    public ResponseEntity<Map<String, Object>> addFarmer(@RequestBody Customer customer) {
	        Map<String, Object> response = new HashMap<>();
	        try {
	      
	        	 Customer existingCustomer = repo.findByEmail(customer.getEmail());
	        	 
	        	 
	        	 Customer existingCustomerUsername=repo.findByUsername(customer.getUsername());
	             if (existingCustomer != null || existingCustomerUsername!=null) {
	                 response.put("error", "Email or Username already in use.");
	                 return ResponseEntity.status(HttpStatus.CONFLICT).body(response); 
	             }

	           
	             customer.setPassword(passwordEncoder.encode(customer.getPassword()));
	            repo.save(customer);

	            String token = jwtUtil.generateToken(customer.getUsername(),customer.getEmail(),customer.getId());

	            // Prepare the response
	            response.put("username", customer.getUsername());
	            response.put("email", customer.getEmail());
	            response.put("id", customer.getId());
	            response.put("token", token);
	        } catch (Exception e) {
	            e.printStackTrace();
	            response.put("error", e.getMessage());
	        }
	        return ResponseEntity.status(HttpStatus.CREATED).body(response);
	    }



	    @PostMapping("/login")
	    public ResponseEntity<Map<String, String>> login(@RequestBody Customer customer) {
	        Map<String, String> response = new HashMap<>();
	        try {
	            Customer dbCustomer = repo.findByEmail(customer.getEmail());
	            if (dbCustomer != null && passwordEncoder.matches(customer.getPassword(), dbCustomer.getPassword())) {
	                String token = jwtUtil.generateToken(dbCustomer.getUsername(), dbCustomer.getEmail(), dbCustomer.getId());
	                response.put("token", token);
	                response.put("message", "Login Successful");
	                return ResponseEntity.ok(response); 
	            } else {
	                response.put("message", "Invalid Credentials");
	                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // Status 401 Unauthorized
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	            response.put("message", e.getMessage());
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // Status 500 Internal Server Error
	        }
	    }

//
//	    @PatchMapping("/farmer/updateUsername")
//	    public String updateUsername(@RequestHeader("Authorization") String token, @RequestBody Farmer farmer) {
//	        return updateFarmerDetails(token, farmer);
//	    }
//
//	    @PatchMapping("/farmer/updatePassword")
//	    public String updatePassword(@RequestHeader("Authorization") String token, @RequestBody Farmer farmer) {
//	        farmer.setPassword(passwordEncoder.encode(farmer.getPassword())); 
//	        return updateFarmerDetails(token, farmer);
//	    }
//
//	    private String updateFarmerDetails(String token, Farmer farmer) {
//	        String res;
//	        try {
//	            String username = jwtUtil.extractUsername(token.substring(7));
//	            if (jwtUtil.validateToken(token.substring(7), username)) {
//	                repo.save(farmer);
//	                res = "Success";
//	            } else {
//	                res = "Invalid token";
//	            }
//	        } catch (Exception e) {
//	            e.printStackTrace();
//	            res = e.getMessage();
//	        }
//	        return res;
//	    }
//	    
	    @GetMapping("/validateToken/")
	    public ResponseEntity<Map<String, Object>> verifyToken(@RequestParam("token") String token) {
	        Map<String, Object> response = new HashMap<>();
	        HttpStatus status;

	        try {
	            boolean isValid = jwtUtil.validateToken(token, jwtUtil.extractUsername(token));
	            response.put("isValid", isValid);
	            response.put("username", jwtUtil.extractUsername(token));
	            Claims claims = jwtUtil.extractAllClaims(token);
	            System.out.println("Extracted Claims: " + claims);
	            response.put("id", claims.get("id", Long.class));

	            response.put("email", claims.get("email", String.class)); 

	            status = HttpStatus.OK;
	        } catch (Exception e) {
	            response.put("error", "Invalid token");
	            status = HttpStatus.UNAUTHORIZED; 
	        }

	        return new ResponseEntity<>(response, status);
	    }
}
