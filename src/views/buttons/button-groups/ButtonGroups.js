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
const Support = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Support</h3>
        <div onClick={() => setOpenModal(!openModal)}>
          <i class="fas fa-plus-square"></i>
        </div>
      </div>
      <table className="table w-100">
        <thead>
          <tr>
            <th>Ticket Id </th>
            <th>Ride Id </th>
            <th>User Type </th>
            <th>User Name </th>
            <th>Date & Time</th>
            <th>Support By </th>
            <th>Chat History </th>
            <th>PickUp Location </th>
            <th> Drop Location</th>
            <th>Mobile </th>
            <th>Pickup by</th>
            <th>Received By</th>

            <th>Ticket Status</th>

            <th>Chat/Support Window </th>
            <th>payment status </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
          </tr>
          <tr>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
          </tr>
          <tr>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
            <td className="">Asgdghdh</td>
          </tr>
        </tbody>
      </table>
      <Modal open={openModal} close={() => setOpenModal(!openModal)}>
        <>
          <h3>Support</h3>
          <CRow>
            <CCol md="12">
              <CFormGroup>
                <CLabel htmlFor="city_name">Ticket Id</CLabel>
                <CInput
                  type="text"
                  id="city_name"
                  name="city_name"
                  placeholder="Enter CityName.."
                 />
                <CFormText className="help-block">
                  Please enter your City
                </CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="state_name">Ride Id</CLabel>
                <CInput
                  type="text"
                  id="state_name"
                  name="state_name"
                  placeholder="Enter State Name.."
                />
                <CFormText className="help-block">
                  Please enter your State Name
                </CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="country">User Type</CLabel>
                <CInput
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Enter Country.."
                />
                <CFormText className="help-block">
                  Please enter your Country
                </CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="city_charges">User Name</CLabel>
                <CInput
                  type="text"
                  id="city_charges"
                  name="city_charges"
                  placeholder="Enter City Charges.."
                />
                <CFormText className="help-block">
                  Please enter your City Charges
                </CFormText>
              </CFormGroup>
              <CFormGroup>
              <div className="d-flex justify-content-between">
                  <div>
                    <CLabel htmlFor="state_name">Date & Time </CLabel>
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
                    <CLabel htmlFor="state_name">Support By </CLabel>
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
                    <CLabel htmlFor="state_name">Chat History </CLabel>
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
                    <CLabel htmlFor="state_name">PickUp Location </CLabel>
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
                    <CLabel htmlFor="state_name">Drop Location </CLabel>
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
                    <CLabel htmlFor="state_name">Mobile	 </CLabel>
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
                    <CLabel htmlFor="state_name">Pickup by </CLabel>
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
                    <CLabel htmlFor="state_name">Received By</CLabel>
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
                    <CLabel htmlFor="state_name">Ticket Status </CLabel>
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
                    <CLabel htmlFor="state_name">Chat/Support Window  </CLabel>
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
              <div>
                    <CLabel htmlFor="state_name">payment status   </CLabel>
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

export default Support;
