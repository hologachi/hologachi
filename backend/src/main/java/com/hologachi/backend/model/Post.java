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

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="TBL_POST")
public class Post {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="post_id")
	private int postId;
	
	@ManyToOne
	@JoinColumn(name="sgster_id")
	private User user;
	private Date rgst_at;
	private Date update_at;
	private String title;
	private String content;
	private int matching;
	private Date deadline;
	private int deleted_by;
	
	@ManyToOne
	@JoinColumn(name="CATEGORY2_ID")
	private Category2 category2;
	private String step;
	private int price;
	private String url;
	
}
