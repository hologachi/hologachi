import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import '../../css/header.css';
import  Logout  from "../login/authGoogleLogout";
import axios from "axios";

export default function Header() {
    const [isLogined, setIsLogined] = useState(window.sessionStorage.getItem('nickname'))
    const [keyword, setKeyword] = useState('')

    useEffect(() => { // useEffect 적용!
        console.log(isLogined);
        }, [isLogined]);
    
        function gosearch(e){
            setKeyword(e.target.value)
        }
        function findKeyword(){
            axios({
                url: `/search`,
                method: 'post',
                params: {
                  keyword: keyword
                },
                baseURL: 'http://localhost:8080/post',
                headers: { "Access-Control-Allow-Origin": "*" },
              }).then(function () {
                console.log("find")
              }).catch(error => {
                console.log(error.response)
              });
        }

    return (
        <div>
            <Navbar className="navbar" bg="light" expand="lg">
                <Navbar.Brand href="/home">홀로가치</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/gb/gblist" className="menu">공동구매</Nav.Link>
                        {/* <NavDropdown title="카테고리" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">식품</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">가전제품</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">의류</NavDropdown.Item>
                        </NavDropdown> */}
                        { isLogined &&  <NavDropdown title="마이페이지" id="basic-nav-dropdown" className="menu">
                            <NavDropdown.Item href="/mypage/profile">나의 프로필</NavDropdown.Item>
                            <NavDropdown.Item href="/mypage/bookmark">북마크</NavDropdown.Item>
                            <NavDropdown.Item href="/mypage/mywriting">내가 작성한 글</NavDropdown.Item>
                            <NavDropdown.Item href="/mypage/applygb">내가 신청한 글</NavDropdown.Item>
                            <NavDropdown.Item href="/mypage/commentwrite">내가 댓글 남긴 글</NavDropdown.Item>
                            <NavDropdown.Item href="/mypage/privacy">개인정보 확인 및 수정</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.7">평점 등록</NavDropdown.Item>
                        </NavDropdown> }
                       
                        { isLogined && <Nav.Link href="/chat/list" className="menu">채팅</Nav.Link>}
                    </Nav>
                    <Button href="../gb/gbwrite" className="gbwritebtn">공동구매 글쓰기</Button>
                    
                    {/* 로그인 한 경우 */}
                    { isLogined && <p>{window.sessionStorage.getItem('nickname')} 님 안녕하세요</p> }
                    { isLogined && <Logout setIsLogined={setIsLogined}/>}
                    
                    {/* 로그인 안 한 경우 */}
                    { !isLogined && <Button href="/login" className="loginbtn">Login</Button> } 
                    
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" value={keyword} onChange={gosearch}/>
                        <SearchIcon type="submit" onClick={findKeyword}></SearchIcon>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
