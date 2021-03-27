import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
// import { rgbToHex } from "../../theme/supportTicket/node_modules/@coreui/utils";
// import DocsLink from "../../../reusable/DocsLink";
import { useDispatch, useSelector } from "react-redux";
import { rideList } from "../../../redux/actions/rideAction";

const Ride = () => {
  const dispatch = useDispatch();
  const { ridelist } = useSelector((state) => state.rides);
  useEffect(() => {
    async function getRides() {
      dispatch(rideList());
    }
    getRides();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>User Rides</h3>
        <i class="fas fa-plus-square"></i>
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
            <th>Feedback </th>
            <th>Vehicle</th>
            <th>Invoice</th>

            <th>Status</th>

            <th>OTP </th>
          </tr>
        </thead>
        <tbody>
          {ridelist &&
            ridelist.map((item) => (
              <tr key={item._id}>
                <td className="">{item._id}</td>
                <td className="">{item.createdAt}</td>
                <td className="">{item.pickupName}</td>
                <td className="">{item.pickUpLocation}</td>
                <td className="">{item.dropLocation}</td>
                <td className="">{item.pickupName}</td>
                <td className="">{item.receivrName}</td>
                <td className="">{item._id}</td>
                <td className="">{item.paymentType}</td>
                <td className="">{item.rating}</td>
                <td className="">{item.vehicalSelected}</td>
                <td className="">{item._id}</td>
                <td className="">{item.status}</td>
                <td className="">{item.otp}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Ride;
