export declare class BaseError extends Error {
    status: number;
    code: number;
    msg: string;
    params: string[];
    constructor(code: number, msg: string, status?: number, ...params: string[]);
}
