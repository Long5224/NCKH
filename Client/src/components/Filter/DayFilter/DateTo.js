import React from "react";
import { Input, Label } from "reactstrap";
function DateTo(props) {
  const { onChange } = props;
  function handleOnChange(event) {
    onChange(event.target);
  }
  return (
    <>
      <Label for="input-From_dateOfBirth" className="mr-1 mb-0">
        Đến:
      </Label>
      <Input
        className="form-control-alternative "
        id="input-To_date"
        type="date"
        name="toDate"
        onChange={handleOnChange}
      />
    </>
  );
}

export default DateTo;
