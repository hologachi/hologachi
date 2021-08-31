import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../css/gbwrite.css'
import { Form, Button, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import ImageUploading from 'react-images-uploading';
import { PictureOutlined } from '@ant-design/icons';
import axios from "axios";

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
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" style={{ width: "100px" }} />
                <div className="image-item__btn-wrapper">
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
    labels: ["식품", "가전제품", "생활용품", "도서", "의류"
      , "전자기기"],
    label: ''
  })
  const category = state.labels.map((label, index) => (<option key={index} >{label}</option>));

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
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')

  const [postfiles, setPostfiles] = useState({
    file: [],
    previewURL: "",
  });

  function handelChangeTitle(e){
    setTitle(e.target.value)
  }
  function handelChangePrice(e){
    setPrice(e.target.value)
  }
  function handelChangeUrl(e){
    setUrl(e.target.value)
  }
  function handelChangeContent(e){
    setContent(e.target.value)
  }

  let profile_preview = null;
  if (postfiles.file !== null) {
    profile_preview = <img src={postfiles.previewURL} alt="이미지를 등록하세요" style={{width:"50px"}}/>
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

  function addContent() {
    axios({
      url: '/register',
      method: 'post',
      data: {
        title: title,
        content: content,
        matching: joinnums,
        deadline: startDate,
        deletedBy: -1,
        price: price,
        url: url,
        step:"proceed"
      },
      baseURL: 'http://localhost:8080/post',
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then(function () {
      alert("공동구매가 등록되었습니다.")
      window.location.href="/home"
    }).catch(error => {
      console.log(error.response)
  });
  };

return(
<div id="container" className="container">
    <div id="inputform">
    <div><br />
      <h1 >공동구매 등록</h1><br />
      <Form.Group align="center" as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label  column sm="2">
        <h5>
        <strong>
        글 제목
        </strong>
          </h5>
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="title" value={title} onChange={handelChangeTitle} style={{width:"70%"}}/>
        </Col>
      </Form.Group>

      <Form.Group align="center" as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label column sm="2"><h5>
        <strong>
        가격
        </strong>
           </h5>
        </Form.Label>
        <Col sm="10">
          <Form.Control type="number" placeholder="price" value={price} onChange={handelChangePrice} style={{width:"70%"}}/>
        </Col>
      </Form.Group><br />

      <Form.Group align="center" className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label id="left" ><h5>
        <strong>
        카테고리
        </strong>
        </h5>
        </Form.Label>
        <Form.Control as="select" name="category" style={{width:"100px"}}>
          {category}
        </Form.Control>
      </Form.Group><br />

      <Form.Group align="center" as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1" >
        <Form.Label column sm="2"><h5>
        <strong>
        구매 링크
        </strong>
          </h5>
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="URL" value={url} onChange={handelChangeUrl} style={{width:"70%"}}/>
        </Col>
      </Form.Group><br />

      <Form.Group align="center" className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label><h5>
        <strong>
        목표 인원 
        </strong>
            </h5>
        </Form.Label>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button id="numbtn" onClick={minusNum}>-</Button>&nbsp;
        <span>{joinnums}</span>&nbsp;
        <Button id="numbtn" onClick={plusNum}>+</Button>
      </Form.Group><br />

      <Form.Group align="center" className="mb-3">
        <Form.Label className="date"><h5><strong>
        공동구매 마감일
        </strong></h5></Form.Label>
        <DatePicker selected={startDate} minDate={moment().toDate()} onChange={(date) => setStartDate(date)} style={{width:"70%"}}/>
      </Form.Group><br />

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <input
          id="upload-file"
          type="file"
          accept="image/*"
          multiple
          onChange={uploadFile}
        ></input>
        {profile_preview}
        <UploadImage />
      </Form.Group><br />

      <Form.Group align="center" className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label id="left" ><h5><strong>
        상품 소개 및 설명
        </strong></h5></Form.Label>
        <Form.Control as="textarea" cols={70} rows={5} placeholder="Content" style={{ resize: "none" }} value={content} onChange={handelChangeContent} />
      </Form.Group><br />

      <Button id="submitbtn" onClick={addContent}>추가</Button>
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