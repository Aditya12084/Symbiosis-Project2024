package com.thetkhet.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="products_tbl")
public class Products {

	@Column
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Long id;
	
	@Column
	private String title;
	
	@Column
	private float farmerRatings;
	
	@Column
	private float price;
	
	@Column
	private String unit;
	
	@Column
	private String img;
	
	@Column
	private String category;
	
	@Column
	private String farmerId;
	
	
	public String getFarmerId() {
		return farmerId;
	}

	public void setFarmerId(String farmerId) {
		this.farmerId = farmerId;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getFarmerInfo() {
		return farmerInfo;
	}

	public void setFarmerInfo(String farmerInfo) {
		this.farmerInfo = farmerInfo;
	}

	@Column
	private String location;
	
	@Column
	private String farmerInfo;

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public float getFarmerRatings() {
		return farmerRatings;
	}

	public void setFarmerRatings(float farmerRatings) {
		this.farmerRatings = farmerRatings;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	
}