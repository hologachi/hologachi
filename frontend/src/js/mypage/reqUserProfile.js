import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import '../../css/mywriting.css'
import '../../css/applygb.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from "axios";
  
  export default function ReqUserProfile() {
    const { postId, ptcptId } = useParams();

    const [ testStr, setTestStr ] = useState('');
    // console.log(testStr);
    
    function callback(str) {
      setTestStr(str);
    }
    useEffect(
        () => {
          axios({
              url: `/mypage/mypost/${postId}/${ptcptId}`,
              method: 'GET'
          }).then((res) => {
              callback(res.data);
          })
        }, []
    );
  
    return (
        <div className="card">
          <h1>{testStr.user.nickname}의 프로필</h1>
          <div className="img-wrap" >
          <img className="pr" src="https://i.postimg.cc/7LT6kXtR/user.png" alt="" />
        </div><br />
        <div className="grade"><span>제시자로서 평점 : </span>{testStr.user.sgst_rate}</div>
        <div className="name"><span>신청자로서 평점 : </span>{testStr.user.rqst_rate}</div>
        </div>
      );
  }
