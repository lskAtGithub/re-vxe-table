/**
 *
 * @param {(string | number | null | undefined)} prop
 * @returns  {boolean} value
 * @description 该函数用于判断是否有传入某props， 即使传入的是0或者空字符串
 */
function isNotUndefined(value) {
  return value !== undefined && value !== null
}

export { isNotUndefined }
