import React, { useEffect, useState, createRef } from "react";
import { CButton, CModal, CInput, CForm, CImg } from "@coreui/react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropertImagesList from "../../../assets/images/propertyList-img.jpg";
import addicon from "../../../assets/icons/addicon.svg";
import BackIcon from "../../../assets/icons/back-icon.svg";
import upload from "../../../assets/icons/upload.svg";
const AddCustom = (props) => {
    let history = useHistory();
    const [templateName, setTemplateName] = useState('')
    const [previewUrl, setPreviewUrl] = useState("");
    const [templateUrl, setTemplateUrl] = useState("");
    let onBack = () => {
        history.push("/user/properties");
    };
    const onImageChange = (event) => {
        setTemplateUrl(event.target.files[0]);
        var url = URL.createObjectURL(event.target.files[0])
        setPreviewUrl(url)
    };
    return (
        <>
            <div className="card">
                <div className="create-employee-back-btn align-items-center mb-3">
                    <CButton className="save-btn-white btn" onClick={onBack}>
                        <img src={BackIcon} className="m-0 mr-2" /> Back
                    </CButton>
                </div>
                <div className="card-body">
                    <div className="row justify-content-center rowList-mx">
                        <div className="add_custom">
                            <div>
                                <img src={addicon} className="m-0  add_custom_btn" />
                            </div>
                            <div className="add_custom_text">
                                <h3>
                                    Add Custom <br></br> Template
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row justify-content-center rowList-mx">
                        <div className="add_custom">
                            <div>
                                <img src={addicon} className="m-0  add_custom_btn" />
                            </div>
                            <div className="add_custom_text">
                                <h3>
                                    Add Custom <br></br> Template
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CModal
                show={true}
                centered={true}
                // onClose={() => setIsSocialMedia(false)}
                className="modalContact--body"
            >
                <div className="modal-header">
                    <CImg src={addicon} fluid className="task-logo" />
                    <div
                        style={{
                            alignSelf: "center",
                            fontWeight: "600",
                            marginLeft: "10px",
                        }}
                    >
                        {" "}
                        Add Template
                    </div>
                </div>
                <div className="userCreat--card mb-4">
                    <div className="form-group">
                        <div className="social-media-modal">
                            <div className="employee-field-label titleUser-head">
                                <div className="create-contact-label">
                                    Template Name
                                </div>
                                <CInput
                                    type="text"
                                    value={templateName}
                                    placeholder=""
                                    className="input-field-control"
                                    onChange={(e) => setTemplateName(e.target.value)}
                                />
                            </div>
                            <div class="form-file border-0">
                                <input
                                    type="file"
                                    multiple
                                    class="form-file-input"
                                    id="customFile"
                                    accept="image/*"
                                    onChange={onImageChange}
                                />
                                <span class="upload-fileatach w-100 d-block">
                                    <img src={upload} className="m-0 mr-2" />
                                    Upload
                                </span>
                            </div>
                            <CButton
                                color="primary"
                                className="login-btn px-5"
                            // onClick={handleNotesSubmit}
                            >
                                Submit
                            </CButton>
                        </div>
                    </div>
                </div>
            </CModal>
        </>
    );
};

export default AddCustom;