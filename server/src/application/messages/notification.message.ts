export const NotificationMessage = {
  subject: {
    required: 'Subject is required'
  },
  body: {
    required: 'Body is required'
  },
  type: {
    enumInvalid: 'The type of the notification must be one of the types: Push, Email or Internal',
  },
} as const