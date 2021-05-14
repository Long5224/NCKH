import React, { useState } from 'react'


function SortName(props) {
    const {onSortName, name } = props;
    const [sort, setSort] = useState({
        sortBy: "name",
        value: 1,
    })
    function handleSortName(){
        const value = {
            sortBy: "name",
            value: -sort.value,
        }
        setSort(value)
        onSortName(value)
    }
    return (
        <span className="title-table"  onClick={handleSortName}>{name}<i className="fas fa-sort"></i></span>
    )
}



export default SortName

