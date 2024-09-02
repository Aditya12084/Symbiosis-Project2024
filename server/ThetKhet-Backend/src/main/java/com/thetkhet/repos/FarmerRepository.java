package com.thetkhet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thetkhet.entities.Farmer;



@Repository
public interface FarmerRepository extends JpaRepository <Farmer,Long> {
    Farmer findByUsername(String username);
    Farmer findByEmail(String email); 
}
