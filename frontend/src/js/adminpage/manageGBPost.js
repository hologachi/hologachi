import React from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import AdminNav from "./adminNav"
import ListGBPost from "./ListGBPost";
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function manageGBPost() {
    return (
         <div className="MPost">
            <Header />
            <AdminNav />

            <ListGBPost />

            <Footer />
         </div>
     )
 }
 export default manageGBPost