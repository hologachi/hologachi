import React from 'react';
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

function adminNav() {
    return (
        
        <Navbar className="adminNav">
            <Nav.Link href="/mUser">회원관리</Nav.Link>
            <Nav.Link href="/mGBPost">공동구매 글 관리</Nav.Link>
            <Nav.Link href="/mGB">공동구매 관리</Nav.Link>
            <Nav.Link href="/mGBCategory">카테고리 관리</Nav.Link>
        </Navbar>
    )
}
export default adminNav