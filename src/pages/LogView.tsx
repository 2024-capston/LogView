import React, { useState, ChangeEvent } from "react";
import { Log } from "../interfaces/Log";
import { LazyLog } from "react-lazylog";
import LogTable from "../components/LogTable";

const LogView: React.FC = () => {
    const [rawLogContent, setRawLogContent] = useState<string>("");
    const [logContent, setLogContent] = useState<Log[]>([]);

    const [showRawLogContent, setShowRawLogContent] = useState(false);

    const toggleShowRawLogContent = () => {
        setShowRawLogContent(!showRawLogContent);
    };

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
        return <LazyLog extraLines={1} enableSearch text={rawLogContent || ""} caseInsensitive />;
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
            setRawLogContent(data);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-blue-500 text-white py-4 px-8">
                <div className="text-2xl font-bold">Log Information</div>
                <div>( {logContent.length} results found )</div>
            </div>
            <div className="p-8">
                <input
                    className="block mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    accept=".log"
                    onChange={showFile}
                />

                {logContent.length > 0 && (
                    <div>
                        <LogTable nodes={logContent} />
                        <button
                            onClick={toggleShowRawLogContent}
                            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            {showRawLogContent ? "Hide Raw Logs" : "Show Raw Logs"}
                        </button>
                        {showRawLogContent && (
                            <div className="bg-white shadow-md rounded-lg p-4" style={{ height: "80vh" }}>
                                {rawLogContent && renderLogs()}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogView;
