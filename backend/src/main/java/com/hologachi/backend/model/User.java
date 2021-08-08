package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="TBL_USER")
public class User {
	
	@Id @GeneratedValue
	@Column(name="user_id")
	private int userId;
	private String nickname;
	private String email;
	private String image;
	private int accesstoken;
	private String expire;
	private String tokentype;
	private String id_token;
	private String sgst_rate;
	private String rqst_rate;
	private int is_admin;
}
