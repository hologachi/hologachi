package com.hologachi.backend.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="TBL_POST")
public class Post {
	
	@Id @GeneratedValue
	@Column(name="POST_ID")
	private int postId;
	
	@ManyToOne
	@JoinColumn(name="sgster_id")
	private User user;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date rgst_at;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date update_at;
	private String title;
	private String content;
	private int matching;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date deadline;
	private int deleted_by;
	
	@ManyToOne
	@JoinColumn(name="CATEGORY2_ID")
	private Category2 category2;
	private String step;
	private int price;
	private String url;

	
}
