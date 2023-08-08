import React from 'react'
import MyButton from './UI/button/MyButton'
import './../styles/CertificateDeleteForm.css'

const CertificateDeleteForm = ({ certificateInModal, setCertificateInModal, removeCertificate, setDeleteFormModal }) => {

    const removeCertificateAction = (e) => {
        e.preventDefault();
        removeCertificate();
        setDeleteFormModal(false);
    }

    const cancelButtonAction = (e) => {
        e.preventDefault();
        setCertificateInModal({});
        setDeleteFormModal(false);
    }

    return (
        <div className="form__wrapper">
            <div className="form__header__wrapper__div">
                <p>Delete confirmation</p>
            </div>
            <div className="form__content__wraper">
                <p>Do you really want to delete certificate with id = {certificateInModal.id}?</p>
                <div className="form__buttons">
                    <MyButton style={{ background: "red" }} onClick={removeCertificateAction}>Yes</MyButton>
                    <MyButton onClick={cancelButtonAction}>Cancel</MyButton>
                </div>
            </div>
        </div>
    )
}

export default CertificateDeleteForm
