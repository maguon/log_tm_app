export const validate = (value, verifications) => {
    return verifications
        .filter(item => {
            if (item.type == 'isLength') {
                return validateLength(value, item)
            }
            if (item.type == 'isVehicleNumber') {
                return validateVehicleNumber(value)
            }
            if (item.type == 'isPhone') {
                return validatePhone(value)
            }
        })
        .map(item => {
            return item.message
        })
}


const validateLength = (value, condition) => {
    if (value.length >= condition.arguments[0] && value.length <= condition.arguments[1]) {
        return false
    }
    else {
        return true
    }
}

const validateVehicleNumber = (value) => {
    let result = false
    if (value.length == 7) {
        const express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
        result = express.test(value)
    }
    return !result

}

const validatePhone = (value) => {
    if ((/^1[34578]\d{9}$/.test(value))) {
       // console.log('false')
        return false
    } else {
        //console.log('true')
        return true
    }
}
