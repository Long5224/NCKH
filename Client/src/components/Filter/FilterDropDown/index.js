import React, {useEffect, useState} from "react";
import { Input } from "reactstrap";
import {PATH} from '../../../constansts/API'
import LocalService from '../../../apis/local.service'
import AuthService from  "../../../apis/auth.service"
function FilterDropDown(props) {
  const {  onChange, page, currentSelected } = props;
  const [evaluations, setEvaluations] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const id = currentUser.username.split('-')[1]
  useEffect(() => {
    async function getData() {
      const responseEvaluation = await LocalService.getChildrenById(
        PATH.API_STUDENTS,
        id,
        PATH.API_EVALUATION
      );
      setEvaluations(responseEvaluation.data)
      console.log(responseEvaluation);
    }
    getData();
  }, []);

  function handleOnChange(event) {
    onChange(event.target);
  }
  return (
    <Input
      type="select"
      name="select"
      id="exampleSelect"
      value={currentSelected}
      className="form-control-alternative"
      onChange={handleOnChange}
    >
      {page === "score" ? <option value="all">Tất cả</option> : ""}
      {evaluations
      .map((prop, key) => {
        return (
          <option key={key} value={prop.semester.id}>
            Kì {key + 1}
          </option>
        );
      })}
    </Input>
  );
}

export default FilterDropDown;
