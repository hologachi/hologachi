import React, { Component } from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import AdminNav from "./adminNav"
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListCategory from "./ListGBCategory";
import AdminService from '../services/AdminService'; //백엔드 연결


class manageGBCategory extends Component {
    state = {
        categories: [],
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

    render() {
        return (
            <div className="MGBCategory">
                <Header />
                <AdminNav />

                <ListCategory categories={this.state.categories}/>
                
                <Footer />
            </div>
        )
    }
 }
 export default manageGBCategory