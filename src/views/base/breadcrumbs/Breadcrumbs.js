import React, { useEffect, useState, createRef } from "react";
import Modal from "../../../components/common/Modal";

import { useDispatch, useSelector } from "react-redux";
import { usersList } from "../../../redux/actions/userAction";
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
const Passenger = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { userslist } = useSelector((state) => state.users);

  useEffect(() => {
    async function getUsers() {
      dispatch(usersList());
    }
    getUsers();
  }, []);
  console.log(userslist);
  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Passenger</h3>
        <div onClick={() => setOpenModal(!openModal)}>
          <i class="fas fa-plus-square"></i>
        </div>
      </div>

      <table className="table w-100">
        <thead>
          <tr>
            <th>User Name </th>
            <th>First Name </th>
            <th>Last Name </th>
            <th>Profile Pic </th>
            <th>Mobile </th>
            <th>Email</th>
            <th>State</th>
            <th>Address </th>
            <th>Pincode</th>
            <th>Wallet </th>
            <th>Member Type</th>
          </tr>
        </thead>
        <tbody>
          {userslist &&
            userslist.map((item) => (
              <tr key={item._id}>
                <td className="">{item.userName}</td>
                <td className="">{item.firstName}</td>
                <td className="">{item.lastName}</td>
                <td className="">{item.dp}</td>
                <td className="">{item.Mobile}</td>
                <td className="">{item.email}</td>
                <td className="">{item.state}</td>
                <td className="">{item.address}</td>
                <td className="">{item.pincode}</td>
                <td className="">{item.walletMoney}</td>
                <td className="">{item.memberType}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal open={openModal} close={() => setOpenModal(!openModal)}>
        <>
          <h3>Passengers</h3>
          <CRow>
            <CCol md="12">
              <CFormGroup>
                <div className="d-flex justify-content-between">
                  <div>
                    <CLabel htmlFor="state_name">User Name </CLabel>
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
                    <CLabel htmlFor="state_name">First Name </CLabel>
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
                    <CLabel htmlFor="state_name">Last Name </CLabel>
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
                    <CLabel htmlFor="state_name"> Profile Pic </CLabel>
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
                    <CLabel htmlFor="state_name">Mobile </CLabel>
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
                    <CLabel htmlFor="state_name"> Email </CLabel>
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
                    <CLabel htmlFor="state_name">State</CLabel>
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
                    <CLabel htmlFor="state_name"> Address </CLabel>
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
                    <CLabel htmlFor="state_name">Pincode</CLabel>
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
                    <CLabel htmlFor="state_name"> Wallet </CLabel>
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
                <CLabel htmlFor="state_name"> Member Type </CLabel>
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

export default Passenger;
