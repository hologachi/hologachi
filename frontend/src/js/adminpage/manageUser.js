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

    render() {
        return (
            <div className="AdminPage">
                <Header />
                <AdminNav />

                <SearchUser />

                <ListUser users={this.state.users}/>

                <Footer />
            </div>
        )
    }
 }
 export default manageUser;