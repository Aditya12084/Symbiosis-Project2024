package com.thetkhet.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.thetkhet.entities.Farmer;
import com.thetkhet.repos.FarmerRepository;
import com.thetkhet.util.JwtUtil;

import io.jsonwebtoken.Claims;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@CrossOrigin("*")
@RequestMapping("/api/farmer/")
@RestController
public class FarmerController {

    @Autowired
    private FarmerRepository repo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/allProducts/")
    public List<Farmer> getProduct() {
        return repo.findAll();
    }

    @PostMapping("/regFarmer")
    public Map<String, String> addFarmer(@RequestBody Farmer farmer) {
        Map<String, String> response = new HashMap<>();
        try {
           
        	 Farmer existingFarmer = repo.findByEmail(farmer.getEmail());
        	 Farmer existingFarmerUsername=repo.findByUsername(farmer.getUsername());
             if (existingFarmer != null || existingFarmerUsername!=null) {
                 response.put("error", "Email or Username already in use.");
                 return response;
             }

            farmer.setPassword(passwordEncoder.encode(farmer.getPassword()));
            repo.save(farmer);

         
            String token = jwtUtil.generateToken(farmer.getUsername(),farmer.getEmail(),farmer.getId());
            response.put("username", farmer.getUsername());
            response.put("email", farmer.getEmail());
            response.put("token", token);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", e.getMessage());
        }
        return response;
    }



    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Farmer farmer) {
        Map<String, String> response = new HashMap<>();
        try {
            Farmer dbFarmer = repo.findByEmail(farmer.getEmail());
            if (dbFarmer != null && passwordEncoder.matches(farmer.getPassword(), dbFarmer.getPassword())) {
                String token = jwtUtil.generateToken(dbFarmer.getUsername(),dbFarmer.getEmail(),dbFarmer.getId());
                response.put("token", token);
                response.put("message", "Login Successful");
            } else {
                response.put("message", "Invalid Credentials");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", e.getMessage());
        }
        return response;
    }

    @PatchMapping("/farmer/updateUsername")
    public String updateUsername(@RequestHeader("Authorization") String token, @RequestBody Farmer farmer) {
        return updateFarmerDetails(token, farmer);
    }

    @PatchMapping("/farmer/updatePassword")
    public String updatePassword(@RequestHeader("Authorization") String token, @RequestBody Farmer farmer) {
        farmer.setPassword(passwordEncoder.encode(farmer.getPassword())); 
        return updateFarmerDetails(token, farmer);
    }

    private String updateFarmerDetails(String token, Farmer farmer) {
        String res;
        try {
            String username = jwtUtil.extractUsername(token.substring(7));
            if (jwtUtil.validateToken(token.substring(7), username)) {
                repo.save(farmer);
                res = "Success";
            } else {
                res = "Invalid token";
            }
        } catch (Exception e) {
            e.printStackTrace();
            res = e.getMessage();
        }
        return res;
    }
    
    @GetMapping("/verifyToken/")
    public Map<String, Object> verifyToken(@RequestParam("token") String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            boolean isValid = jwtUtil.validateToken(token, jwtUtil.extractUsername(token));
            response.put("isValid", isValid);
            response.put("username", jwtUtil.extractUsername(token));

      
            Claims claims = jwtUtil.extractAllClaims(token);
            System.out.println("Extracted Claims: " + claims);
            
            response.put("email", claims.get("email", String.class)); 
        } catch (Exception e) {
            response.put("error", "Invalid token");
        }
        return response;
    }
}
