import { useState } from "react";

const usePagination = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const handleChange = (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
    };

    return {
        page,
        pageSize,
        onChange: handleChange,
    };
};

export default usePagination;
