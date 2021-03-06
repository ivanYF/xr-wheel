function validate(data, rules) {
    let errors = {};  // 有错误的话放这里面
    rules.forEach(rule => {
        let val = data[rule.key]
        if (rule.required) {
            let error = validate.required(val)
            if (error) {
                setDefaultObj(errors, rule.key)
                errors[rule.key] = error
                return
            }
        }
        if (rule.pattern) {
            let error = validate.pattern(val, rule.pattern)
            if (error) {
                setDefaultObj(errors, rule.key)
                errors[rule.key].pattern = error
            }
        }
        if (rule.minLen) {
            let error = validate.minLen(val, rule.minLen)
            if (error) {
                setDefaultObj(errors, rule.key)
                errors[rule.key].minLen = error
            }
        }
        if (rule.maxLen) {
            let error = validate.maxLen(val, rule.maxLen)
            if (error) {
                setDefaultObj(errors, rule.key)
                errors[rule.key].maxLen = error
            }
        }
        console.log(errors)
    });
}
validate.required = (val) => {
    if (!val && val !== 0) {
        return '必填'
    }
}
validate.pattern = (val, pattern) => { // pattern 可以是用户自定义的正则也可以是内置的
    if (pattern === 'phone') {
        if(!/^1\d{10}$/.test(val)) {
            return '手机格式错误'
        }
    } else if(!pattern.test(val)) {
        return '手机格式错误'
    }
}
validate.minLen = (val, minLen) => {
    if (val.length < minLen) {
        return '太短啦'
    }
}
validate.maxLen = (val, maxLen) => {
    if (val.length > maxLen) {
        return '太长啦'
    }
}
function setDefaultObj(obj, key) { // 确保是个对象
    obj[key] = obj[key] || {}
}
// 数据大概长这样
let data = {
    name: 'xxx',
    phone: '138xxxxxxxx'
}
// 规则大概长这样
let rules = [{
    key: 'name',
    required: true,
    minLen: 6,
    maxlen: 10
}, {
    key: 'phone',
    pattern: 'phone'
}]
// 错误信息大概长这样
let errors = {
    name: {
        required: '必填',
        minLen: '太短了',
        maxLen: '太长了'
    },
    phone: {
        pattern: '手机格式不对'
    }
}
validate(data, rules)
