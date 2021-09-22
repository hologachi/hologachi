package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="TBL_PTCPT")
public class Ptcpt {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="PTCPT_ID")
	private int ptcptId;
	
	@ManyToOne
	@JoinColumn(name="POST_ID")
	private Post post;
	
	@ManyToOne
	@JoinColumn(name="RQSTER_ID", nullable=true)
	private User user;
	
	@Column(name="STEP")
	private String step;
	
	@Column(name="RATE_DEAL", nullable=true)
	private int rateDeal;
	
}
