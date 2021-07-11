import React from 'react';
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

function adminNav() {
    return (
        
        <Navbar className="adminNav">
            <Nav.Link href="#managerUser">회원관리</Nav.Link>
            <Nav.Link href="#manageGBPost">공동구매 글 관리</Nav.Link>
            <Nav.Link href="#manageGB">공동구매 관리</Nav.Link>
            <Nav.Link href="#manageCategory">카테고리 관리</Nav.Link>
        </Navbar>
    )
}
export default adminNav