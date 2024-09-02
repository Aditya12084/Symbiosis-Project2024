package com.thetkhet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thetkhet.entities.Products;

@Repository
public interface ProductsRepo extends JpaRepository <Products,Long> {
    
}
