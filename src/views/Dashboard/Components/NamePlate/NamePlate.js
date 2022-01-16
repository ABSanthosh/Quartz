import React from "react";
// import PropTypes from "prop-types";
import "./NamePlate.scss";
import { useAuth } from "../../../../hooks/useAuth";

function NamePlate(props) {
  const { userState } = useAuth();
  console.log(userState);

  return (
    <div className="NamePlateWrapper">
      <p>{userState.user_metadata.preferred_username}</p>
    </div>
  );
}

NamePlate.propTypes = {
  // bla: PropTypes.string,
};

NamePlate.defaultProps = {
  // bla: 'test',
};

export default NamePlate;
