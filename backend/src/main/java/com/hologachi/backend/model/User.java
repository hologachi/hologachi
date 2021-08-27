package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
// =======
// import lombok.AccessLevel;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @NoArgsConstructor(access = AccessLevel.PROTECTED)
// @Getter
// @Setter
// >>>>>>> main
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
	
	@Column(name="ACCESSTOKEN")
	private int accesstoken;
	
	@Column(name="EXPIRE")
	private String expire;
	
	@Column(name="TOKENTYPE")
	private String tokentype;
	
	@Column(name="ID_TOKEN")
	private String id_token;
	
	@Column(name="SGST_RATE")
	private String sgst_rate;
	
	@Column(name="RQST_RATE")
	private String rqst_rate;
	
	@Column(name="IS_ADMIN")
	private int is_admin;
	
}
