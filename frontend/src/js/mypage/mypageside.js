import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/mypageside.css'

function mypageside() {
    return (
        <div>
            <div id="menu">
                <ul id="tabMenu">
                    <li>
                        <span className="deco_dot">●</span>
                        <a href="/mypage/bookmark" className="titleList">북마크</a>
                    </li>
                    <li>
                        <span className="deco_dot">●</span>
                        <a href="/mypage/mywriting" className="titleList">작성한 글</a>
                    </li>
                    <li>
                        <span className="deco_dot">●</span>
                        <a href="/mypage/applygb" className="titleList">신청한 글</a>
                    </li>
                    <li>
                        <span className="deco_dot">●</span>
                        <a href="/mypage/commentwrite" className="titleList">댓글</a>
                    </li>
                    <li>
                        <span className="deco_dot">●</span>
                        <a href="#" className="titleList">개인정보 수정</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default mypageside
