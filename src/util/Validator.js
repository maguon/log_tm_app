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
            if (item.type == 'isMoney') {
                return validateMoney(value)
            }
            if (item.type == 'isCardNo') {
                return validateCardNo(value)
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
        return false
    } else {
        return true
    }
}

const validateMoney = (value) => {
    if ((/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(value))) {
        return false
    } else {
        return true
    }
}

const validateCardNo=(value)=>{
    if ((/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))) {
        return false
    } else {
        return true
    }
}

// function isCardNo(card)  
// {  
//    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
//    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
//    if(reg.test(card) === false)  
//    {  
//        alert("身份证输入不合法");  
//        return  false;  
//    }  
// }  