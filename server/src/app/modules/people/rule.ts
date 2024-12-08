export const PeopleRule = {
  validation: {
    name: {
      required: 'Name is required',
      rangeCharacters: 'The Name must be between 3 and 45 characters',
    },
    gender: {
      valueInvalid: 'Gender invalid'
    },
    type: {
      valueInvalid: 'The person\'s type must be Legal Entity or Natural Person',
    },
    cpfCnpj: {
      required: 'CPF/CNPJ is required',
      valueInvalid: 'CPF/CNPJ invalid',
      alreadyExists: 'CPF/CNPJ already registered',
    },
    cpf: {
      valueInvalid: 'CPF invalid'
    },
    cnpj: {
      valueInvalid: 'CNPJ invalid'
    },
  },
  rule: {
    name: {
      min: 3,
      max: 45,
    }
  },
} as const