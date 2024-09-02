package com.thetkhet.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

import com.thetkhet.entities.CustCart;
import com.thetkhet.entities.Customer;
import com.thetkhet.entities.Farmer;
import com.thetkhet.entities.Products;
import com.thetkhet.repos.CustCartRepo;
import com.thetkhet.repos.CustomerRepository;
import com.thetkhet.repos.ProductsRepo;
import com.thetkhet.util.JwtUtil;

import io.jsonwebtoken.Claims;

@CrossOrigin("*")
@RequestMapping("/api/cart/")
@RestController
public class CustCartController {
	    @Autowired
	    private CustCartRepo repo;

	    @Autowired
	    private JwtUtil jwtUtil;

		private CustCart custcart;
	    
	    @PostMapping("/add-product")
	    public ResponseEntity<Map<String, Object>> addProdToCartDb(@RequestBody CustCart custcart, @RequestParam("token") String token) {
	        
	        Map<String, Object> response = new HashMap<>();
	        HttpStatus status;

	        try {
	            boolean isValid = jwtUtil.validateToken(token, jwtUtil.extractUsername(token));
	            
	            if(isValid!=true) {
	            	response.put("error", "Invalid token");
		            status = HttpStatus.UNAUTHORIZED;
	            	return new ResponseEntity<>(response, status);
	            }
	            else {
	            	repo.save(custcart);
		            response.put("message", "Product added to cart successfully!!!");
		            status = HttpStatus.CREATED;
	            }
	            
	        } catch (Exception e) {
	            response.put("error", "Invalid token");
	            status = HttpStatus.UNAUTHORIZED;
	        }

	        return new ResponseEntity<>(response, status);
	    }
	    
	    @GetMapping("/my-cart-prods")
	    public ResponseEntity<Map<String, Object>> getCustProducts(@RequestParam("token") String token) {

	        Map<String, Object> response = new HashMap<>();
	        HttpStatus status;

	        try {
	 
	            boolean isValid = jwtUtil.validateToken(token, jwtUtil.extractUsername(token));

	            if (!isValid) {
	                response.put("error", "Invalid token");
	                status = HttpStatus.UNAUTHORIZED;
	                return new ResponseEntity<>(response, status);
	            } else {
	         
	                Claims claims = jwtUtil.extractAllClaims(token);
	                Long customerId = claims.get("id", Long.class); 
	                 System.out.println(customerId);

	                if (customerId == null) {
	                    response.put("error", "Customer ID not found in token");
	                    status = HttpStatus.BAD_REQUEST;
	                    return new ResponseEntity<>(response, status);
	                }

	                
	                @SuppressWarnings("unchecked")
					List<CustCart> cartProducts = repo.findByCustomerId(customerId);

	                if (cartProducts.isEmpty()) {
	                    response.put("message", "No products found in cart");
	                    status = HttpStatus.OK;
	                } else {
	                    response.put("cartProducts", cartProducts);
	                    status = HttpStatus.OK;
	                }
	            }

	        } catch (Exception e) {
	            response.put("error", "Invalid token");
	            status = HttpStatus.UNAUTHORIZED; 
	        }

	        return new ResponseEntity<>(response, status);
	    }

	@PostMapping("/remove-from-cart")
	public ResponseEntity<Map<String, Object>> removeFromCart(@RequestBody CustCart custcart, @RequestParam("token") String token) {

		Map<String, Object> response = new HashMap<>();
		HttpStatus status;

		try {
			String username = jwtUtil.extractUsername(token);
			boolean isValid = jwtUtil.validateToken(token, username);
			if (!isValid) {
				response.put("error", "Invalid token");
				status = HttpStatus.UNAUTHORIZED;
				return new ResponseEntity<>(response, status);
			}


			Long customerIdFromToken = jwtUtil.extractId(token); // Add this method in your jwtUtil if it does not exist

			Long prodId = custcart.getId();
			Optional<CustCart> cartItemOptional = repo.findById(prodId);
			if (!cartItemOptional.isPresent()) {
				response.put("error", "Product not found in cart");
				status = HttpStatus.NOT_FOUND;
				return new ResponseEntity<>(response, status);
			}

			CustCart cartItem = cartItemOptional.get();

			if (!cartItem.getCustomerId().equals(customerIdFromToken)) {
				response.put("error", "You do not have permission to remove this item");
				status = HttpStatus.FORBIDDEN;
				return new ResponseEntity<>(response, status);
			}
			repo.deleteById(prodId);
			response.put("message", "Item removed from cart successfully");
			status = HttpStatus.OK;

		} catch (Exception e) {
			response.put("error", "An error occurred while processing the request");
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<>(response, status);
	}

}
