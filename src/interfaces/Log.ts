export interface Log {
    id: number;
    timestamp: string;
    className: string;
    userFunction: string;
    query: string;
    executionTime: string;
    hasExplain: boolean;
}
