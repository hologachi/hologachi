import React from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import '../../css/myprofile.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const ImgUpload =({
  onChange,
  src,
})=>{
  return(
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img htmlFor="photo-upload" src={src} alt="profile"/>
      </div>
      <input id="photo-upload" type="file" onChange={onChange}/> 
    </label>
  );
}
const Name =({
  onChange,
  value
})=>{
  return(
    <div className="field">
      <span>닉네임</span>
      <span>홀로가치</span>
    </div>
  );
}

// const Grade =({
//   value
// })=>{
//   return(
//     <div className="field">
//       <span>제시자로서 평점:</span>
//       <label className="nickname" type="text" value="5.0" required/>

//       <span>신청자로서 평점:</span>
//       <label className="nickname" type="text" value="5.0" required/>
//     </div>
    
//   );
// }

const Profile =({
  onSubmit,
  src,
  name,
})=>{
  return(
   <div className="row card">
    <form onSubmit={onSubmit}>
      <div className=" col-md-6 col-md-offset-3profileImg">
        <h1 >나의 프로필</h1>
        <label className="custom-file-upload fas">
          <div className="img-wrap" >
            <img htmlFor="photo-upload" src={src} alt="profile" />
          </div>
        </label>
      </div>
      <div className="profileEdit">
        <div className="name">{name}</div>
        <button type="submit" className="edit">Edit Nickname</button>
        <div className="grade"><span>제시자로서 평점 : </span>5.0</div>
        <div className="name"><span>신청자로서 평점 : </span>5.0</div>
      </div>
    </form>
   </div>
  );
}
      
const Edit =({
  onSubmit,
  children,
})=>{
  return(
    <div className="card">
      <form onSubmit={onSubmit}>
          <h1>나의 프로필</h1>
          {children}
        {/* <button type="submit" className="save">Save </button> */}
        <div className="grade"><span>제시자로서 평점 : </span>5.0</div>
        <div className="name"><span>신청자로서 평점 : </span>5.0</div>
      </form>
    </div>
  );
}

class CardProfile extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       file: '',
       imagePreviewUrl: 'https://i.postimg.cc/7LT6kXtR/user.png',
       name:'',
       active: 'edit'
    };
  }
  photoUpload (e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
  }
  editName (e) {
    const name = e.target.value;
    this.setState({
      name,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
    this.setState({
      active: activeP,
    })
  }
  
  render() {
    const {imagePreviewUrl, 
           name, 
           active} = this.state;
    return (
      <div>
        {(active === 'edit')  
          ?<Edit onSubmit={(e)=>this.handleSubmit(e)}>
              <ImgUpload onChange={(e)=>this.photoUpload(e)} src={imagePreviewUrl}/>
              <Name onChange={(e)=>this.editName(e)} value={name}/>
            </Edit>
          :<Profile onSubmit={(e)=>this.handleSubmit(e)} src={imagePreviewUrl} name={name}/>}
        
      </div>
    )
  }
}

function myprofile() {
   return (
        <div className="Profile">
          <Header />
          <div className="profile__body">
            <CardProfile/>
          </div>
          <Footer />
        </div>
    )
}
export default myprofile
