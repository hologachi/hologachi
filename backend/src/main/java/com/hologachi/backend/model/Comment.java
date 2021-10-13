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
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="TBL_COMMENT")
public class Comment {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="COMMENT_ID")
	private int commentId;
	
	@ManyToOne
	@JoinColumn(name="WRITER_ID")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="POST_ID")
	private Post post;
	
	private String content;
	private Date rgst_at;
	private Date update_at;
	private int status;
	private int only_sgster;
	
}
