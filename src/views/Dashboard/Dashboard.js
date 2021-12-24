import React from "react";
// import PropTypes from 'prop-types';
import "./Dashboard.scss";
import DashboardHeader from "./Components/DashboardHeader/DashboardHeader";

function Dashboard(props) {
  return (
    <div className="DashboardWrapper">
      <DashboardHeader />
    </div>
  );
}

Dashboard.propTypes = {
  // bla: PropTypes.string,
};

Dashboard.defaultProps = {
  // bla: 'test',
};

export default Dashboard;
