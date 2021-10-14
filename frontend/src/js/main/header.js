import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import '../../css/header.css';
import  AuthGoogleLogout  from "../login/authGoogleLogout";
import  AuthGoogleLogin  from "../login/authGoogleLogin";

export default function Header() {
    const [isLogined, setIsLogined] = useState(window.sessionStorage.getItem('nickname'))
    const [isAdmin, setIsAdmin] = useState(window.sessionStorage.getItem('isAdmin'))
    const [keyword, setKeyword] = useState('')
    

    useEffect(() => { // useEffect 적용!
        // console.log(isLogined);
        }, [isLogined]);
    
        function handleChange(e){
            setKeyword(e.target.value)
        }

        const onKeyPress = (e) =>{
            e.preventDefault()
            if(e.key === 'Enter') {
                onClick()
            }
        }

        const onClick = (e) => {
            window.location.href=`/gb/searchList/${keyword}`
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
                            {/* <NavDropdown.Item href="/mypage/privacy">개인정보 확인 및 수정</NavDropdown.Item> */}
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.7">평점 등록</NavDropdown.Item>
                        </NavDropdown> }

                        <Nav.Link href="/brandEvent" className="menu">B-EVENT</Nav.Link>
                       
                        { isLogined && <Nav.Link href="/chatList" className="menu">채팅</Nav.Link>}

                        <NavDropdown title="기부" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/donation/site">기부 사이트</NavDropdown.Item>
                            { isLogined && <NavDropdown.Item href="/donation/apply">기부하기</NavDropdown.Item> }
                            { isLogined && <NavDropdown.Item href="/donation/my">나의 기부</NavDropdown.Item> }
                        </NavDropdown> 
                        
                        { isAdmin == 1 && <Nav.Link href="/admin/mUser" className="menu">관리자 페이지</Nav.Link>}

                    </Nav>
                    <div  id="totalSearchForm">
                    <form className="searchform">
                        <input
                            placeholder="Search"
                            value={keyword}
                            onChange={handleChange}
                            id="totalSearch"
                            onKeyPress={onKeyPress}
                        /> 
                    </form>
                    </div>
                        <div id="googleOauth">
                            {/* 로그인 한 경우 */}
                            {isLogined && <span>{window.sessionStorage.getItem('nickname')} 님 안녕하세요</span>}
                            {isLogined && <AuthGoogleLogout setIsLogined={setIsLogined}/>}
                        </div>
                        <div className="writeBtn">
                        { isLogined && <Button href="/gb/gbwrite" className="gbwritebtn">공동구매 글쓰기</Button>}
                        </div>
                        {/* 로그인 안 한 경우 */}
                        {!isLogined && <AuthGoogleLogin />}
                
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
