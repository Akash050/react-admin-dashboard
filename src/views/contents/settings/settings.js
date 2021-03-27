import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import { rgbToHex } from "@coreui/utils";
import DocsLink from "../../../reusable/DocsLink";
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
const Settings = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Settings</h3>
        <div onClick={() => setOpenModal(!openModal)}>
          <i class="fas fa-plus-square"></i>
        </div>
      </div>
      <table className="table w-100">
        <thead>
          <tr>
            <th>Company Name </th>
            <th>Gst No </th>
            <th>Registered Name </th>
            <th>City </th>
            <th> State </th>
            <th>Mobile </th>

            <th>Company Logo</th>

            <th>Panic No</th>
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
            <td>abc</td>
          </tr>
        </tbody>
      </table>
      <Modal open={openModal} close={() => setOpenModal(!openModal)}>
        <>
          <h3>Drivers</h3>
          <CRow>
            <CCol md="12">
            
              <CFormGroup>
              <div className="d-flex justify-content-between">
                  <div>
                    <CLabel htmlFor="state_name">Company Name </CLabel>
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
                    <CLabel htmlFor="state_name">Gst No </CLabel>
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
                    <CLabel htmlFor="state_name">Registered Name </CLabel>
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
                    <CLabel htmlFor="state_name"> City  </CLabel>
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
                    <CLabel htmlFor="state_name">State  </CLabel>
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
                    <CLabel htmlFor="state_name"> Mobile  </CLabel>
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
                    <CLabel htmlFor="state_name">Company Logo  </CLabel>
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
                    <CLabel htmlFor="state_name"> Panic No  </CLabel>
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

export default Settings;
