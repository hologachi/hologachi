package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

//import lombok.AccessLevel;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;

//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@Getter
//@Setter
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
	
	User() {
		
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public int getAccesstoken() {
		return accesstoken;
	}

	public void setAccesstoken(int accesstoken) {
		this.accesstoken = accesstoken;
	}

	public String getExpire() {
		return expire;
	}

	public void setExpire(String expire) {
		this.expire = expire;
	}

	public String getTokentype() {
		return tokentype;
	}

	public void setTokentype(String tokentype) {
		this.tokentype = tokentype;
	}

	public String getId_token() {
		return id_token;
	}

	public void setId_token(String id_token) {
		this.id_token = id_token;
	}

	public String getSgst_rate() {
		return sgst_rate;
	}

	public void setSgst_rate(String sgst_rate) {
		this.sgst_rate = sgst_rate;
	}

	public String getRqst_rate() {
		return rqst_rate;
	}

	public void setRqst_rate(String rqst_rate) {
		this.rqst_rate = rqst_rate;
	}

	public int getIs_admin() {
		return is_admin;
	}

	public void setIs_admin(int is_admin) {
		this.is_admin = is_admin;
	}
	
	
}
