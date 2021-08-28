package com.hologachi.backend.model;

import java.util.Date;

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
@Table(name="TBL_POST")
public class HomePost {
	
	@Id @GeneratedValue
	@Column(name="POST_ID")
	private int postId;
	
	private Date rgstAt;
	private Date updateAt;
	private String title;
	private String content;
	private int matching;
	private Date deadline;
	private int deletedBy;
	private String step;
	private int price;
	private String url;
	
}
