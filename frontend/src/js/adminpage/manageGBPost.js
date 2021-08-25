import React, { Component } from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import AdminNav from "./adminNav"
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGBPost from "./ListGBPost";
import AdminService from '../services/AdminService'; //백엔드 연결

class manageGBPost extends Component {

    state = {
        gbPosts: [],
    }

    componentDidMount() {
        this.loadGBPosts();
    }

    loadGBPosts = () => {
        // 공동구매 글 전체 조회 
        AdminService.getAllGBPosts().then((res) => {
            this.setState(
                { gbPosts: res.data }
            );

            // console.log(this.state.gbPosts);
        }) 
        
    }

    handleDeletePost = (postId) => {
        // 공동구매 글 삭제 
        AdminService.deleteTheGBPosts(postId).then((res) => {
            this.loadGBPosts();
            console.log(this.state.gbPosts);
        }) 
    }

    render() {
        return (
            <div className="MPost">
                <Header />
                <AdminNav />

                <ListGBPost gbPosts={this.state.gbPosts} handleDeletePost={this.handleDeletePost} />

                <Footer />
            </div>
        )
    }
 }

 export default manageGBPost;