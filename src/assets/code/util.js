/**
 * 返回随机字符
 * @param {*} length
 * @returns
 */
export const randomStr = function (length) {
  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  ALPHABET += 'abcdefghijklmnopqrstuvwxyz'
  ALPHABET += '0123456789-_'
  var str = ''
  for (var i = 0; i < length; ++i) {
    var rand = Math.floor(Math.random() * ALPHABET.length)
    str += ALPHABET.substring(rand, rand + 1)
  }
  return str
}

/**
 * 任意范围随机数
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 判断值是否为空
 * @param {*} v
 * @returns
 */
export const isEmpty = function (v) {
  switch (typeof v) {
    case 'undefined':
      return true
    case 'string':
      if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true
      break
    case 'boolean':
      if (!v) return true
      break
    case 'number':
      if (v === 0 || isNaN(v)) return true
      break
    case 'object':
      if (v === null || v.length === 0) return true
      for (var i in v) {
        return false
      }
      return true
  }
  return false
}
