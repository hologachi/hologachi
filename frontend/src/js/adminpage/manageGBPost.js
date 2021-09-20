import React, { Component } from 'react';
import AdminNav from "./adminNav"
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGBPost from "./ListGBPost";
import AdminService from '../services/AdminService'; //백엔드 연결

class manageGBPost extends Component {

    state = {
        gbPosts: [],
        comments: [],
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
        AdminService.deleteTheGBPost(postId).then((res) => {
            this.loadGBPosts();
            // console.log(this.state.gbPosts);
        }) 
    }

    loadComments = (postId) => {
        // 공동구매 댓글 조회
        AdminService.getTheComments(postId).then((res) => {
            this.setState(
                { comments: res.data }
            );
            // console.log(this.state.comments);
        }) 
    }

    handleDeleteComment = (postId, commentId) => {
        // 공동구매 글 삭제 
        AdminService.deleteTheComment(commentId).then((res) => {
            this.loadComments(postId);
            // console.log(this.state.comments);
        }) 
    }
     

    render() {
        return (
            <div className="MPost">
                <div className="wrapper">
                <AdminNav />
                <ListGBPost 
                    gbPosts={this.state.gbPosts} 
                    handleDeletePost={this.handleDeletePost} 
                    comments={this.state.comments}
                    loadComments={this.loadComments}
                    handleDeleteComment={this.handleDeleteComment}
                />
                </div>

            </div>
        )
    }
 }

 export default manageGBPost;