import React, {useEffect, useState} from "react";
import { Input } from "reactstrap";
import {PATH} from '../../../constansts/API'
import LocalService from '../../../apis/local.service'

function FilterDropDown(props) {
  const { dataFilter, onChange, role, currentSelected } = props;
  const [evaluations, setEvaluations] = useState([]);
  useEffect(() => {
    async function getData() {
      const responseEvaluation = await LocalService.getChildrenById(
        PATH.API_STUDENTS,
        PATH.STUDENT_ID,
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
      {role === "student" ? <option value="all">Tất cả</option> : ""}
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
