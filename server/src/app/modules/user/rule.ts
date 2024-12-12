export const UserRule = {
  validation: {
    peopleId: {
      required: 'Id People is required',
    },
    login: {
      required: 'Login is required',
      valueInvalid: 'Login invalid',
      rangeCharacters: 'The Login must have a maximum of 254 characters',
    },
    password: {
      required: 'Password is required',
      valueInvalid: 'The Password must be between 6 and 15 characters, must have 1 uppercase and lowercase letter, 1 number',
    },
    type: {
      required: 'Type is required',
      valueInvalid: 'The user\'s type must be Customer or Admin',
    },
  },
  rule: {
    login: {
      maxCharacters: 254,
    },
    password: {
      regexp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
    }
  },
} as const