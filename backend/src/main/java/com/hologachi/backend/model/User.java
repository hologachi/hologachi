package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="TBL_USER")
public class User {
	
	@Id @GeneratedValue
	@Column(name="user_id")
	private int userId;
	private String nickname;
	private String email;
	private String image;
	private String deal_rate;
	private int deal_count;
	private int is_admin;
	private String google_id;
	private String token_id;
	private String location;
}
