package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="TBL_CHATROOM")
public class ChatRoom {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="CHATROOM_ID")
	private int chatroomId;
	
	@Column(name="LASTCHAT")
	private String lastchat;
	
	@Column(name="ROOM_NAME")
	private String roomName;

	

}
