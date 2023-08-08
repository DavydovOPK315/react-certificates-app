import React from 'react'
import MyButton from './UI/button/MyButton'

const CertificateItem = ({ certificate, setModal, setCertificateInModal, setDeleteFormModal }) => {

    const editCertificateAction = (e) => {
        e.preventDefault();
        setCertificateInModal(certificate)
        setModal(true)
    }

    const removeCertificateAction = (e) => {
        e.preventDefault();
        setCertificateInModal(certificate)
        setDeleteFormModal(true)
    }

    return (
        <tr>
            <td>{certificate.createDate}</td>
            <td>{certificate.name}</td>
            <td style={{ width: '100px' }}>
                {certificate.tagResponseModels.map(tag =>
                    <span key={tag.name}>{tag.name} </span>)}
            </td>
            <td>{certificate.description}</td>
            <td>{certificate.price}</td>
            <td>
                <MyButton>View</MyButton>
                <MyButton style={{ background: 'orange' }} onClick={editCertificateAction}>Edit</MyButton>
                <MyButton style={{ background: 'red' }} onClick={removeCertificateAction}>Delete</MyButton>
            </td>
        </tr>
    )
}

export default CertificateItem
