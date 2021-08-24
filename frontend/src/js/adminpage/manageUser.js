import React, { Component } from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import AdminNav from "./adminNav"
import SearchUser from "./searchUser"
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListUser from './ListUser';
import AdminService from '../services/AdminService'; //백엔드 연결

class manageUser extends Component {

    state = {
        users: null,
        userList : null,
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        // 회원 전체 조회 
        AdminService.getAllUsers().then((res) => {
            this.setState(
                { users: res.data }
            );

            console.log(this.state.users);
        }) 
    }

    handleUpdateAuth = (id, new_auth) => {
        if(id !== undefined && id != '') {
            // 회원 권한 수정
            AdminService.updateAuth(id, new_auth).then((res) => {
                this.loadUsers();
            }) 
            alert('사용자 권한을 수정했습니다.');
        } else {
            alert('사용자 권한 수정 요청을 실패했습니다.');
        }
    }

    render() {
        return (
            <div className="AdminPage">
                <Header />
                <AdminNav />

                <SearchUser />

                <ListUser users={this.state.users} handleUpdateAuth={this.handleUpdateAuth}/>

                <Footer />
            </div>
        )
    }
 }
 export default manageUser;