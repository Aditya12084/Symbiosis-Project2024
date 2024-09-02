package com.thetkhet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thetkhet.entities.Customer;

@Repository
public interface CustomerRepository extends JpaRepository <Customer,Long> {
    Customer findByUsername(String username);
    Customer findByEmail(String email); 
}
