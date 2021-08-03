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
                        <button className="close" onClick={close}> 수정하기 </button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}

function Privacy() {
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const [textNick, setNick] = useState('');
    const [textId, setId] = useState('');

    const onChangeNick = (e) => {
        setNick(e.target.value);
    }

    const onChangeId = (e) => {
        setId(e.target.value);
    }

    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="privacy">
            <h2>개인정보 수정</h2><br />

            <table className="tablecss table">
                <tr>
                    <th>아이디</th>
                    <td>hologachi</td>
                </tr>
                <tr>
                    <th>별명</th>
                    <td>Holo</td>
                </tr>
                <tr>
                    <th>생일</th>
                    <td>2000-01-01</td>
                </tr>
            </table>
            <button id="modifybtn" onClick={openModal}>수정하기</button>
           
            <Modal open={modalOpen} close={closeModal} header="수정하기">
            <table className="tablecss table">
                <tr>
                    <th>아이디</th>
                    <td><input type="text" value={textId} onChange={onChangeId} placeholder="id"/></td>
                </tr>
                <tr>
                    <th>별명</th>
                    <td><input type="text" value={textNick} onChange={onChangeNick} placeholder="pw" /></td>
                </tr>
                <tr>
                    <th>생일</th>
                    <td><DatePicker selected={startDate} maxDate={moment().toDate()} onChange={(date) => setStartDate(date)} /></td>
                </tr>
            </table>
            </Modal>
        </div>
    )
}

export default Privacy
