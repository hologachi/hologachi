package com.hologachi.backend.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.Setter;

@Data
@Entity
@Table(name="TBL_POST")
public class Post {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
 	@Column(name="POST_ID")
	private int postId;
	
	@ManyToOne
	@JoinColumn(name="SGSTER_ID")
	private User user;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name="RGST_AT")
	private Date rgstAt;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name="UPDATE_AT")
	private Date updateAt;
	
	private String title;
	private String content;
	private int matching;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date deadline;
	
	@Setter
	@Column(name="DELETED_BY")
	private int deletedBy;
	
	@ManyToOne
	@JoinColumn(name="CATEGORY2_ID")
	private Category2 category2;
	
	private String step;
	private int price;
	private String url;
	private String image;
	private String location;
	
}
