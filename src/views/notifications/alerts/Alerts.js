import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
// import { rgbToHex } from "../../theme/supportTicket/node_modules/@coreui/utils";
// import DocsLink from "../../../reusable/DocsLink";
import Modal from "../../../components/common/Modal";
import {
  CRow,
  CCol,
  CLabel,
  CInput,
  CFormGroup,
  CFormText,
  CButton,
  CToaster,
  CToastBody,
  CToast,
} from "@coreui/react";
const Alert = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Reports</h3>
        <div onClick={() => setOpenModal(!openModal)}>
          <i class="fas fa-plus-square"></i>
        </div>
      </div>
      <table className="table w-100">
        <thead>
          <tr>
            <th> By Date To From </th>
            <th>User Type</th>
            <th>ongoing </th>
            <th>complete </th>
            <th> canceled </th>
            <th>Rating Order</th>

            <th>total km </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
          </tr>
          <tr>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
          </tr>
          <tr>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
            <td>abc</td>
          </tr>
        </tbody>
      </table>
      <Modal open={openModal} close={() => setOpenModal(!openModal)}>
        <>
          <h3>Reports</h3>
          <CRow>
            <CCol md="12">
            
              <CFormGroup>
              <div className="d-flex justify-content-between">
                  <div>
                    <CLabel htmlFor="state_name">By Date To From </CLabel>
                    <CInput
                      type="text"
                      id="state_name"
                      name="state_name"
                      placeholder="Enter State Name.."
                    />
                    <CFormText className="help-block">
                      Please enter your State Name
                    </CFormText>
                  </div>
                  <div>
                    <CLabel htmlFor="state_name">User Type </CLabel>
                    <CInput
                      type="text"
                      id="state_name"
                      name="state_name"
                      placeholder="Enter State Name.."
                    />
                    <CFormText className="help-block">
                      Please enter your State Name
                    </CFormText>
                  </div>
                </div>
              </CFormGroup>
              <CFormGroup>
              <div className="d-flex justify-content-between">
                  <div>
                    <CLabel htmlFor="state_name">ongoing </CLabel>
                    <CInput
                      type="text"
                      id="state_name"
                      name="state_name"
                      placeholder="Enter State Name.."
                    />
                    <CFormText className="help-block">
                      Please enter your State Name
                    </CFormText>
                  </div>
                  <div>
                    <CLabel htmlFor="state_name"> complete  </CLabel>
                    <CInput
                      type="text"
                      id="state_name"
                      name="state_name"
                      placeholder="Enter State Name.."
                    />
                    <CFormText className="help-block">
                      Please enter your State Name
                    </CFormText>
                  </div>
                </div>
              </CFormGroup>
              <CFormGroup>
              <div className="d-flex justify-content-between">
                  <div>
                    <CLabel htmlFor="state_name">canceled  </CLabel>
                    <CInput
                      type="text"
                      id="state_name"
                      name="state_name"
                      placeholder="Enter State Name.."
                    />
                    <CFormText className="help-block">
                      Please enter your State Name
                    </CFormText>
                  </div>
                  <div>
                    <CLabel htmlFor="state_name"> Rating Order  </CLabel>
                    <CInput
                      type="text"
                      id="state_name"
                      name="state_name"
                      placeholder="Enter State Name.."
                    />
                    <CFormText className="help-block">
                      Please enter your State Name
                    </CFormText>
                  </div>
                </div>
              </CFormGroup>
                <CFormGroup>
              <div className="d-flex justify-content-between">
                  <div>
                    <CLabel htmlFor="state_name">total km  </CLabel>
                    <CInput
                      type="text"
                      id="state_name"
                      name="state_name"
                      placeholder="Enter State Name.."
                    />
                    <CFormText className="help-block">
                      Please enter your State Name
                    </CFormText>
                  </div>
                 
                </div>
              </CFormGroup>
              <div style={{ textAlign: "center" }}>
                <CButton color="primary" onClick>
                  Create City
                </CButton>
              </div>
            </CCol>
          </CRow>
        </>
      </Modal>
 
    </>
    
    
  );
};

export default Alert;
