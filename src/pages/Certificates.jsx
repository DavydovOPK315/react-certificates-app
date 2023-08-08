import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import '../styles/Certificates.css';
import Loader from '../components/UI/Loader/Loader';
import Pagination from '../components/UI/pagination/Pagination';
import MySelect from '../components/UI/select/MySelect';
import CertificateList from '../components/CertificateList';
import MyModal from '../components/UI/MyModal/MyModal';
import CertificateForm from '../components/CertificateForm';
import { useDispatch, useSelector } from 'react-redux';
import { addCertificatesThunk, fetchCertificatesThunk, getCertificatesByNameOrDescriptionThunk, getCertificatesByNameThunk, removeCertificatesThunk, updateCertificatesThunk } from '../components/asyncAction/certificates';
import { setModalStateAction } from '../store/modalReducer';
import CertificateDeleteForm from '../components/CertificateDeleteForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';

const schema = yup.object().shape({
    title: yup.string().min(4).max(45).required(),
    description: yup.string().min(4).max(255).required(),
    duration: yup.number().min(0).required(),
    price: yup.number().min(0).required(),
    tag: yup.string().min(0).max(45),
});

const Certificates = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const [certificateInModal, setCertificateInModal] = useState({})
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1000);

    useEffect(() => {
        console.log("Certificates useEffect")
        searchName || searchDesc ? getAllByNameOrDescription() :
            dispatch(fetchCertificatesThunk(limit, page, setTotalPages))
    }, [limit, page])

    const changePage = (pageNew) => {
        console.log("Changing page")
        pageNew = pageNew < 1 ? 1 : (pageNew > totalPages) ? totalPages : pageNew;
        setPage(pageNew);
    }

    const changeLimit = (limit) => {
        console.log("changeLimit")
        setLimit(limit);
        setPage(1);
    }

    const dispatch = useDispatch()
    const token = useSelector(state => state.token.token)
    const reduxCertificates = useSelector(state => state.certificates.certificates)
    const isCertificatesLoading = useSelector(state => state.loading.loading)
    const [deleteFormModal, setDeleteFormModal] = useState(false)
    const modal = useSelector(state => state.modal.modal)
    const setModal = (modalState) => {
        dispatch(setModalStateAction(modalState))
    }

    const addTagToCertificateInModal = (data) => {
        const tagName = data.tag;
        if (typeof tagName === "string" && tagName.trim() === "")
            return;

        if (typeof certificateInModal.tagResponseModels === "undefined") {
            setCertificateInModal(certificateInModal.tagResponseModels = [])
        }

        const newTag = {
            id: Date.now(),
            name: tagName
        }
        setCertificateInModal({ ...certificateInModal, tagResponseModels: [...certificateInModal.tagResponseModels, newTag] })
    }

    const deleteTagFromCertificateInModal = (tagDeleted) => {
        setCertificateInModal({ ...certificateInModal, tagResponseModels: certificateInModal.tagResponseModels.filter(tag => tag.name !== tagDeleted.name) })
    }

    const updateCertificate = () => {
        console.log("updating certificate")
        dispatch(updateCertificatesThunk(certificateInModal, token))
        dispatch(fetchCertificatesThunk(limit, page, setTotalPages))

        getCertificatesWithTimeout()
    }

    const addCertificate = () => {
        console.log("adding certificate")
        dispatch(addCertificatesThunk(certificateInModal, token))

        getCertificatesWithTimeout()
    }

    const removeCertificate = () => {
        console.log("removing certificate ==> ", certificateInModal)
        dispatch(removeCertificatesThunk(certificateInModal, token))
        getCertificatesWithTimeout()
    }

    const getCertificatesWithTimeout = () => {
        setTimeout(() => {
            dispatch(fetchCertificatesThunk(limit, page, setTotalPages))
        }, 200);
    }

    const globalMessage = useSelector(state => state.message.message)

    const [searchName, setSearchName] = useState('')
    const [searchDesc, setSearchDesc] = useState('')

    const getAllByNameOrDescription = () => {
        // const pageNumber = page > 1 ? 1 : page
        // setPage(pageNumber)
        dispatch(getCertificatesByNameOrDescriptionThunk(limit, page, searchName, searchDesc))
    }

    const resetForm = () => {

        console.log("resetForm certificateInModal ", certificateInModal)
        console.log("resetForm certificateInModal ", certificateInModal.name)

        // reset({});
        setCertificateInModal({
            name: '',
            description: '',
            duration: '',
            price: '',
            tag: '',
        })

        // setTimeout(() => {
        reset({
            title: certificateInModal.name,
            description: certificateInModal.description,
            duration: certificateInModal.duration,
            price: certificateInModal.price,
            tag: '',
        }, {
            keepErrors: true,
            keepDirty: true,
        });
        // }, 200);
    }

    const handleChange = (e) => {
        let { name, value } = e.target;

        console.log("handleChange => ", name, value);
        name = name === "title" ? "name" : name;
        setCertificateInModal({
            ...certificateInModal,
            [name]: value,
        });

    };

    return (
        <div className="div__central">
            {globalMessage &&
                <div className="global__message">
                    <a href="/" title="Message icon"><img src="https://www.freeiconspng.com/uploads/error-icon-4.png" width="30" alt="Error Icon" /></a>
                    <h2>Message: {globalMessage}!</h2>
                </div>
            }

            <div className='search__bar'>
                <MyInput style={{ height: "35px", margin: "0px" }} value={searchName} onChange={(e) => setSearchName(e.target.value)} type="text" placeholder="Search by name..." />
                <MyButton style={{ height: "35px", margin: "0px" }} onClick={getAllByNameOrDescription}>Go!</MyButton>
            </div>

            <div className='search__bar'>
                <MyInput style={{ height: "35px", margin: "0px" }} value={searchDesc} onChange={(e) => setSearchDesc(e.target.value)} type="text" placeholder="Search by description..." />
                <MyButton style={{ height: "35px", margin: "0px" }} onClick={getAllByNameOrDescription}>Go!</MyButton>
            </div>

            <MyModal visible={modal} setVisible={setModal} setCertificateInModal={setCertificateInModal} resetForm={resetForm}>
                <CertificateForm
                    certificateInModal={certificateInModal}
                    setVisible={setModal}
                    setCertificateInModal={setCertificateInModal}
                    addTagToCertificateInModal={addTagToCertificateInModal}
                    deleteTagFromCertificateInModal={deleteTagFromCertificateInModal}
                    updateCertificate={updateCertificate}
                    addCertificate={addCertificate}
                    handleSubmit={handleSubmit}
                    register={register}
                    errors={errors}
                    resetForm={resetForm}
                    handleChange={handleChange}
                >
                </CertificateForm>
            </MyModal>

            <MyModal visible={deleteFormModal} setVisible={setDeleteFormModal} setCertificateInModal={setCertificateInModal} resetForm={resetForm}>
                <CertificateDeleteForm
                    certificateInModal={certificateInModal}
                    setCertificateInModal={setCertificateInModal}
                    removeCertificate={removeCertificate}
                    setDeleteFormModal={setDeleteFormModal}
                >
                </CertificateDeleteForm>
            </MyModal>


            {reduxCertificates.length === 0
                ?
                <div>
                    <h2 className="message__not__found">Certificates not found!</h2>
                </div>
                :
                isCertificatesLoading
                    ?
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                        <Loader />
                    </div>
                    :
                    <div>
                        <CertificateList
                            certificates={reduxCertificates}
                            setModal={setModal}
                            setCertificateInModal={setCertificateInModal}
                            setDeleteFormModal={setDeleteFormModal}
                        />
                    </div>
            }

            {!isCertificatesLoading &&
                <div className='wrapper__pagination__select'>
                    <div>
                        <Pagination page={page} totalPages={totalPages} changePage={changePage} />
                    </div>
                    <div>
                        <MySelect
                            value={limit}
                            onChange={changeLimit}
                            defaultValue={'Count'}
                            options={[
                                { value: 5, name: "5" },
                                { value: 10, name: "10" },
                                { value: 20, name: "20" },
                                { value: 25, name: "25" },
                                { value: 50, name: "50" },
                                { value: 200, name: "200" },
                            ]}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default Certificates
