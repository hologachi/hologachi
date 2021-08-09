import React from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import AdminNav from "./adminNav"
import ListGB from "./ListGB"
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function manageGB() {
    return (
         <div className="MGB">
            <Header />
            <AdminNav />

            <ListGB />

            <Footer />
         </div>
     )
 }
 export default manageGB