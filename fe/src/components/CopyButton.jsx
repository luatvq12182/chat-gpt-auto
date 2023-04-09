import React from "react";

const CopyButton = ({ onClick }) => {
    return (
        <button
            type='button'
            className='btn-clipboard'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            title='Copy'
            onClick={onClick}
        >
            Copy
        </button>
    );
};

export default CopyButton;
