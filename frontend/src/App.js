import React from 'react';
import '../src/css/App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./js/main/header";
import Footer from "./js/main/footer";

import  Home  from "./js/main/home";

import  Profile  from "./js/mypage/myprofile";
// import  Mywriting  from "./js/mypage/mywriting";
// import  Applygb  from "./js/mypage/applygb";
// import  Sidemenu  from "./js/mypage/mypageside";
// import  Bookmark  from "./js/mypage/bookmark";
// import  Comment  from "./js/mypage/commentwrite";
// import  Privacy  from "./js/mypage/privacy";

import  Gbwrite  from "./js/gb/gbwrite";
import  Gblist from "./js/gb/gblist";
import Gbdetail from "./js/gb/gbdetail";
// import  MUser  from "./js/adminpage/manageUser";
// import  MGB  from "./js/adminpage/manageGB";
// import  MGBPost  from "./js/adminpage/manageGBPost";
// import  MGBCategory  from "./js/adminpage/manageGBCategory";
// // import  Chat  from "./js/chat/chatList";
// import  Login  from "./js/login/login";
// // 테스트용
// import  AddInfo  from "./js/login/addInfo";
// import  Complete  from "./js/login/completeLogin";

import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <div className="App">
//     <Header />
//       <BrowserRouter>
//         <Switch>
//           {/* Home */}
//           <Route exact path="/" component={Home} />

//           {/* Mypage */}
//           <Route path="/mypage/myprofile" component={Profile} />
//           <Route path="/mypage/mywriting" component={Mywriting} />
//           <Route path="/mypage/applygb" component={Applygb} />
//           <Route path="/mypage/bookmark" component={Bookmark} />
//           <Route path="/mypage/mypageside" component={Sidemenu} />
//           <Route path="/mypage/commentwrite" component={Comment} />
//           <Route path="/mypage/privacy" component={Privacy} />

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
           <Route path="/gb/gbdetail/:productId" component={Gbdetail} />

        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App