import React from 'react';
import '../src/css/App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./js/main/header";

import  Home  from "./js/main/home";

import  Profile  from "./js/mypage/myprofile";
import  Mywriting  from "./js/mypage/mywriting";
import  ReqList  from "./js/mypage/reqList.js";
import  Applygb  from "./js/mypage/applygb";
import  Sidemenu  from "./js/mypage/mypageside";
import  Bookmark  from "./js/mypage/bookmark";
import  Comment  from "./js/mypage/commentwrite";
import  Privacy  from "./js/mypage/privacy";
import  ReqUserProfile from "./js/mypage/reqUserProfile";
import  SgstProfile from "./js/mypage/sgstProfile";

import  Gbwrite  from "./js/gb/gbwrite";
import  Gblist from "./js/gb/gblist";
import  GblistMatching from "./js/gb/gblistMatching";
import Gbdetail from "./js/gb/gbdetail";

import  MUser  from "./js/adminpage/manageUser";
import  MGB  from "./js/adminpage/manageGB";
import  MGBPost  from "./js/adminpage/manageGBPost";
import  MGBCategory  from "./js/adminpage/manageGBCategory";
import  Chat  from "./js/chat/chatList";
import  Login  from "./js/login/login";
import  Logout  from "./js/login/authGoogleLogout";

import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <div className="App">
//     <Header />
//       <BrowserRouter>
//         <Switch>
//           {/* Home */}
//           <Route exact path="/" component={Home} />

          // {/* Mypage */}
          // <Route path="/mypage/myprofile" component={Profile} />
          // <Route path="/mypage/mywriting" component={Mywriting} />
          // <Route path="/mypage/applygb" component={Applygb} />
          // <Route path="/mypage/bookmark" component={Bookmark} />
          // <Route path="/mypage/mypageside" component={Sidemenu} />
          // <Route path="/mypage/commentwrite" component={Comment} />
          // <Route path="/mypage/privacy" component={Privacy} />

//           {/* GB */}
//           <Route path="/gb/gbwrite" component={Gbwrite} />
//           <Route path="/gb/gblist" component={Gblist} />
//           <Route path="/gb/gbdetail/:productId" component={Gbdetail} />

//         </Switch>
//       </BrowserRouter>
//       <Footer />
//       <BrowserRouter>
//         <Switch>
//           <Route path="/mUser" component={MUser} />
//           <Route path="/mGB" component={MGB} />
//           <Route path="/mGBPost" component={MGBPost} />
//           <Route path="/mGBCategory" component={MGBCategory} />
//           {/* <Route path="/chat/List" component={Chat} /> */}
//           <Route path="/login" component={Login} />
//           <Route path="/addInfo" component={AddInfo} />
//           <Route path="/complete" component={Complete} />
//         </Switch>
//       </BrowserRouter>
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
    <Header />
      <BrowserRouter>
        <Switch>
          {/* Home */}
          <Route exact path="/home" component={Home} />

          {/* Mypage */}
           <Route path="/mypage/profile" component={Profile} />

          {/* GB */}
           <Route path="/gb/gbwrite" component={Gbwrite} />
           <Route path="/gb/gblist" component={Gblist} />
           <Route path="/gb/gblistMatching" component={GblistMatching} />
           <Route path="/gb/gbdetail/:productId" component={Gbdetail} />

          {/* Mypage */}
          <Route path="/mypage/myprofile" component={Profile} />
          <Route path="/mypage/mywriting" component={Mywriting} />
          <Route path="/mypage/reqList/:productId" component={ReqList} />
          <Route path="/mypage/applygb" component={Applygb} />
          <Route path="/mypage/bookmark" component={Bookmark} />
          <Route path="/mypage/mypageside" component={Sidemenu} />
          <Route path="/mypage/commentwrite" component={Comment} />
          <Route path="/mypage/privacy" component={Privacy} />
            <Route path="/mypage/mypost/:postId/:ptcptId" component={ReqUserProfile} />
            <Route path="/mypage/myrequest/sgstProfile/:ptcptId" component={SgstProfile} />

          <Route path="/admin/mUser" component={MUser} />
          <Route path="/admin/mGB" component={MGB} />
          <Route path="/admin/mGBPost" component={MGBPost} />
          <Route path="/admin/mGBCategory" component={MGBCategory} />
          <Route path="/chat/List" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App