package com.hologachi.backend.model;

import javax.persistence.*;

import lombok.*;

//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@Getter
@Data
@Entity
@Table(name="TBL_BOOKMARK")
public class Bookmark {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="BOOKMARK_ID")
	private int bookmarkId;
	
	@ManyToOne
	@JoinColumn(name="USER_ID")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="POST_ID")
	private Post post;

}
