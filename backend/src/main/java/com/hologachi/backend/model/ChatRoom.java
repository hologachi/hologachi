package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

//import lombok.AccessLevel;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;

//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@Getter
//@Setter
@Entity
@Table(name="TBL_CHATROOM")
public class ChatRoom {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="CHATROOM_ID")
	private int chatroom_id;
	
	@Column(name="LASTCHAT")
	private String lastchat;
	
	@Column(name="ROOM_NAME")
	private String room_name;

	
	ChatRoom() {
		
	}
	
	public int getChatroom_id() {
		return chatroom_id;
	}

	public void setChatroom_id(int chatroom_id) {
		this.chatroom_id = chatroom_id;
	}

	public String getLastchat() {
		return lastchat;
	}

	public void setLastchat(String lastchat) {
		this.lastchat = lastchat;
	}

	public String getRoom_name() {
		return room_name;
	}

	public void setRoom_name(String room_name) {
		this.room_name = room_name;
	}
	

	
	
	

}
