import React, { Component } from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import AdminNav from "./adminNav"
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListCategory from "./ListGBCategory";
import AdminService from '../services/AdminService'; //백엔드 연결


class manageGBCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
        }
    }

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories = () => {
        // 공동구매 전체 조회 
        AdminService.getAllCategories().then((res) => {
            this.setState(
                { categories: res.data }
            );
            // console.log(this.state.categories);
        }) 
        
    }

    handleAddCat(cat1, cat2) { // 카테고리 추가
        // event.preventDefault();
        if(cat1 != null && cat2 != null) {
            let category = {cat1: cat1, cat2: cat2};
            console.log(category);
            
            AdminService.createCategory(category).then((_res) => {
                // this.props.history.push('/mGB');
            });
        }
        
        // alert('카테고리 추가가 요청되었습니다');
    }
    
    handleSubmit = () => { // 카테고리 수정 및 삭제 
        alert('카테고리 관련 수정이 요청되었습니다');
    }

    render() {
        return (
            <div className="MGBCategory">
                <Header />
                <AdminNav />

                <ListCategory 
                    categories={this.state.categories} 
                    handleAddCat={this.handleAddCat}
                    handleSubmit={this.handleSubmit}
                />
                
                <Footer />
            </div>
        )
    }
 }
 export default manageGBCategory