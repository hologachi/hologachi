import React, { useState } from 'react'
import '../../css/privacy.css'
import '../../css/modal.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'moment';
import DatePicker from "react-datepicker";

const Modal = (props) => {
    const { open, close, header } = props;

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <header>
                        {header}
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        <button id="close" onClick={close}>취소</button>
                        <button id="modalModifybtn" onClick={modify}> 수정하기 </button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}

function modify(){
    alert("수정이 완료되었습니다.");
    window.location.reload();
}

function Privacy() {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const [textNick, setNick] = useState('');

    const onChangeNick = (e) => {
        setNick(e.target.value);
    }

    return (
        <div className="privacy">
            <h2>개인정보 수정</h2><br />

            <table className="tablecss table">
                <tr>
                    <th>이메일</th>
                    <td>{window.sessionStorage.getItem('email')}</td>
                </tr>
                <tr>
                    <th>닉네임</th>
                    <td>{window.sessionStorage.getItem('nickname')}</td>
                </tr>
            </table>
            <button id="modifybtn" onClick={openModal}>수정하기</button>
           
            <Modal open={modalOpen} close={closeModal} header="수정하기">
            <table className="tablecss table">
                <tr>
                    <th>Email <br /><span id="infoText">이메일은 변경할 수 없습니다.</span></th>
                    
                    <td><input type="text" value={window.sessionStorage.getItem('email')}  placeholder="email" disabled/></td>
                    
                </tr>
                <tr>
                    <th>닉네임</th>
                    <td><input type="text" value={textNick} onChange={onChangeNick} placeholder="닉네임" /></td>
                </tr>
            </table>
            </Modal>
        </div>
    )
}

export default Privacy
