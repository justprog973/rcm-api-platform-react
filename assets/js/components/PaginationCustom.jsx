import React from 'react';
import {Pagination} from 'antd';

//  <Pagination currentPage={currentPage}  length={customers.length} onPageChange={handleChangePage} />
const PaginationCustom = ({currentPage, itemsPerPage , length, onPageChange}) => {
    return ( 
        <div className="py-3">
            <Pagination defaultCurrent={currentPage} onChange={ (page, pageSize) => onPageChange(page)} pageSize={itemsPerPage} showSizeChanger={false} total={length ? length : 1} />
        </div>
     );
};

PaginationCustom.getData = (items, currentPage, itemsPerPage) => {

    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
};
 
export default PaginationCustom;