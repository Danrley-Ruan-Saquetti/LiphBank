import { describe } from 'vitest'
import { validateCNPJ, validateCPF } from '@util/validators/cpf-cnpj'

describe('Validate CPF', () => {
  test('CPF Valid with dots', () => {
    const arrange = [
      '102.547.109-13',
      '435.869.570-17',
      '886.509.060-01',
      '514.591.690-69',
      '008.806.530-86',
      '045.044.030-30',
      '699.199.890-70',
    ]

    arrange.map(cpf => {
      expect(validateCPF(cpf)).toEqual(true)
    })
  })

  test('CPF Valid without dots', () => {
    const arrange = [
      '10254710913',
      '43586957017',
      '88650906001',
      '51459169069',
      '00880653086',
      '04504403030',
      '69919989070',
    ]

    arrange.map(cpf => {
      expect(validateCPF(cpf)).toEqual(true)
    })
  })

  test('CPF Invalid in format', () => {
    const arrange = [
      '023.542.787-13',
      '31.23245.3213',
      '4598.3612973',
      '8967.98808',
      '89.s7d67s89 668',
      '',
      '1231',
      'sfdghh.bngbf',
      '00000000000',
      '000.000.000-00',
      '43.58.695701-7',
      '0.450.4403-030',
    ]

    arrange.map(cpf => {
      expect(validateCPF(cpf)).toEqual(false)
    })
  })
})

describe('Validate CNPJ', () => {
  test('CNPJ Valid with dots', () => {
    const arrange = [
      '93.892.889/0001-40',
      '22.062.665/0001-62',
      '17.956.873/0001-75',
      '76.969.184/0001-64',
      '91.857.377/0001-17',
      '75.926.288/0001-29',
      '02.346.671/0001-34',
    ]

    arrange.map(cpf => {
      expect(validateCNPJ(cpf)).toEqual(true)
    })
  })

  test('CNPJ Valid without dots', () => {
    const arrange = [
      '93892889000140',
      '22062665000162',
      '17956873000175',
      '76969184000164',
      '91857377000117',
      '75926288000129',
      '02346671000134',
    ]

    arrange.map(cpf => {
      expect(validateCNPJ(cpf)).toEqual(true)
    })
  })

  test('CNPJ Invalid in format', () => {
    const arrange = [
      '43.124.654/1232-32',
      '',
      '2',
      '43423.42342342.3-2',
      '123131312313131231',
      '02346671000131',
      '00000000000000',
      '00.000.000/0000-00',
    ]

    arrange.map(cpf => {
      expect(validateCNPJ(cpf)).toEqual(false)
    })
  })
})