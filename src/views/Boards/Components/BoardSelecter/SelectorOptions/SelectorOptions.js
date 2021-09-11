import React from "react";
import "./SelectorOptions.scss";

function SelectorOptions() {
  return (
    <div className="SelectorOptionsWrapper">
      <div className="SelectorOptionsWrapper__item">
        <svg viewBox="0 0 30 30" className="trash">
          <path d="M21,5c0-2.2-1.8-4-4-4h-4c-2.2,0-4,1.8-4,4H2v2h2v22h22V7h2V5H21z M13,3h4c1.104,0,2,0.897,2,2h-8C11,3.897,11.897,3,13,3zM24,27H6V7h18V27z M16,11h-2v12h2V11z M20,11h-2v12h2V11z M12,11h-2v12h2V11z"></path>
        </svg>
        Delete
      </div>
    </div>
  );
}

export default SelectorOptions;
