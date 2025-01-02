export const ErrorLogMessage = {
  id: {
    required: 'ID Error Log is required',
  },
  details: {
    invalidValue: 'Details of the log error must be a object'
  },
  message: {
    required: 'Message is required',
  },
  origin: {
    required: 'Origin is required',
  },
} as const