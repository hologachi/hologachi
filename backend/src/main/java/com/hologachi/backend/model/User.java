package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="TBL_USER")
public class User {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="USER_ID")
	private int userId;
	
	@Column(name="NICKNAME")
	private String nickname;
	
	@Column(name="EMAIL")
	private String email;
	
	@Column(name="IMAGE")
	private String image;
	
	@Column(name="SGST_RATE")
	private String sgstRate;
	
	@Column(name="RQST_RATE")
	private String rqstRate;
	
	@Column(name="IS_ADMIN")
	private int isAdmin;
	
	@Column(name="GOOGLE_ID")
	private String googleId;
	
	@Column(name="TOKEN_ID")
	private String tokenId;
	
}
