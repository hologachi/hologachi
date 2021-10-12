import React, { useState, useEffect } from 'react';
import '../../css/myprofile.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ButtonGroup,Button } from 'react-bootstrap';

function location(loc) {
  window.location.href = "/mypage/" + loc
}

function Myprofile() {
  // 요청받은 정보를 담아줄 변수 선언
  const [testStr, setTestStr] = useState('');

  // 변수 초기화
  function callback(str) {
    setTestStr(str);
  }

  // 첫 번째 렌더링을 마친 후 실행
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
const rate = Object.values(testStr).map(profile => profile.dealRate)
const userImg = window.sessionStorage.getItem('image')

  const profiles = Object.values(testStr).map(profile => {
    return (
      <div>
        <h1>{profile.nickname}의 프로필</h1>
        <div className="row">
        <div className="img-wrap" >
          <img className="proImg" src={userImg} alt="" />
        </div><br />
        <div className="info">
          <div className="grade">평점 <span className="dealRate">{profile.dealRate}</span></div>
          <div className="deal">거래수 <span className="dealRate">{profile.dealCount}번</span></div>
        </div>
        </div>
        
        <div className="menu">
            <Button className="menuItems" variant="secondary" onClick={() => { location('mywriting') }}>내가 작성한 글</Button>
            <Button className="menuItems" variant="secondary" onClick={() => { location('applygb') }}>내가 신청한 글</Button>
            <Button className="menuItems" variant="secondary" onClick={() => { location('commentwrite') }}>내가 댓글 남긴 글</Button>
            <Button className="menuItems" variant="secondary" onClick={() => { location('bookmark') }}>북마크</Button>
            <Button className="menuItems" variant="secondary" onClick={() => { location('privacy') }}>개인정보 확인 및 수정</Button>
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
