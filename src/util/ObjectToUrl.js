export const ObjectToUrl = (obj) => {
    let url = ''
    for (key in obj) {
        url = url === '' ? url : `${url}&`
        if (obj[key])
            url = `${url}${key}=${obj[key]}`
    }
    return url
}

