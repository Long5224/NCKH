import React from "react";
import { Input } from "reactstrap";
function FilterForScore(props) {
    const {onChange} = props;
  function handleOnChange(event) {
    onChange(event.target);
  }
  return (
    <Input
      type="select"
      name="scoreFilter"
      id="exampleSelect"
      className="form-control-alternative"
      onChange={handleOnChange}
    >
      <option value="all">Tất cả học phần đã điểm</option>
      <option value="đạt">Các học phận có đánh giá "Đạt"</option>
      <option value="chưa đạt">Các học phận có đánh giá "Chưa đạt"</option>
    </Input>
  );
}

export default FilterForScore;
