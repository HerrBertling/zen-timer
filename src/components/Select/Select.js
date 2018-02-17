import React from "react";
import "./Select.css";

const Select = ({ times, onChange, value }) => {
  const options = times.map(time => (
    <option key={time} value={time}>
      {time} {time === 1 ? "minute" : "minutes"}
    </option>
  ));
  return (
    <div className="selectWrapper">
      <select onChange={onChange} value={value} className="select">
        {options}
      </select>
    </div>
  );
};

export default Select;
