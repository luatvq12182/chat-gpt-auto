import { useState, useRef } from "react";
import readXlsxFile from "read-excel-file";
import { ToastContainer, toast } from "react-toastify";

import showdown from "showdown";
const converter = new showdown.Converter();

import httpClient from "./services/httpClient";
import Spinner from "./components/Spinner";
import CopyButton from "./components/CopyButton";
// import Pagination from "./components/Pagination";
// import usePagination from "./hooks/usePagination";

const App = () => {
    const progressId = useRef(null);
    const ipFile = useRef(null);
    const timeId = useRef(null);
    const [isHandling, setIsHandling] = useState(false);
    const [dataTable, setDataTable] = useState([]);

    // const { page, pageSize, onChange } = usePagination();

    const notify = () => toast("Copied!");

    const handleUpload = () => {
        const files = ipFile.current.files;

        if (files.length === 0) {
            window.alert("Chưa chọn file!");
            return;
        }

        setIsHandling(true);

        readXlsxFile(files[0]).then((rows) => {
            httpClient
                .post("/api/keywords", {
                    keywords: rows.flat(Infinity),
                })
                .then(({ data, id }) => {
                    setDataTable(data);
                    progressId.current = id;

                    performCheck();
                });
        });
    };

    const handleClickCopy = (selector) => () => {
        const range = document.createRange();
        range.selectNode(document.querySelector(selector));

        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        document.execCommand("copy");

        window.getSelection().removeAllRanges();
        notify();
    };

    const performCheck = () => {
        timeId.current = setInterval(() => {
            httpClient
                .get("/api/getProgress/" + progressId.current)
                .then((data) => {
                    setDataTable(data);

                    if (data.every((item) => item.isDone)) {
                        clearInterval(timeId.current);
                        setIsHandling(false);

                        setTimeout(() => {
                            clearData();
                        }, 10000);
                    }
                });
        }, 5000);
    };

    const clearData = () => {
        httpClient
            .get("/api/stopProgress/" + progressId.current)
            .then((data) => {
                console.log("Is clear: ", data);
            });
    };

    return (
        <div className='container mt-2'>
            <ToastContainer />

            <div className='row'>
                <div className='col-9'>
                    <input ref={ipFile} className='form-control' type='file' />
                </div>
                <div className='col-3'>
                    <button
                        disabled={isHandling}
                        onClick={handleUpload}
                        className='btn btn-primary'
                    >
                        Upload
                    </button>
                </div>

                <div className='col-12 mt-2'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th
                                    style={{
                                        width: "20%",
                                    }}
                                >
                                    Keyword
                                </th>
                                <th>Content</th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataTable.map(({ keyword, content }, index) => {
                                return (
                                    <tr key={keyword}>
                                        <td>{+index + 1}</td>
                                        <td>{keyword}</td>
                                        <td className='position-relative'>
                                            <div className='mb-4'>
                                                <CopyButton
                                                    onClick={handleClickCopy(
                                                        `#content-${index}`
                                                    )}
                                                />
                                            </div>

                                            {content ? (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: converter.makeHtml(
                                                            content
                                                        ),
                                                    }}
                                                    id={`content-${index}`}
                                                />
                                            ) : (
                                                <Spinner />
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* <div className='d-flex justify-content-center'>
                        <Pagination
                            page={page}
                            pageSize={pageSize}
                            onChange={onChange}
                            totalRecord={dataTable.length}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default App;
