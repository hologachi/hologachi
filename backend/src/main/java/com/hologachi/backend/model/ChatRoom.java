package com.hologachi.backend.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Getter
@Table(name="TBL_CHATROOM")
public class ChatRoom {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="CHATROOM_ID")
	private int chatroomId;
	
	@Column(name="ROOM_NAME")
	private String roomName;

	@Column(name="ROOM_IMAGE")
	private String roomImage;

	@Column(name="CREATE_AT")
	private Date createAt;
	
	@Column(name="UPDATE_AT")
	private Date updateAt;
	
	@Column(name="POST_ID")
	private int postId;
	
	@ManyToMany
	@JoinTable(name = "TBL_CHAT_PTCPTS",
			joinColumns = @JoinColumn(name = "CHATROOM_ID"),
			inverseJoinColumns = @JoinColumn(name = "USER_ID"))
    private List<User> users = new ArrayList<User>();

}
