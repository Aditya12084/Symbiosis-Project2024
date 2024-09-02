package com.thetkhet.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thetkhet.entities.CustCart;
import com.thetkhet.entities.Customer;


@Repository
public interface CustCartRepo extends JpaRepository <CustCart,Long> {
	List<CustCart> findByCustomerId(Long customerid);
}
