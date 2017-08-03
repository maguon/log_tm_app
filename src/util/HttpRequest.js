import requestHeaders from './RequestHeaders'


function get(url) {
    return fetch(url, {
        method: 'GET',
        headers: requestHeaders.headers
    }).then((response) => response.json())
    // .then((responseJson) => {
    //     callback(null, responseJson)
    // })
    // .catch((error) => {
    //     callback(error, null);
    // })
}

function post(url, params) {
    return fetch(url, {
        method: 'POST',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
    // .then((responseJson) => {
    //     callback(null, responseJson)
    // })
    // .catch((error) => {
    //     callback(error, null);
    // });
}

function put(url, params) {
    return fetch(url, {
        method: 'PUT',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
    // .then((responseJson) => {
    //     callback(null, responseJson)
    // })
    // .catch((error) => {
    //     callback(error, null);
    // });
}

function del(url, callback) {
    fetch(url, {
        method: 'DELETE',
        headers: requestHeaders.headers,
        //body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null);
        });
}


function postFile(url, params, callback) {
    let formData = new FormData()
    // console.log('params', params)
    let file = { uri: params.imageUrl, type: params.imageType, name: params.imageName }
    formData.append(params.key, file)
    //console.log('formData', formData)
    fetch(url, {
        method: 'POST',
        headers: requestHeaders.formHeaders,
        body: formData,
    }).then((response) => response.json())
        .then((responseJson) => {
            //console.log('responseJson', responseJson)
            callback(null, responseJson)

        })
        .catch((error) => {
            //console.log('error', error)
            callback(error, null)
        })
}

// function getAll(urls, callback) {
//     let proMises = urls.map(url => fetch(url, {
//         method: 'GET',
//         headers: requestHeaders.headers
//     }).then(response => response.map(item => item.json())))

//     Promise.all(proMises)
//         .then(response => console.log(response))
//     // .then(responseJson => {
//     //     Promise.all(responseJson)
//     //         .then(res => {
//     //             callback(null, res)
//     //         })
//     //         .catch((error) => {
//     //             callback(error, null)
//     //         })
//     // })
//     // .catch((error) => {
//     //     callback(error, null)
//     // })
// }



module.exports = {
    get: get,
    post: post,
    put: put,
    del: del,
    postFile: postFile
    // getAll: getAll
}
