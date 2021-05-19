import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { PATH } from "../../../constansts/API";
import LocalService from "../../../apis/local.service";
import AuthService from "../../../apis/auth.service";
function FilterForScore(props) {
    const {onChange} = props;
  function handleOnChange(event) {
    onChange(event.target);
  }
  return (
    <Input
      type="select"
      name="select"
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
