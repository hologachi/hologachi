// import React, { useState } from 'react';
import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useEffect
} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../css/gbwrite.css'
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';
import ImageUploading from 'react-images-uploading';
import { PictureOutlined } from '@ant-design/icons'


//   state = {
//     title: '',
//     content: '',
//     link: '',
//     joinnum: '',
//     input5: '',
//     show: true,
//     list: [],
//     labels: ["의류", "잡화", "도서", "디지털/가전", "굿즈"
//       , "생활", "식품", "스포츠/레저", "뷰티/미용", "유아", "출산", "차량/오토바이", "기타"],
//     label: ''
//   };

//   const handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value
//     });
//   };

//   const handleCreate = () => {
//     const { title, content, link, joinnum, date, gbimg, list } = this.state;
//     this.setState({
//       list: list.concat({
//         title: title,
//         content: content,
//         link: link,
//         joinnum: joinnum,
//         date: date,
//         gbimg:gbimg
//       }),
//       // input1: '', content: '', link: '', joinnum: '', date: 0
//     });
//   };

//     const { title, content, link, joinnum, date, list } = this.state;
//     const category = this.state.labels.map((label, index) => (<option key={index}>{label}</option>));
//     const [startDate, setStartDate] = useState(new Date());

//     return (
//       <div className="row card">
//         <div>
//           <h1 >공동구매 등록</h1>

//           {/* <Form className="gbFrom">
//             <Form.Group controlId="formGroupTitle">
//               <Form.Label>글 제목</Form.Label>
//               <Form.Control required="required" type="text" name="title" onChange={handleChange} value={title} placeholder="Title" />
//             </Form.Group>
//             <Form.Group controlId="formGroupContent">
//               <Form.Label>글 내용</Form.Label>
//               <Form.Control className="textArea" type="text" as="textarea" name="content" onChange={handleChange} value={content} placeholder="Content" required />
//             </Form.Group>
//             <Form.Group controlId="exampleForm.ControlSelect1">
//               <Form.Label>카테고리</Form.Label>
//               <Form.Control as="select" name="link" value={link} onChange={this.handleChange} required>
//                 {category}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="formGroupLink">
//               <Form.Label>구매링크</Form.Label>
//               <Form.Control type="text" name="input4" onChange={handleChange} value={input4} placeholder="Link" required />
//             </Form.Group>
//             <button className="submitbtn" onClick={handleCreate}>추가</button>
//           </Form> */}
//         </div>
//         {/* <div>
//           <ul>
//             {list.map((item, index) => {
//               return (

//               );
//             })}
//           </ul>
//         </div> */}
//       </div>
//     );
//   }




function UploadImage() {

  const [images, setImages] = useState([]);
  const maxNumber = 4;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  // 추가
  const onError = (errors, files) => {
    if (errors.maxNumber) {
      alert("이미지는 4개까지만 첨부할 수 있습니다")
    }
  }

  return (
    <div className="imageup">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        onError={onError}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              <PictureOutlined /> 사진추가
            </button>
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" style={{ width: "100px" }} />
                <div className="image-item__btn-wrapper">
                  {/* <button onClick={() => onImageUpdate(index)}>수정</button> */}
                  <button onClick={() => onImageRemove(index)}>삭제</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}


function Board() {

  const [state, setstate] = useState({
    title: '',
    content: '',
    link: '',
    date: '',
    gbimg: '',
    category: '',
    show: true,
    list: [],
    labels: ["의류", "잡화", "도서", "디지털/가전", "굿즈"
      , "생활", "식품", "스포츠/레저", "뷰티/미용", "유아", "출산", "차량/오토바이", "기타"],
    label: ''
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setstate({
      [name]: value
    });
  };


  // const handleCreate = () => {
  //   const { title, content, link, category, joinnums, date, gbimg, list } = state;
  //   setstate({
  //     list: list.concat({
  //       title: title,
  //       content: content,
  //       category: category,
  //       link: link,
  //       joinnums: joinnums,
  //       date: date,
  //       gbimg: gbimg
  //     }),
  //     // input1: '', content: '', link: '', joinnum: '', date: 0
  //   });
  //   console.log(setstate);
  // };
  const [joinnums, setNums] = useState(2);

  const plusNum = e => {
    e.preventDefault();
    setNums(joinnums + 1);
  }
  const minusNum = e => {
    e.preventDefault();
    if (joinnums > 2) {
      setNums(joinnums - 1);
    } else {
      alert('공동구매 인원은 최소 2명 입니다.')
    }
  }

  const [startDate, setStartDate] = useState(new Date());

  const [postfiles, setPostfiles] = useState({
    file: [],
    previewURL: "",
  });

  let profile_preview = null;
  if (postfiles.file !== null) {
    profile_preview = <img src={postfiles.previewURL} alt="profileImg" />
  }

  const uploadFile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    const filesInArr = Array.from(e.target.files);

    reader.onloadend = () => {
      setPostfiles({
        file: filesInArr,
        previewURL: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addContent = e => {
    alert('글 등록 성공!')
    window.location.href = "/";
  }

  const { id, title, content, link, date, list } = state;
  const category = state.labels.map((label, index) => (<option key={index}>{label}</option>));

  return (
    <div id="container" className="container">
      <div id="inputform">
        <h1 id="titlteh1">공동구매 등록</h1>
        <div id="title">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label id="left" className="content">글 제목</Form.Label>
              <Form.Control required="required" type="text" name="title" onChange={handleChange} value={title} placeholder="Title" />
            </Form.Group>
          </Form>
        </div><br />
        <div id="categoryList">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label id="left" >카테고리</Form.Label>
              <Form.Control as="select" name="category" >
                {category}
              </Form.Control>
            </Form.Group>
          </Form>
        </div><br />
        <div id="link">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label id="left" className="link">구매 링크</Form.Label>
              <Form.Control type="text" name="link" onChange={handleChange} value={link} placeholder="Link" required="required" />
            </Form.Group>
          </Form>
        </div><br />
        <div id="joinnum">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label id="left" className="joinnum">목표 인원</Form.Label>&nbsp;
              <Button id="numbtn" onClick={minusNum}>-</Button>&nbsp;
              <span>{joinnums}</span>&nbsp;
              <Button id="numbtn" onClick={plusNum}>+</Button>
            </Form.Group>
          </Form>
        </div><br />
        <div id="gbwriteDate">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="date">공동구매 마감일</Form.Label>
              <DatePicker selected={startDate} minDate={moment().toDate()} onChange={(date) => setStartDate(date)} />
            </Form.Group>
          </Form>
        </div><br />
        <div id="gbimg">
          <Form>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <label htmlFor="upload-file" id="uploadlabel">이미지 파일선택</label>
              <input
                id="upload-file"
                type="file"
                accept="image/*"
                multiple
                onChange={uploadFile}
              ></input>
              {profile_preview}
            </Form.Group> */}
            <UploadImage />
          </Form>
        </div><br />
        <div id="gbwriteContent">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label id="left" >상품 소개 및 설명</Form.Label>
              <Form.Control as="textarea" className="content" cols={70} rows={5} onChange={handleChange} value={content} placeholder="Content" style={{ resize: "none" }} />
            </Form.Group>
            <Button id="submitbtn" onClick={addContent}>추가</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}


function gbwrite() {
  return (
    <div className="Gbwrite" >
      <div className="gbwrite__body">
        <Board />
      </div>
    </div>
  )
}
export default gbwrite



// postfiles?.file.map((eachfile) => {
//   formData.append("path", eachfile);
//   axios.post(formData);
// });
// const formData = new FormData();
// formData.append("json", JSON.stringify({ content: postContent }));
// fetch(UPLOAD_POSTS, {
//   method: "POST",
//   headers: {
//     Authorization: localStorage.getItem("token"),
//   },
//   body: formData,
// })
//   .then((res) => res.json())
//   .then((res) => {
//     if (res.message === "SUCCESS") return history.push("/");
//   });