import React from "react";
import { Input, Label } from "reactstrap";
function DateFrom(props) {
  const { onChange } = props;
  function handleOnChange(event) {
    onChange(event.target);
  }
  return (
    <>
      <Label for="input-From_dateOfBirth" className="mr-1 mb-0">
        Từ:
      </Label>
      <Input
        className="form-control-alternative "
        id="input-From_date"
        type="date"
        name="fromDate"
        onChange={handleOnChange}
      />
    </>
  );
}

export default DateFrom;
