import React, { useState } from 'react'


function SortName(props) {
    const {onSortNumber, name } = props;
    const [sort, setSort] = useState({
        sortBy: "number",
        value: -1,
    })
    function handleSortNumber(){
        const value = {
            sortBy: "number",
            value: -sort.value,
        }
        setSort(value)
        onSortNumber(value)
    }
    return (
        <span className="title-table" onClick={handleSortNumber}>{name}<i className="fas fa-sort"></i></span>
    )
}



export default SortName

