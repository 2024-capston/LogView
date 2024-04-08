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
                EXECUTION_TIME: (array) => array.sort((a, b) => a.executionTime.localeCompare(b.executionTime)),
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
            renderCell: (item: Log) => (item.hasExplain ? "" : <button>Explain</button>),
            resize: true,
            sort: { sortKey: "EXPLAIN" },
        },
        {
            label: "Show",
            renderCell: (item: Log) => (item.hasExplain ? <button>Show</button> : ""),
            resize: true,
            sort: { sortKey: "SHOW" },
        },
    ];

    return (
        <>
            <label htmlFor="search">
                Search :
                <input id="search" type="text" value={search} onChange={handleSearch} />
            </label>
            <br />
            <CompactTable columns={COLUMNS} data={data} theme={theme} pagination={pagination} sort={sort} />

            <br />
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <span>
                    {pagination.state.getPages(data.nodes).map((_: any, index: number) => (
                        <button
                            key={index}
                            type="button"
                            style={{
                                fontWeight: pagination.state.page === index ? "bold" : "normal",
                            }}
                            onClick={() => pagination.fns.onSetPage(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </span>
            </div>
        </>
    );
};

export default LogTable;
