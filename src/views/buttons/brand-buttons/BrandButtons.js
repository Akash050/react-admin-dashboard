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
const Ride = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Driver Rides</h3>
        <div onClick={() => setOpenModal(!openModal)}>
          <i class="fas fa-plus-square"></i>
        </div>
      </div>
      <table className="table w-100">
        <thead>
          <tr>
            <th>Order Id </th>
            <th>Date and Time </th>
            <th>Driver </th>
            <th>Pickup Location </th>
            <th>Drop Location </th>
            <th>Pickup By </th>
            <th>Received By </th>
            <th>AddPaid Amount </th>
            <th> Payment Method</th>
            <th>Rating & Feedback </th>
            <th>Vehicle</th>
            <th>Invoice</th>

            <th>Status</th>

            <th>Commission on ride </th>
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
          <h3>Add City</h3>
          <CRow>
            <CCol md="12">
              <CFormGroup>
                <CLabel htmlFor="city_name">Order Id</CLabel>
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
                <CLabel htmlFor="state_name">Date and Time</CLabel>
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
                <CLabel htmlFor="country">Driver</CLabel>
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
                <CLabel htmlFor="city_charges">Pickup Location</CLabel>
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
                    <CLabel htmlFor="state_name">Pickup By </CLabel>
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
                    <CLabel htmlFor="state_name">Received By </CLabel>
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
                    <CLabel htmlFor="state_name">AddPaid Amount </CLabel>
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
                    <CLabel htmlFor="state_name">Payment Method </CLabel>
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
                    <CLabel htmlFor="state_name">Feedback	 </CLabel>
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
                    <CLabel htmlFor="state_name">Vehicle </CLabel>
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
                    <CLabel htmlFor="state_name">Invoice</CLabel>
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
                    <CLabel htmlFor="state_name">Status </CLabel>
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
                    <CLabel htmlFor="state_name">OTP </CLabel>
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

export default Ride;
