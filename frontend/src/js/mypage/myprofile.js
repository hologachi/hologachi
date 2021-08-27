import React, { useState, useEffect } from 'react';
import '../../css/myprofile.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

// const ImgUpload =({
//   onChange,
//   src,
// })=>{
//   return(
//     <label htmlFor="photo-upload" className="custom-file-upload fas">
//       <div className="img-wrap img-upload" >
//         <img htmlFor="photo-upload" src={src} alt="profile"/>
//       </div>
//       <input id="photo-upload" type="file" onChange={onChange}/> 
//     </label>
//   );
// }

function location(loc){
  window.location.href="/mypage/"+loc
}

function Myprofile(){
  // 요청받은 정보를 담아줄 변수 선언
const [ testStr, setTestStr ] = useState('');

// 변수 초기화
function callback(str) {
  setTestStr(str);
}

// 첫 번째 렌더링을 마친 후 실행
useEffect(
    () => {
      axios({
          url: '/mypage/mypage/profile',
          method: 'GET'
      }).then((res) => {
          callback(res.data);
      })
    }, []
);


  const profiles = Object.values(testStr).map(profile => {
    return (
      <div className="card">
        <h1>{profile.nickname}의 프로필</h1>
        <div className="img-wrap" >
          <img className="pr" src="https://i.postimg.cc/7LT6kXtR/user.png" alt="" />
        </div><br />
        <div className="grade"><span>제시자로서 평점 : </span>{profile.sgstRate}</div>
        <div className="name"><span>신청자로서 평점 : </span>{profile.rqstRate}</div>
        <div className="menu">
          <button className="menuItems" onClick={() => {location('privacy')}}>개인정보 확인 및 수정</button>
          <button className="menuItems" onClick={() => {location('mywriting')}}>내가 작성한 글</button>
          <button className="menuItems" onClick={() => {location('applygb')}}>내가 신청한 글</button>
          <button className="menuItems" onClick={() => {location('commentwrite')}}>내가 댓글 남긴 글</button>
          <button className="menuItems" onClick={() => {location('bookmark')}}>북마크</button>
        </div>
      </div>
    );
  });

return (
  <div className="Profile">
    <div className="profile__body">
      {profiles}
    </div>
  </div>
)
}

export default Myprofile

// const Name =({
//   onChange,
//   value
// })=>{
//   return(
//     <div className="field">
//       <span>홀로가치</span>
//     </div>
//   );
// }

// const Profile =({
//   onSubmit,
//   src,
//   name,
// })=>{
//   return(
//    <div className="row card">
//     <form onSubmit={onSubmit}>
//       <div className=" col-md-6 col-md-offset-3profileImg">
//         <h1 >나의 프로필</h1>
//         <label className="custom-file-upload fas">
//           <div className="img-wrap" >
//             <img htmlFor="photo-upload" src={src} alt="profile" />
//           </div>
//         </label>
//       </div>
//       <div className="profileEdit">
//         <div className="name">{name}</div>
//         <button type="submit" className="edit">Edit Nickname</button>
//         <div className="grade"><span>제시자로서 평점 : </span>5</div>
//         <div className="name"><span>신청자로서 평점 : </span>5.0</div>
//       </div>
//     </form>
//    </div>
//   );
// }
      
// const Edit =({
//   onSubmit,
//   children,
// })=>{
//   return(
    // <div className="card">
    //   <form onSubmit={onSubmit}>
    //       <h1>나의 프로필</h1>
    //       {children}
    //     {/* <button type="submit" className="save">Save </button> */}
    //     <div className="grade"><span>제시자로서 평점 : </span>5.0</div>
    //     <div className="name"><span>신청자로서 평점 : </span>5.0</div>
    //   </form>
    // </div>
//   );
// }



// class CardProfile extends React.Component {
//   constructor(props) {
//     super(props);
//      this.state = {
//        file: '',
//        imagePreviewUrl: 'https://i.postimg.cc/7LT6kXtR/user.png',
//        name:'',
//        active: 'edit'
//     };
//   }
//   photoUpload (e) {
//     e.preventDefault();
//     const reader = new FileReader();
//     const file = e.target.files[0];
//     reader.onloadend = () => {
//       this.setState({
//         file: file,
//         imagePreviewUrl: reader.result
//       });
//     }
//     reader.readAsDataURL(file);
//   }
//   editName (e) {
//     const name = e.target.value;
//     this.setState({
//       name,
//     });
//   }
//   handleSubmit(e) {
//     e.preventDefault();
//     let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
//     this.setState({
//       active: activeP,
//     })
//   }
  
//   render() {
//     const {imagePreviewUrl, 
//            name, 
//            active} = this.state;
//     return (
//       <div>
//         {(active === 'edit')  
//           ?<Edit onSubmit={(e)=>this.handleSubmit(e)}>
//               <ImgUpload onChange={(e)=>this.photoUpload(e)} src={imagePreviewUrl}/>
//               <Name onChange={(e)=>this.editName(e)} value={name}/>
//             </Edit>
//           :<Profile onSubmit={(e)=>this.handleSubmit(e)} src={imagePreviewUrl} name={name}/>}
//       </div>
//     )
//   }
// }

