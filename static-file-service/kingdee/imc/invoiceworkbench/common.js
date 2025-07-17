// eslint-disable-next-line
Function.prototype.method = function(name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};

// 过滤特殊字符 除了中英文小括号空格
String.method('fpy_filterSpecialChar', function fpy_filterSpecialChar() {
    return this.replace(/[^a-zA-Z0-9()（）\u4e00-\u9fa5\s]/g, '');
});

// 仅数字
String.method('fpy_onlyNum', function fpy_onlyNum() {
    return this.replace(/\D/g, '');
});

// 大写字母数字 税号
String.method('fpy_toUpperLetterNum', function fpy_toUpperLetterNum() {
    return this.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
});

// 邮箱输入
String.method('fpy_onlyEmali', function fpy_onlyEmali() {
    return this.replace(/[^a-zA-Z0-9_.-@;]/g, '');
});

// 邮箱校验
String.method('fpy_isEmail', function fpy_isEmail() {
    return (/^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z.]{2,6})$/.test(this));
});

// 手机校验
String.method('fpy_isPhone', function fpy_isPhone() {
    return /^(1[0-9]{10}$)/.test(this);
});

/**
 * 乘法
 * @param {number|string} arg1
 * @param {number|string} arg2
 * @param {number|string} arg3 - 默认1
 * @returns
 */
// eslint-disable-next-line
function fpy_accMul(arg1, arg2, arg3 = 1) {
    let m = 0;
    const s1 = fpy_numberToString(arg1);
    const s2 = fpy_numberToString(arg2);
    const s3 = fpy_numberToString(arg3);
    try {
        m += s1.split('.')[1].length;
    } catch (e) {}
    try {
        m += s2.split('.')[1].length;
    } catch (e) {}
    try {
        m += s3.split('.')[1].length;
    } catch (e) {}
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) * Number(s3.replace('.', '')) / Math.pow(10, m);
}

/**
 * 除法
 * @param {number|string} arg1
 * @param {number|string} arg2
 * @returns
 */
// eslint-disable-next-line
function fpy_accDiv(arg1, arg2) {
    let d1;
    let d2;
    const n1 = Number(fpy_numberToString(arg1).replace('.', ''));
    const n2 = Number(fpy_numberToString(arg2).replace('.', ''));
    if (n2 === 0) {
        return 0;
    }
    try {
        d1 = fpy_numberToString(arg1).split('.')[1].length;
    } catch (e) {
        d1 = 0;
    }
    try {
        d2 = fpy_numberToString(arg2).split('.')[1].length;
    } catch (e) {
        d2 = 0;
    }
    // 18446934 * 0.1 = 1844693.4000000001 正确值1844693.4
    // 614897800000000000000 / 1e15 = 614897.7999999999 正确值614897.8
    return fpy_accMul((n1 / n2), Math.pow(10, d2 - d1));
}

/**
 * 加法
 * @param {number|string} arg1
 * @param {number|string} arg2
 * @returns
 */
// eslint-disable-next-line
function fpy_Add(arg1, arg2) {
    let r1, r2;
    try {
        r1 = fpy_numberToString(arg1).split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = fpy_numberToString(arg2).split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    // 动态控制精度长度
    const n = Math.max(r1, r2);
    const m = Math.pow(10, n);
    return Number(((arg1 * m + arg2 * m) / m).toFixed(n));
}

/**
 * 科学计数法转换
 * @param {number|string} arg
 * @returns
 */
function tansferNumber(arg) {
    let r;
    try {
        r = fpy_numberToString(arg).split('.')[1].length;
    } catch (e) {
        r = 0;
    }
    return arg.toFixed(r);
}

/**
 * 减法
 * @param {number|string} arg1
 * @param {number|string} arg2
 * @returns
 */
// eslint-disable-next-line
function fpy_Minus(arg1, arg2) {
    let r1, r2;
    try {
        r1 = fpy_numberToString(arg1).split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = fpy_numberToString(arg2).split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    // 动态控制精度长度
    const n = Math.max(r1, r2);
    const m = Math.pow(10, n);
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}

/**
 * 保留小数 金额
 * @param {number|string} num - 数值
 * @param {number|string} length - 0-20之间的整数，默认2
 * @param {boolean} noFillZero - 不补零，默认 false-补零
 * @returns {string}
 */
// eslint-disable-next-line
function fpy_toFixedSafe(num, length = 2, noFillZero = false) {
    if (isNaN(num)) {
        console.error(`Error: fpy_toFixedSafe() ${num} is NaN`);
        return num;
    }
    if (isNaN(length) || length < 0 || length > 20) {
        console.error('Uncaught RangeError: fpy_toFixedSelf() digits a rgument must be between 0 and 20');
        return num;
    }
    length = Math.floor(length);
    // 符号位
    const flag = num >= 0 ? '' : '-';
    // 正数
    const positive = Math.abs(num);
    // 转为字符串
    const str = fpy_numberToString(positive);
    // 小数点的位置
    let dot = str.indexOf('.');

    // 浮点数要扩大的倍数
    // 除法精度问题，如果无法进位时，扩大倍数就为小数长度与需保留小数长度的最小值
    const min = Math.min(dot < 0 ? 0 : (str.length - dot - 1), length);
    let result;
    if (dot === -1 || (dot !== -1 && str[dot + length + 1] !== 5)) {
        result = positive.toFixed(min);
    } else {
        result = (positive + Math.pow(10, -(length + 1))).toFixed(min);
    }
    // 0时不加小数点
    if (length && !noFillZero) {
        // 无小数
        dot = result.indexOf('.');
        if (dot === -1) {
            result += '.';
            dot = result.indexOf('.');
        }
        // 处理多次进位
        const len = result.length - (dot + 1);
        if (len < length) {
            for (let i = 0; i < length - len; i++) {
                result += '0';
            }
        }
    }
    return flag + result;
}

/**
 * 计算字符串长度
 * @param {string} val - 默认''
 * @returns
 */
// eslint-disable-next-line
function fpy_getByteLen(val = '') {
    let len = 0;
    for (let i = 0; i < val.length; i++) {
        const a = val.charAt(i);
        // \u4e00-\u9fa5 unicode中文编码范围
        if ((/[\u4e00-\u9fa5]/ig).test(a)) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}

/**
 * 控制文字长度 并将不间断空格 \u00a0，中文空格 \u3000，转换为英文空格 \u0020
 * @param {string} val - 默认''
 * @param {number} maxLength - 默认0
 * @returns
 */
// eslint-disable-next-line
function fpy_getTextByMaxLength(val = '', maxLength) {
    const str = val.toString();
    const max = Number(maxLength) || 0;
    let len = 0;
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const a = str.charAt(i);
        // \u4e00-\u9fa5 unicode中文编码范围
        if ((/[\u4e00-\u9fa5]/ig).test(a)) {
            len += 2;
        } else {
            len += 1;
        }
        if (max !== 0 && len >= max) {
            result = str.substring(0, len > max ? i : i + 1);
            break;
        }
    }
    // 未设置最大长度或设置最大长度超过字符串长度时,返回字符串本身
    if (max === 0 || len < max) {
        result = str;
    }
    return result.replace(/\u00a0|\u3000/g, '\u0020');
}

/**
 * 32位UUId xxxxxxxxxxxxxxyxxxxxxxxxxxxxxxxx
 * @returns
 */
// eslint-disable-next-line
function fpy_getUUId() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxxxxxxxxyxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

/**
 * 数值转换为字符串
 * @param {number} num
 * @returns
 */
// eslint-disable-next-line
function fpy_numberToString(num) {
    if (isNaN(num)) {
        console.error(`${num} is not number!`);
        return;
    }
    // 序列化非标准科学计数法
    const str = Number(num).toString();
    const reg = /^([+-])?([\d])+(?:.([\d]+))?[Ee]([+-])?([\d]+)$/;

    if (reg.test(str)) {
        const arr = reg.exec(str);
        // num正负号 正号可省略
        let result = arr[1] === '-' ? '-' : '';
        // 次方
        if (arr[5]) {
            // 处理小数部分
            arr[3] = arr[3] || '';
            // 次方的正负 正号可省略
            if (arr[4] === '-') {
                let zero = '';
                // 减去整数一位
                for (let i = 0; i < arr[5] - 1; i++) {
                    zero += '0';
                }
                result += '0.' + zero + arr[2] + arr[3];
            } else {
                result += arr[2] + arr[3];
                const len = arr[5] - arr[3].length;
                if (len >= 0) {
                    let zero = '';
                    for (let i = 0; i < len; i++) {
                        zero += '0';
                    }
                    result += zero;
                } else {
                    result = result.substring(0, result.length + len) + '.' + result.substring(result.length + len);
                }
            }
        } else {
            result += arr[2] + (arr[3] ? '.' + arr[3] : '');
        }
        return result;
    }
    return str;
}

/**
 * 保留小数不补零 数量
 * @param {string} val
 * @param {number} len - 小数位最大长度 默认13
 * @returns
 */
// eslint-disable-next-line
function fpy_toFixedNoZero(val, len = 13) {
    return fpy_toFixedSafe(val, len, true);
}

/**
 * 保留两位到13位小数 单价
 * @param {*} val
 * @returns
 */
// eslint-disable-next-line
function fpy_toFixedTwoOrMore(val) {
    const tem = fpy_toFixedSafe(val, 13, true);
    const xsd = tem.split('.');
    if (!xsd[1]) {
        return tem + '.00';
    } else if (xsd[1].length === 1) {
        return tem + '0';
    }
    return tem;
}

/**
 * 函数防抖
 * @returns {function}
 */
// eslint-disable-next-line
function fpy_pwyDebounce() {
    let timer = null;
    return function fpy_pwyDebounce_callback(fun, v) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            Reflect.apply(fun, this, [v]);
        }, 300);
    };
}

/**
 * 函数节流
 * @returns {function}
 */
// eslint-disable-next-line
function fpy_pwyThrottle(t = 300) {
    let isRun = false;
    return function fpy_pwyThrottle_callback(fun, v) {
        if (isRun) {
            return;
        }
        isRun = true;
        setTimeout(() => {
            isRun = false;
            Reflect.apply(fun, this, [v]);
        }, t);
    };
}

/**
 * 只执行一次
 * @returns {function}
 */
// eslint-disable-next-line
function fpy_once(fun) {
    let canRun = true;
    return function fpy_once_callback(v) {
        if (canRun) {
            canRun = false;
            Reflect.apply(fun, this, [v]);
        }
    };
}

/**
 * 千分位
 * @returns {string}
 */
// eslint-disable-next-line
function fpy_addThousands(num) {
    if (!(typeof num === 'string' || typeof num === 'number')) {
        return num;
    }
    const reg = /(\d)(?=(\d{3})+$)/g;
    if (num && !num.toString().includes('.')) {
        return (num + '').replace(reg, '$&,');
    }
    return num.toString().replace(/(\d)(?=(\d{3})+\.)/g, ($1) => $1 + ',');
}

/**
 * 转义
 * @param {string} value
 * @returns
 */
function fpy_escapeString(value) {
    if (typeof value !== 'string') {
        return value;
    }
    return value.replace(/<(.+?)>/g, '&lt;$1&gt;')
};