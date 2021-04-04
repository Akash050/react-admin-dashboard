import React from 'react'
import { useHistory } from "react-router";
import ApexChart from "react-apexcharts";

const areaOptions = {
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  title: {
    text: 'Profit Margin',
    align: 'left'
  },
  colors: ['#F4D70D', '#38C0FE'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 1,
    curve: 'smooth'
  },
  xaxis: {
    categories: ["Jan", "Feb", "March", "April", "May", "June"]
  },
  yaxis: {
    categories: ["0", "5", "10", "15", "20"]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },

}

let areaSeries = [{
  name: 'Budget',
  data: [900, 400, 1100, 400, 1100, 400]
}, {
  name: 'Sales',
  data: [300, 1100, 600, 1700, 900, 1400]
}]

const lineOptions = {
  chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    }
  },
  colors: ['#F4D70D', '#27AE60'],
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 1,
  },
  stroke: {
    width: 1,
    curve: 'smooth'
  },
  title: {
    text: 'Amount of Revenue - Monthly',
    align: 'left'
  },
  // grid: {
  //   borderColor: '#e7e7e7',
  //   row: {
  //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
  //     opacity: 0.5
  //   },
  // },
  markers: {
    size: 1
  },
  xaxis: {
    categories: ['2016', '2017', '2018', '2019', '2020', '2021'],

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
}

let lineSeries = [
  {
    name: "Total Sales",
    data: [74, 46, 76, 50, 75, 50]
  },
  {
    name: "Total Revenue",
    data: [25, 55, 49, 80, 50, 90]
  }
]

var radialoptions = {
  chart: {
    height: '100%',
    type: 'radialBar',
  },
  labels: ['Progress'],
}
let radialSeries = [70]

const Budget = () => {
  const history = useHistory();
  let goToOrignal = () => {
    localStorage.setItem("role", "ROLE_SUPER_ADMIN");
    history.push("/superadmin/companies");
  }
  return (
    <>
      {localStorage.getItem("role") == "SUPER_ADMIN_AS_COMPANY_ADMIN" ?
        <div onClick={goToOrignal} className="snackbar">Go back to Super Admin Panel</div>
        : null}
      <div className="dashboard-wrapper">
        <div className="containerwrap---page">
          <div className="row mx-0">
            <div className="col-12 col-md-8">
              <div className="row">
                <div className="col-12 col-md-6 columdash--grid">
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
                <div className="col-12 col-md-6 columdash--grid">
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
              </div>
              <div className="row">
                <div className="col-12 col-md-3 columdash--grid">
                  <div className="card card-border overflow-hidden cardrow-card">
                    <div class="card-header bg-white border-0 px-2">
                      <h3 class="title-ovr">
                        Average Contract Rate</h3>
                    </div>
                    <div className="card-body">
                      <div className="bugetbody">
                        <h3 className="buget--total">$156285</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-3 columdash--grid">
                  <div className="card card-border overflow-hidden cardrow-card">
                    <div class="card-header bg-white border-0 px-2">
                      <h3 class="title-ovr">
                        Total Revenue</h3>
                    </div>
                    <div className="card-body">
                      <div className="bugetbody">
                        <h3 className="buget--total">$156285</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-3 columdash--grid">
                  <div className="card card-border overflow-hidden cardrow-card">
                    <div class="card-header bg-white border-0 px-2">
                      <h3 class="title-ovr">
                        Total Budget</h3>
                    </div>
                    <div className="card-body">
                      <div className="bugetbody">
                        <h3 className="buget--total">$156285</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-3 columdash--grid">
                  <div className="card card-border overflow-hidden cardrow-card">
                    <div class="card-header bg-white border-0 px-2">
                      <h3 class="title-ovr">
                        Total Budget</h3>
                    </div>
                    <div className="card-body">
                      <div className="bugetbody">
                        <h3 className="buget--total">$156285</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 columdash--grid">
              <div className="card card-border overflow-hidden cardrow-card">
                <div className="card-header bg-white border-0 px-2">
                  <h3 className="title-suport">350</h3>
                </div>
                <div className="card-body pt-0 px-2">
                  <div className="supportreq--content">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Budget
