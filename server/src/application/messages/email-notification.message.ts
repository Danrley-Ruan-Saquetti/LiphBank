export const EmailNotificationMessage = {
  subject: {
    required: 'Subject is required'
  },
  body: {
    required: 'Body is required'
  },
  type: {
    required: 'Type is required',
    enumInvalid: 'The type of the notification must be one of the types: Push, Email or Internal',
  },
} as const