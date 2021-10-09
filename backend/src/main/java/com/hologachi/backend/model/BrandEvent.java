package com.hologachi.backend.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="TBL_BRANDEVENT")
public class BrandEvent {
	
		@Id @GeneratedValue
		@Column(name="B_E_ID")
		private int bEID;
		
		@Column(name="TITLE")
		private String title;
		
		@Column(name="BRANDNAME")
		private String brandName;
		
		@Column(name="DESCRIPTION")
		private String description;
		
		@Column(name="IMG")
		private String img;
		
		@Column(name="SITE")
		private String site;
		
		@JsonFormat(pattern="yyyy-MM-dd")
		@Column(name="START_EVENT")
		private Date startEvent;
		
		@JsonFormat(pattern="yyyy-MM-dd")
		@Column(name="END_EVENT")
		private Date endEvent;
		
	}
