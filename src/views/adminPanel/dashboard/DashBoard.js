import React, { lazy, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import ApexChart from "react-apexcharts";
import Usergroup from "../../../assets/icons/user-group.svg";
import CompanySale from "../../../assets/icons/sale-compny.svg";
import EditIcon from "../../../assets/icons/edit-icon.svg";
import Team1 from "../../../assets/images/team1.jpg";
import Team2 from "../../../assets/images/team2.jpg";
import Team3 from "../../../assets/images/team3.jpg";
import Team4 from "../../../assets/images/team4.jpg";
import Team5 from "../../../assets/images/team5.jpg";
import Team6 from "../../../assets/images/team6.jpg";
import Team7 from "../../../assets/images/team7.jpg";
import Circle1 from "../../../assets/images/green-circle.png";
import Circle2 from "../../../assets/images/yellow-circle.png";


import * as employeeActionTypes from "../../../redux/actionsType/employeeActionType";


const areaOptions = {
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  title: {
    text: "Profit Margin",
    align: "left",
  },
  colors: ["#F4D70D", "#38C0FE"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 1,
    curve: "smooth",
  },
  xaxis: {
    categories: ["Jan", "Feb", "March", "April", "May", "June"],
  },
  yaxis: {
    categories: ["0", "5", "10", "15", "20"],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

let areaSeries = [
  {
    name: "Budget",
    data: [900, 400, 1100, 400, 1100, 400],
  },
  {
    name: "Sales",
    data: [300, 1100, 600, 1700, 900, 1400],
  },
];

const lineOptions = {
  chart: {
    height: 350,
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#000",
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ["#F4D70D", "#27AE60"],
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 1,
  },
  stroke: {
    width: 1,
    curve: "smooth",
  },
  title: {
    text: "Amount of Revenue - Monthly",
    align: "left",
  },
  // grid: {
  //   borderColor: '#e7e7e7',
  //   row: {
  //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
  //     opacity: 0.5
  //   },
  // },
  markers: {
    size: 1,
  },
  xaxis: {
    categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
  },
  // yaxis: {
  //   title: {
  //     text: 'Temperature'
  //   },
  //   min: 5,
  //   max: 40
  // },
  // legend: {
  //   position: 'top',
  //   horizontalAlign: 'right',
  //   floating: true,
  //   offsetY: -25,
  //   offsetX: -5
  // }
};

let lineSeries = [
  {
    name: "Total Sales",
    data: [74, 46, 76, 50, 75, 50],
  },
  {
    name: "Total Revenue",
    data: [25, 55, 49, 80, 50, 90],
  },
];




const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ locationKeys, setLocationKeys ] = useState([])

  useEffect(() => {
    window.onpopstate = e => {
      if(localStorage.getItem("role") == "SUPER_ADMIN_AS_COMPANY_ADMIN"){
        localStorage.setItem("role", "ROLE_SUPER_ADMIN");
        dispatch({
          type: employeeActionTypes.RESET_STATE,
        });
        history.push("/superadmin/companies");
        console.log("backk -->",localStorage.getItem("role") )
      }
      //e.preventDefault()
    };
  }, [ ])

  let goToOrignal = () => {
    localStorage.setItem("role", "ROLE_SUPER_ADMIN");
    dispatch({
      type: employeeActionTypes.RESET_STATE,
    });
    history.push("/superadmin/companies");
  }
  return (
    <>
      {localStorage.getItem("role") == "SUPER_ADMIN_AS_COMPANY_ADMIN" ?
        <div onClick={goToOrignal} className="snackbar">Go Back To Super Admin Panel</div>
        : null}
      <div className="dashboard-wrapper">
        <div className="containerwrap---page">
          <div className="row mx-0">
            <div className="col-12 col-md-2 columdash--grid">
              <div className="card card-border overflow-hidden cardrow-card">
                <div className="card-body">
                  <div className="group-user">
                    <div className="group--icon">
                      <img src={Usergroup} />
                    </div>
                    <h3 className="title-user">Number of Users</h3>
                    <span className="numbUser">45,245</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 columdash--grid">
              <div className="card card-border overflow-hidden cardrow-card">
                <div className="card-body">
                  <ApexChart
                    options={lineOptions}
                    series={lineSeries}
                    type="line"
                    className="mothly-chart"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 columdash--grid">
              <div className="card card-border overflow-hidden cardrow-card">
                <div className="card-body">
                  <ApexChart
                    options={areaOptions}
                    series={areaSeries}
                    type="area"
                    className="profit-margin"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-2 columdash--grid">
              <div className="card card-border overflow-hidden cardrow-card">
                <div className="card-header bg-white border-0 px-2">
                  <h3 className="title-suport">350</h3>
                  <h6 className="support-head">Support Requests</h6>
                </div>
                <div className="card-body pt-0 px-2">
                  <div className="supportreq--content">
                    <p className="shortnum---tt">Total number of support requests that come in </p>
                  </div>
                </div>
                <div className="footer border-0 footerbtm-bg py-2">
                  <div className="supportLink-item">
                    <ul className="linkwork--txt mb-0">
                      <li><span className="firstt-0">10</span><span className="secondtt-0">Open</span></li>
                      <li><span className="firstt-0">5</span><span className="secondtt-0">Running</span></li>
                      <li><span className="firstt-0">3</span><span className="secondtt-0">Solved</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3 columdash--grid">
              <div className="card card-border overflow-hidden cardrow-card overflow-hidden">
                <div className="card-header bg-white border-0 px-2">
                  <h3 className="title-ovr">
                    <span className="iconsale">
                      <img src={CompanySale} />
                    </span>
                    Company Sales Funnel Overview
                  </h3>
                </div>
                <div className="card-body pt-0">
                  <div className="saleover--items">
                    <ul className="salcomp-list">
                      <li className="List--of-cont">
                        <span className="headLst-name">None</span>
                        <span className="overnum1">22</span>
                      </li>
                      <li className="List--of-cont">
                        <span className="headLst-name">No Connection Made</span>
                        <span className="overnum1">22</span>
                      </li>
                      <li className="List--of-cont">
                        <span className="headLst-name">Connection Made</span>
                        <span className="overnum1">22</span>
                      </li>
                      <li className="List--of-cont">
                        <span className="headLst-name">
                          Building Relationship
                        </span>
                        <span className="overnum1">22</span>
                      </li>
                      <li className="List--of-cont">
                        <span className="headLst-name">
                          Listing Opportunity
                        </span>
                        <span className="overnum1">22</span>
                      </li>
                      <li className="List--of-cont">
                        <span className="headLst-name">Listing</span>
                        <span className="overnum1">22</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3 columdash--grid">
              <div className="card card-border overflow-hidden cardrow-card">
                <div className="card-header bg-white border-0 px-3">
                  <h3 className="team-title d-flex justify-content-between align-items-center">
                    Teams{" "}
                    <span className="editicon pull-right">
                      <img src={EditIcon} />
                    </span>
                  </h3>
                </div>
                <div className="card-body pt-0">
                  <div className="team-row">
                    <h3 className="teamtitle-name">Support Team</h3>
                    <ul className="teamImg">
                      <li className="teampr-IMg">
                        <img src={Team1} />
                      </li>
                      <li className="teampr-IMg">
                        <img src={Team2} />
                      </li>
                      <li className="teampr-IMg">
                        <img src={Team3} />
                      </li>
                    </ul>
                  </div>
                  <div className="team-row">
                    <h3 className="teamtitle-name">Sales Team</h3>
                    <ul className="teamImg">
                      <li className="teampr-IMg">
                        <img src={Team4} />
                      </li>
                      <li className="teampr-IMg">
                        <img src={Team5} />
                      </li>
                    </ul>
                  </div>
                  <div className="team-row">
                    <h3 className="teamtitle-name">Software Engineers</h3>
                    <ul className="teamImg">
                      <li className="teampr-IMg">
                        <img src={Team6} />
                      </li>
                      <li className="teampr-IMg">
                        <img src={Team7} />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-2 columdash--grid">
              <div className="card card-border overflow-hidden cardrow-card">
                <div className="card-header bg-white border-0 px-3">
                  <h3 className="title-16">
                    Conversion Rate Of 7 Day Free Trial
                  </h3>
                </div>
                <div className="card-body">
                  <div className="coversation--rate">
                    <img src={Circle1} />
                    <h3 className="title-16 my-3">Cancellation Rate</h3>
                    <img src={Circle2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-2 columdash--grid">
              <div className="card card-border overflow-hidden cardrow-card">
                <div className="card-header bg-white border-0 px-3">
                  <h3 className="title-16">Top Support Ticket Reasons</h3>
                </div>
                <div className="card-body pt-0 px-2">
                  <div className="support-ticket">
                    <ul class="Listdash0">
                      <li class="itemsview--dash"><span class="headview-lin">1. Bug on XYZ Page</span></li>
                      <li class="itemsview--dash"><span class="headview-lin">2. Tachnical Problem</span></li>
                      <li class="itemsview--dash"><span class="headview-lin">3. Slow Processing</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-2 columdash--grid">
              <div className="card card-border overflow-hidden cardrow-card">
                <div className="card-header bg-white border-0 px-2">
                  <h3 className="title-16">Users Plans Overview </h3>
                </div>
                <div className="card-body pt-0 px-2">
                  <ul class="Listdash0">
                    <li class="itemsview--dash"><span class="headview-lin">Month to Month</span><span className="countpnt--plans">45</span></li>
                    <li class="itemsview--dash"><span class="headview-lin">Annual</span><span className="countpnt--plans">75</span></li>
                    <li class="itemsview--dash"><span class="headview-lin">7 Days Free Trail</span><span className="countpnt--plans">175</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
