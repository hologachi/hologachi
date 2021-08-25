package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@Entity
@Table(name="TBL_PTCPT")
public class Ptcpt {
	
	@Id @GeneratedValue
	@Column(name="ptcpt_id")
	private int ptcptId;
	
	@ManyToOne
	@JoinColumn(name="post_id")
	private Post post;
	
	@ManyToOne
	@JoinColumn(name="rqster_id")
	private User user;
	
	@Column(name="STEP")
	private String step;
	@Column(name="RATE_SGSTER", nullable=true)
	private Double rateSgster;
	@Column(name="RATE_RQSTER", nullable=true)
	private Double rateRqster;
	
}
