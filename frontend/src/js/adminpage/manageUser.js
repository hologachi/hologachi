import React from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import AdminNav from "./adminNav"
import SearchUser from "./searchUser"
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListUserComponents from './ListUser';

function manageUser() {
    return (
         <div className="AdminPage">
            <Header />
            <AdminNav />

            <SearchUser />
            
            <ListUserComponents />

            <Footer />
         </div>
     )
 }
 export default manageUser