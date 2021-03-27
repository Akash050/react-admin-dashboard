import React, { useEffect, useState, createRef } from "react";
import {CButton} from "@coreui/react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropertImagesList from "../../../assets/images/propertyList-img.jpg";
import BackIcon from "../../../assets/icons/back-icon.svg";
const Template = (props) => {
  let history = useHistory();
  let onBack = () => {
    history.push("/user/properties");
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
            <div className="col-12 col-lg-4 pxLIst--img">
              <div className="properties---columnImg">
                <img className="Img--view-property" src={PropertImagesList} />
                <h4 className="headTitle--propert">Retail</h4>
              </div>
            </div>
            <div className="col-12 col-lg-4 pxLIst--img">
              <div className="properties---columnImg">
                <img className="Img--view-property" src={PropertImagesList} />
                <h4 className="headTitle--propert">Multi-Family</h4>
              </div>
            </div>
            <div className="col-12 col-lg-4 pxLIst--img">
              <div className="properties---columnImg">
                <img className="Img--view-property" src={PropertImagesList} />
                <h4 className="headTitle--propert">Office</h4>
              </div>
            </div>
            <div className="col-12 col-lg-4 pxLIst--img">
              <div className="properties---columnImg">
                <img className="Img--view-property" src={PropertImagesList} />
                <h4 className="headTitle--propert">Industry</h4>
              </div>
            </div>
            <div className="col-12 col-lg-4 pxLIst--img">
              <div className="properties---columnImg">
                <img className="Img--view-property" src={PropertImagesList} />
                <h4 className="headTitle--propert">Land</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
