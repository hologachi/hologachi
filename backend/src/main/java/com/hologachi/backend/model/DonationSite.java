package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="TBL_DONATION_SITE")
public class DonationSite {
	
		@Id @GeneratedValue
		@Column(name="D_SITE_ID")
		private int dSiteId;
		
		@JoinColumn(name="NAME")
		private String name;
		
		@JoinColumn(name="SITE")
		private String site;
		
		@JoinColumn(name="DESCRIPTION")
		private String description;
		
		@JoinColumn(name="LOGO")
		private String logo;
		
	}
