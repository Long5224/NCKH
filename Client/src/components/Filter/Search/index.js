import React, {useRef} from "react";
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
  } from "reactstrap";
function Search(props) {
    const {onChange} = props;
    const typingTimeoutRef = useRef(null);
    function handleOnChange(event) {

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        onChange(event.target);
      }, 300);
    }
  return (
    <InputGroup className="">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="ni ni-zoom-split-in" />
        </InputGroupText>
      </InputGroupAddon>
      <Input placeholder="Search" name="searched" type="text" onChange={handleOnChange} />
    </InputGroup>
  );
}

export default Search;
