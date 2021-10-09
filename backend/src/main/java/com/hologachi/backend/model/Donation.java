package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name="TBL_DONATION")
public class Donation {
	
	@Id
	@Column(name="DONATION_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int donationId;
	
	@Column(name="NAME")
	private String name;
	
	@Column(name="PHONE")
	private String phone;
	
	@Column(name="PRODUCT")
	private String product;
	
	@Column(name="RECEIPT")
	private boolean receipt;
	
	@ManyToOne
    @JoinColumn(name="USER_ID")
	private User user;
	
}
