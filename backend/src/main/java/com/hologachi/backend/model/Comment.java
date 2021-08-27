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
import lombok.Setter;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="TBL_COMMENT")
public class Comment {

	@Id @GeneratedValue
	@Column(name="COMMENT_ID")
	private int commentId;
	
	@ManyToOne
	@JoinColumn(name="WRITER_ID")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="POST_ID")
	private Post post;
	
	private String content;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name="RGST_AT")
	private Date rgstAt;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name="UPDATE_AT")
	private Date updateAt;
	
	@Setter
	private int status;
	
	@Column(name="ONLY_SGSTER")
	private int onlySgster;
	
}
