import React from "react";
import { Input } from "reactstrap";
function FilterForStatistics(props) {
  const {data , onChange} = props;

  function handleOnChange(event) {
    onChange(event.target.value);
  }
  return (
    <Input
      type="select"
      name="select"
      id="exampleSelect"
      className="form-control-alternative"
      onChange={handleOnChange}
    >
      {data
      .map((prop, key) => {
        return (
          <option key={key} value={prop.semesterId}>
            {prop.semester}
          </option>
        );
      })}
    </Input>
  );
}

export default FilterForStatistics;
