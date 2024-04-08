import React, { useState, ChangeEvent, useEffect } from "react";
import { Log } from "../interfaces/Log";
import { LazyLog } from "react-lazylog";
import LogTable from "../components/LogTable";

const App: React.FC = () => {
    const [rowLogContent, setRowLogContent] = useState<string>("");
    const [logContent, setLogContent] = useState<Log[]>([]);

    const parseLogContent = (content: string): Log[] => {
        const logs: Log[] = [];
        const lines = content.split("\n");
        lines.forEach((line, index) => {
            const regex = /(\d{2}:\d{2}:\d{2}\.\d{3}) DEBUG --- ([\w.]+)\s+: ([^;]+);([^;]+);(\d+ms);/;
            const match = line.match(regex);
            if (match) {
                const [, timestamp, className, userFunction, query, executionTime] = match;
                logs.push({
                    id: index,
                    timestamp: timestamp,
                    className: className,
                    userFunction: userFunction,
                    query: query,
                    executionTime: executionTime,
                    hasExplain: false,
                });
            }
        });
        return logs;
    };

    const renderLogs = () => {
        return <LazyLog extraLines={1} enableSearch text={rowLogContent || ""} caseInsensitive />;
    };

    const parseFile = async (fileContent: string) => {
        const parsedLogs = parseLogContent(fileContent);
        setLogContent(parsedLogs);
        console.log(parsedLogs);
    };

    const showFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const data = await file.text();
            await parseFile(data);
            setRowLogContent(data);
        }
    };

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
            }}
        >
            <div>
                <h1>Log Information ( {logContent.length} )</h1>
            </div>
            <div>
                <input type="file" accept=".log" onChange={showFile} />

                {logContent ? <LogTable nodes={logContent} /> : ""}

                <div className="log-container" style={{ height: "80vh", width: "100%" }}>
                    {rowLogContent ? renderLogs() : ""}
                </div>
            </div>
        </div>
    );
};

export default App;
