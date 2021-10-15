import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import '../../css/mywriting.css'
import '../../css/myprofile.css'
import '../../css/applygb.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from "axios";


export default function SgstProfile() {
  const { ptcptId } = useParams()
  const [testStr, setTestStr] = useState('');

  function callback(str) {
    setTestStr(str);
  }

  useEffect(
    () => {
      axios({
        url: `/mypage/myrequest/${ptcptId}`,
        method: 'GET',
      }).then((res) => {
        callback(res.data);
      })
    }, []
  );
  console.log(testStr.user.nickname);
    return (
      <div className="container py-4">
      <div className="profile__body">
      <div>
        <h1>{testStr.user.nickname}의 프로필</h1>
        <div className="row">
        <div className="img-wrap" >
          <img className="proImg" src={testStr.user.image} alt="" />
        </div><br />
        <div className="info">
          <div className="grade">평점 <span className="dealRate">{testStr.user.dealRate}</span></div>
          <div className="deal">거래수 <span className="dealRate">{testStr.user.dealCount}번</span></div>
        </div>
        </div> 
      </div>
      </div>
    </div>
    );
}