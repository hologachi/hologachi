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
	@Column(name="post_id")
	private int postId;
	private Date rgst_at;
	private Date update_at;
	private String title;
	private String content;
	private int matching;
	private Date deadline;
	private int deleted_by;
	private String step;
	private int price;
	private String url;
	
}
