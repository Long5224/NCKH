import React from 'react'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate'      
function Pagination(props) {
    const {pageCount, onPageChange} = props

    const changePage = ({selected}) => {
        if(onPageChange){
            onPageChange(selected)
        }
    }
 
    return (
        
       <ReactPaginate
        marginPagesDisplayed={2}
        pageRangeDisplayed={4}
        initialPage={0}
        previousLabel={<i className="fas fa-angle-left" />}
        nextLabel={<i className="fas fa-angle-right" />}
        breakLabel={"..."}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination justify-content-end mb-0"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        disabledClassName={"disable"}
        activeClassName={"active"}
       />
       
    )
}

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func
}

Pagination.defaultProps = {
   
}

export default Pagination

