import React, { useMemo } from "react";
import classnames from "classnames";

const PageItem = ({ label, value, onClick, active }) => {
    return (
        <li
            onClick={() => {
                onClick(value);
            }}
            className={classnames("page-item", {
                active: !!active,
            })}
        >
            <a className='page-link' href='#'>
                {label}
            </a>
        </li>
    );
};

const Pagination = ({ page, pageSize, onChange, totalRecord = 22 }) => {
    const handleChangeSelect = (e) => {
        onChange(page, e.target.value);
    };

    const handleChangePage = (value) => {
        onChange(value, pageSize);
    };

    const totalPage = useMemo(() => {
        return Math.ceil(totalRecord / +pageSize);
    }, [page, pageSize]);

    console.log(pageSize, '??')

    return (
        <div>
            <nav aria-label='Page navigation example'>
                <ul className='pagination'>
                    <PageItem
                        label='Previous'
                        value={+page > 1 ? +page - 1 : page}
                        onClick={handleChangePage}
                    />

                    <PageItem
                        label={1}
                        value={1}
                        onClick={handleChangePage}
                        active={Number(page) === 1}
                    />

                    <PageItem
                        label={2}
                        value={2}
                        onClick={handleChangePage}
                        active={Number(page) === 2}
                    />

                    <PageItem
                        label={3}
                        value={3}
                        onClick={handleChangePage}
                        active={Number(page) === 3}
                    />

                    <PageItem
                        label='Next'
                        value={page + 1}
                        onClick={handleChangePage}
                    />

                    <li className='page-item ms-2'>
                        <select
                            value={String(pageSize)}
                            onChange={handleChangeSelect}
                            className='form-select'
                            aria-label='Default select example'
                        >
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                        </select>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
