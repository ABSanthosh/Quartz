import React from "react";
import PropTypes from "prop-types";
import "./PageContent.scss";

function PageContent({ navState }) {
  let list = [];
  for (let i = 0; i < 50; i++) {
    list.push(<div key={`${i}_rre`}>{i}</div>);
  }
  return (
    <div
      className={`PageContentWrapper ${
        navState ? "PageContentWrapper--open" : ""
      }`}
    >
      {list}
      page content
    </div>
  );
}

PageContent.propTypes = {
  navState: PropTypes.bool.isRequired,
};

PageContent.defaultProps = {
  // bla: 'test',
};

export default PageContent;
