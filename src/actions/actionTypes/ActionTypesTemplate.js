export const getTemplate = (requestName) => {
    return {
        WAITING: `GET_${requestName}_WAITING`,
        SUCCESS: `GET_${requestName}_SUCCESS`,
        FAILED: `GET_${requestName}_FAILED`,
        ERROR: `GET_${requestName}_ERROR`,
        SERVICEERROR: `GET_${requestName}_SERVICEERROR`,
        RESET: `RESET_${requestName}`
    }
}

export const postTemplate = (requestName) => {
    return {
        WAITING: `POST_${requestName}_WAITING`,
        SUCCESS: `POST_${requestName}_SUCCESS`,
        FAILED: `POST_${requestName}_FAILED`,
        ERROR: `POST_${requestName}_ERROR`,
        SERVICEERROR: `POST_${requestName}_SERVICEERROR`,
        RESET: `RESET_${requestName}`
    }
}

export const actionTemplate = (requests, actionName) => {
    return {
        ...requests,
        CLEAN: `CLEAN_${actionName}`
    }
}
