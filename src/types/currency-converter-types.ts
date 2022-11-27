export interface IConverterState {
    loading_status: boolean | null;
    error: string | null;
    success: boolean | null
    query: IConverterQuery | null;
    info: IConverterInfo| null;
    date: string| null;
    result: number| null;
}

interface IConverterQuery {
    from: string;
    to: string;
    amount: number;
}

interface IConverterInfo {
    timestamp: number;
    rate: number;
}


export enum ConverterActionTypes {
    CONVERT = "CONVERT",
    CONVERT_SUCCESS = "CONVERT_SUCCESS",
    CONVERT_ERROR = "CONVERT_ERROR",
}

interface IConvertAction {
    type: ConverterActionTypes.CONVERT;
}

interface IConvertSuccessAction {
    type: ConverterActionTypes.CONVERT_SUCCESS;
    payload: any[];
}

interface IConvertErrorAction {
    type: ConverterActionTypes.CONVERT_ERROR;
    payload: string;
}


export type ConverterActionType =
    IConvertAction |
    IConvertSuccessAction |
    IConvertErrorAction;