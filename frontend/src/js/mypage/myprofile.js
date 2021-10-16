import React, { useState, useEffect } from 'react';
import '../../css/myprofile.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Button, Modal } from 'react-bootstrap';

function location(loc) {
  window.location.href = "/mypage/" + loc
}

function Myprofile() {
  const [testStr, setTestStr] = useState('');

  function callback(str) {
    setTestStr(str);
  }

  useEffect(
    () => {
      axios({
        url: '/mypage/mypage/profile',
        method: 'GET',
        params: {
          userId: window.sessionStorage.getItem('userId')
        },
      }).then((res) => {
        callback(res.data);
      })
    }, []
  );

  function modify(nickname){
    axios({
        url: `/mypage/privacy/modify`,
        method: 'post',
        params: {
          userId: window.sessionStorage.getItem('userId'),
          modifyNickname: nickname
        },
        headers: { "Access-Control-Allow-Origin": "*" },
      }).then(function () {
        alert("수정이 완료되었습니다.");
    window.location.reload();
      }).catch(error => {
        console.log(error.response)
      });
}

const nick = Object.values(testStr).map(profile => profile.nickname);
console.log(nick[0]);

  function NickModal() {
    const [show, setShow] = useState(false);
    const [nicknameStr, setNickname] = useState(nick);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeNick = (e) => {
      setNickname(e.target.value);
  }
  
    return (
      <>
        <Button className="menuItems" variant="primary" onClick={handleShow}>
          닉네임 수정
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>닉네임 수정하기</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           닉네임 <input onChange={onChangeNick} value={nicknameStr || ''}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={() => modify(nicknameStr)}>
              수정하기
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

const rate = Object.values(testStr).map(profile => profile.dealRate)
// const userImg = window.sessionStorage.getItem('image')
// console.log( window.sessionStorage);

  const profiles = Object.values(testStr).map(profile => {
    return (
      <div>
        <h1>{profile.nickname}의 프로필</h1>
        <div className="row">
        <div className="img-wrap" >
          <img className="proImg" src={window.sessionStorage.getItem('image')} alt="" />
        </div><br />
        <div className="info">
          <div className="grade">평점 <span className="dealRate">{profile.dealRate}</span></div>
          <div className="deal">거래수 <span className="dealRate">{profile.dealCount}번</span></div>
        </div>
        </div>
        
        <div className="menu">
            <Button className="menuItems" variant="secondary" onClick={() => { location('mywriting') }}>작성한 글</Button>
            <Button className="menuItems" variant="secondary" onClick={() => { location('applygb') }}>신청한 글</Button>
            <Button className="menuItems" variant="secondary" onClick={() => { location('commentwrite') }}>댓글 남긴 글</Button>
            <Button className="menuItems" variant="secondary" onClick={() => { location('bookmark') }}>북마크</Button>
            {/* <Button className="menuItems" variant="secondary" onClick={openModal}>닉네임 수정</Button> */}
            <NickModal/>
        </div>
      </div>
    );
  });

  return (
    <div className="container py-4">
      <div className="profile__body">
        {profiles}
      </div>
    </div>
  )
}

export default Myprofile
