export const BankAccountMessage = {
  peopleId: {
    required: 'ID People is required',
  },
  name: {
    required: 'Name is required',
    rangeCharacters: 'The Name must be between 3 and 45 characters',
  }
} as const