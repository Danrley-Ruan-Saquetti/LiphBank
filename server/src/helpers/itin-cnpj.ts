import { extractDigits } from '../util'

export function formatItin(value: string) {
  return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
}

export function formatCnpj(value: string) {
  return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}

export function validateFormatItin(value: string) {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)
}

export function validateFormatCnpj(value: string) {
  return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value)
}

export function validateItin(value: string) {
  if (!value) {
    return false
  }

  if (isNaN(Number(value)) && !validateFormatItin(value)) {
    return false
  }

  value = extractDigits(value)

  if (value.length !== 11 || /^(\d)\1+$/.test(value)) {
    return false
  }

  const calc = (digit: number) =>
    value
      .slice(0, digit)
      .split('')
      .reduce((sum, num, index) => sum + parseInt(num) * (digit + 1 - index), 0)

  const digit1 = (calc(9) * 10) % 11 % 10
  const digit2 = (calc(10) * 10) % 11 % 10

  return digit1 === parseInt(value[9]) && digit2 === parseInt(value[10])
}

export function validateCnpj(value: string = '') {
  if (!value) return false

  if (isNaN(Number(value)) && !validateFormatCnpj(value)) {
    return false
  }

  value = extractDigits(value)

  const numbers = matchNumbers(value)
  if (numbers.length !== 14) return false

  const items = [...new Set(numbers)]
  if (items.length === 1) return false

  const digit0 = validCalc(12, numbers)
  const digit1 = validCalc(13, numbers)

  return digit0 === numbers[12] && digit1 === numbers[13]
}

function validCalc(x: number, numbers: number[]) {
  let factor = x - 7
  let sum = 0

  for (let i = 0; i < x; i++) {
    sum += numbers[i] * factor--
    if (factor < 2) factor = 9
  }

  const result = 11 - (sum % 11)
  return result > 9 ? 0 : result
}

function matchNumbers(value: string | number | number[] = '') {
  const match = value
    .toString()
    .replace(/[^\d]+/g, '')
    .match(/\d/g)
  return Array.isArray(match) ? match.map(Number) : []
}