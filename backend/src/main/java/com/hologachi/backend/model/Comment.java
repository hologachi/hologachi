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
	@Column(name="comment_id")
	private int commentId;
	
	@ManyToOne
	@JoinColumn(name="writer_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="post_id")
	private Post post;
	
	private String content;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date rgst_at;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date update_at;
	@Setter
	private int status;
	private int only_sgster;
	
}
