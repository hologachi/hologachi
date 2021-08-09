import React from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import AdminNav from "./adminNav"
import ListCategory from "./ListGBCategory";
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function manageGBCategory() {
    return (
         <div className="MGBCategory">
            <Header />
            <AdminNav />

            <ListCategory />
            
            <Footer />
         </div>
     )
 }
 export default manageGBCategory