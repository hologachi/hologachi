import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import '../../css/mywriting.css'
import '../../css/myprofile.css'
import '../../css/applygb.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from "axios";
  
export default function ReqUserProfile() {
  const { postId, ptcptId } = useParams();
  const [testStr, setTestStr] = useState('');

  function callback(str) {
    setTestStr(str);
  }

  useEffect(
    () => {
      axios({
        url: `/mypage/mypost/${postId}/${ptcptId}`,
        method: 'GET',
        params: {
          userId: window.sessionStorage.getItem('userId')
        },
      }).then((res) => {
        callback(res.data);
      })
    }, []
  );

  const profiles = Object.values(testStr).map(profile => {
    return (
      <div>
        <h1>{profile.nickname}의 프로필</h1>
        <div className="row">
        <div className="img-wrap" >
          <img className="proImg" src={profile.image} alt="" />
        </div><br />
        <div className="info">
          <div className="grade">평점 <span className="dealRate">{profile.dealRate}</span></div>
          <div className="deal">거래수 <span className="dealRate">{profile.dealCount}번</span></div>
        </div>
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