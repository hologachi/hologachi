package com.hologachi.backend.model;

import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="TBL_POST")
public class HomePost {
	
	@Id @GeneratedValue
	@Column(name="POST_ID")
	private int postId;

	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name="RGST_AT")
	private Date rgstAt;

	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name="UPDATE_AT")
	private Date updateAt;

	private String title;
	private String content;
	private int matching;
	private Date deadline;

	@Setter
	@Column(name="DELETED_BY")
	private int deletedBy;

	private String step;
	private int price;
	private String url;
	private String image;
	
}
