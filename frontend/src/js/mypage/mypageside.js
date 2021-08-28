import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function mypageside() {
    return (
        <div>
            <div id="menu">
              <a href="/mypage/bookmark" className="titleList">북마크</a><br />
              <a href="/mypage/mywriting" className="titleList">작성한 글</a><br />
              <a href="/mypage/applygb" className="titleList">신청한 글</a><br />
              <a href="/mypage/commentwrite" className="titleList">댓글</a><br />
              <a href="#" className="titleList">개인정보 수정</a><br />
            </div>
        </div>
    )
}

export default mypageside
