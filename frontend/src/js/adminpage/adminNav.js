import React from 'react';
import '../../css/adminpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function adminNav() {
    return (
        <nav id="sidebar">
        <div class="sidebar-header">
          <h3>관리자 페이지</h3>
        </div>

        <ul class="list-unstyled components">
            <li>
                <a href="/admin/mUser">회원관리</a>
            </li>
            <li>
              <a href="/admin/mGBPost">공동구매 글 관리</a>
            </li>
            <li>
              <a href="/admin/mGB">공동구매 관리</a>
            </li>
            <li>
                <a href="/admin/mGBCategory">카테고리 관리</a>
            </li>
        </ul>
      </nav>
    )
}
export default adminNav