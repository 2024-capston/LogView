import React from "react";
import { Log } from "../interfaces/Log";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useSort } from "@table-library/react-table-library/sort";

interface LogTableProps {
    nodes: Log[];
}

const LogTable: React.FC<LogTableProps> = ({ nodes }) => {
    let data = { nodes };
    const theme = useTheme([
        getTheme(),
        {
            HeaderRow: `
            background-color: #FFFFFF;
          `,
            Row: `
            &:nth-of-type(odd) {
              background-color: #F8F8F8;
            }
    
            &:nth-of-type(even) {
              background-color: #FFFFFF;
            }
          `,
        },
    ]);

    const [search, setSearch] = React.useState("");

    const handleSearch = (event: any) => {
        setSearch(event.target.value);
    };

    const sort = useSort(
        data,
        {},
        {
            sortFns: {
                TIME_STAMP: (array) => array.sort((a, b) => a.timestamp.localeCompare(b.timestamp)),
                CLASS_NAME: (array) => array.sort((a, b) => a.className.localeCompare(b.className)),
                USER_FUNCTION: (array) => array.sort((a, b) => a.className.localeCompare(b.className)),
                QUERY: (array) => array.sort((a, b) => a.className.localeCompare(b.className)),
                EXECUTION_TIME: (array) =>
                    array.sort((a, b) => {
                        const numA = parseInt(a.executionTime);
                        const numB = parseInt(b.executionTime);
                        return numA - numB;
                    }),
                EXPLAIN: (array) => array.sort((a, b) => a.hasExplain.localeCompare(b.hasExplain)),
                SHOW: (array) => array.sort((a, b) => a.hasExplain.localeCompare(b.hasExplain)),
            },
        }
    );

    const pagination = usePagination<Log>(data, {
        state: {
            page: 0,
            size: 10,
        },
    });

    data = {
        nodes: data.nodes.filter((item) => {
            return (
                item.className.toLowerCase().includes(search.toLowerCase()) ||
                item.executionTime.toLowerCase().includes(search.toLowerCase()) ||
                item.id.toString().includes(search.toLowerCase()) ||
                item.query.toLowerCase().includes(search.toLowerCase()) ||
                item.timestamp.toLowerCase().includes(search.toLowerCase()) ||
                item.userFunction.toLowerCase().includes(search.toLowerCase())
            );
        }),
    };

    const COLUMNS = [
        {
            label: "Timestamp",
            renderCell: (item: Log) => item.timestamp,
            resize: true,
            sort: { sortKey: "TIME_STAMP" },
        },
        {
            label: "ClassName",
            renderCell: (item: Log) => item.className,
            resize: true,
            sort: { sortKey: "CLASS_NAME" },
        },
        {
            label: "UserFunction",
            renderCell: (item: Log) => item.userFunction,
            resize: true,
            sort: { sortKey: "USER_FUNCTION" },
        },
        {
            label: "Query",
            renderCell: (item: Log) => item.query,
            resize: true,
            sort: { sortKey: "QUERY" },
        },
        {
            label: "ExecutionTime",
            renderCell: (item: Log) => item.executionTime,
            resize: true,
            sort: { sortKey: "EXECUTION_TIME" },
        },
        {
            label: "Explain",
            renderCell: (item: Log) =>
                item.hasExplain ? (
                    ""
                ) : (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full">
                        Explain
                    </button>
                ),
            resize: true,
        },
        {
            label: "Show",
            renderCell: (item: Log) => (item.hasExplain ? <button>Show</button> : ""),
            resize: true,
        },
    ];

    return (
        <div className="w-full bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-end mb-4">
                <label htmlFor="search" className="block mr-10 font-bold text-gray-700">
                    Search : &nbsp;
                    <input
                        id="search"
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        className="border border-gray-300 rounded px-2 py-1 mt-1 focus:outline-none focus:border-blue-500"
                    />
                </label>
            </div>

            <CompactTable columns={COLUMNS} data={data} theme={theme} pagination={pagination} sort={sort} />

            <div className="flex justify-center py-4">
                <span>
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 mx-1 rounded-full`}
                        onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}
                        disabled={pagination.state.page === 0}
                    >
                        Previous
                    </button>

                    {pagination.state.getPages(data.nodes).map((_: any, index: number) => (
                        <button
                            key={index}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 mx-1 rounded-full ${
                                pagination.state.page === index ? "bg-blue-700" : ""
                            }`}
                            onClick={() => pagination.fns.onSetPage(index)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 mx-1 rounded-full`}
                        onClick={() => {
                            pagination.fns.onSetPage(pagination.state.page + 1);
                        }}
                        disabled={pagination.state.page === Math.floor(data.nodes.length / 10)}
                    >
                        Next
                    </button>
                </span>
            </div>
        </div>
    );
};

export default LogTable;
