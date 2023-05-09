import { ErrorMessage } from "./types";

//для того чтобы понять пришла ли ошибка с сообщением с бека
export const haveErrorMessage = (err: unknown):err is ErrorMessage=> {
    return (
        typeof err === 'object' &&
        err !== null &&
        'data' in err &&
        typeof (err as Record<string, unknown>).data === 'object'   )
}