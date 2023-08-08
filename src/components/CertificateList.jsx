import React from 'react'
import CertificateItem from './CertificateItem'

const CertificateList = ({ certificates, setModal, setCertificateInModal, setDeleteFormModal }) => {
  return (
    <div>
      <table className='tg'>
        <thead>
          <tr>
            <th style={{ width: '200px' }}>Datetime</th>
            <th style={{ width: '100px' }}>Title</th>
            <th style={{ width: '200px' }}>Tags</th>
            <th style={{ width: '150px' }}>Description</th>
            <th style={{ width: '70px' }}>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate) =>
            <CertificateItem
              certificate={certificate}
              setModal={setModal}
              setCertificateInModal={setCertificateInModal}
              setDeleteFormModal={setDeleteFormModal}
              key={certificate.id}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CertificateList
