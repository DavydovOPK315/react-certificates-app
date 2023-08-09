import React from 'react'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'
import './../styles/CertificateForm.css'

const CertificateForm = ({
    certificateInModal,
    setCertificateInModal,
    setVisible,
    addTagToCertificateInModal,
    deleteTagFromCertificateInModal,
    updateCertificate,
    addCertificate,
    handleSubmit,
    register,
    errors,
    resetForm,
    handleChange }) => {

    const saveButtonAction = (data) => {
        console.log("saveButtonAction")

        setCertificateInModal(
            certificateInModal.name = data.title,
            certificateInModal.description = data.description,
            certificateInModal.duration = data.duration,
            certificateInModal.price = data.price,
        )

        setVisible(false)
        addCertificate()
    }

    const updateButtonAction = (data) => {
        console.log("updateButtonAction")
        console.log("updateButtonAction data ", data)
        console.log("updateButtonAction certificateInModal ", certificateInModal)

        setCertificateInModal(
            certificateInModal.name = data.title,
            certificateInModal.description = data.description,
            certificateInModal.duration = data.duration,
            certificateInModal.price = data.price,
        )
        setVisible(false)
        updateCertificate()
    }

    const cancelButtonAction = (event) => {
        event.preventDefault();
        console.log("cancelButtonAction")
        setVisible(false);
        resetForm();
    }

    return (
        <div className="form__wrapper">
            <div className="form__header__wrapper__div">
                {certificateInModal.id
                    ?
                    <p>Edit certificate with id = {certificateInModal.id} </p>
                    :
                    <p>Add new certificate</p>
                }
            </div>

            <div className="form__content__wraper">

                <div className="form__wrapper__div">
                    <div className="form__input__name">Title</div> <MyInput name="title" type="text" {...register("title")} value={certificateInModal.name} onChange={handleChange} style={{ width: "340px", marginInlineStart: "auto" }} required />
                </div>
                <p style={{ color: "red" }}>{errors.title?.message}</p>

                <div className="form__wrapper__div">
                    <div className="form__input__name">Description</div> <MyInput name="description" type="text" {...register("description")} value={certificateInModal.description} onChange={handleChange} style={{ width: "340px", height: "80px", marginInlineStart: "auto" }} required />
                </div>
                <p style={{ color: "red" }}>{errors.description?.message}</p>

                <div className="form__wrapper__div">
                    <div className="form__input__name">Duration</div>  <MyInput name="duration" {...register("duration")} value={certificateInModal.duration} onChange={handleChange} style={{ width: "340px", marginInlineStart: "auto" }} required />
                </div>
                <p style={{ color: "red" }}>{errors.duration?.message}</p>

                <div className="form__wrapper__div">
                    <div className="form__input__name">Price</div> <MyInput name="price" {...register("price")} value={certificateInModal.price} onChange={handleChange} style={{ width: "340px", marginInlineStart: "auto" }} required />
                </div>
                <p style={{ color: "red" }}>{errors.price?.message}</p>

                <div className="form__wrapper__div">
                    <div className="form__input__name">Tags</div>  <MyInput name="tag" type="text" {...register("tag")} placeholder="tag name" style={{ width: "285px", marginInlineStart: "auto" }} /> <MyButton onClick={handleSubmit(addTagToCertificateInModal)} style={{ margin: "0px", border: "0px", height: "28px" }}>Add</MyButton>
                </div>
                <p style={{ color: "red" }}>{errors.tag?.message}</p>

                <div className="form__wrapper__div form__footer">
                    {certificateInModal.tagResponseModels && certificateInModal.tagResponseModels.map(tag =>
                        <div className="tags" key={tag.name} onClick={() => deleteTagFromCertificateInModal(tag)}>{tag.name} X</div>)}
                </div>

                <div className="form__wrapper__div form__footer">
                    {certificateInModal.createDate ?
                        <MyButton onClick={handleSubmit(updateButtonAction)}>Update</MyButton>
                        :
                        <MyButton onClick={handleSubmit(saveButtonAction)}>Save</MyButton>
                    }
                    <MyButton onClick={cancelButtonAction}>Cancel</MyButton>
                </div>
            </div>
        </div>
    )
}

export default CertificateForm
