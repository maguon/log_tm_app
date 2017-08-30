export const ObjectToUrl = (obj) => {
    let url = ''
    for (key in obj) {
        url = url === '' ? url : `${url}&`

        if (obj[key]||obj[key] == 0) {
            url = `${url}${key}=${obj[key]}`
        }
    }
    return url
}

