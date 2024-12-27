import { FinancialTransactionFrequency, FinancialTransactionSituation, FinancialTransactionType, FinancialTransactionTypeOccurrence } from '@domain/entities/financial-transaction.entity'

export const FinancialTransactionRule = {
  title: {
    minCharacters: 3,
    maxCharacters: 45,
  },
  description: {
    default: '',
  },
  isObservable: {
    default: false,
  },
  situation: {
    enum: [FinancialTransactionSituation.CANCELED, FinancialTransactionSituation.LATE, FinancialTransactionSituation.PAID_OUT, FinancialTransactionSituation.PARTIALLY_PAID, FinancialTransactionSituation.PARTIALLY_RECEIVED, FinancialTransactionSituation.PENDING, FinancialTransactionSituation.RECEIVED] as const,
  },
  type: {
    enum: [FinancialTransactionType.EXPENSE, FinancialTransactionType.INCOME] as const,
  },
  typeOccurrence: {
    enum: [FinancialTransactionTypeOccurrence.SINGLE, FinancialTransactionTypeOccurrence.PROGRAMMATIC] as const,
    default: FinancialTransactionTypeOccurrence.SINGLE,
  },
  isSendNotification: {
    default: false,
  },
  timesToRepeat: {
    default: 0,
  },
  frequency: {
    enum: [FinancialTransactionFrequency.ANNUALLY, FinancialTransactionFrequency.DAILY, FinancialTransactionFrequency.MONTHLY, FinancialTransactionFrequency.QUARTERLY, FinancialTransactionFrequency.SEMIANNUALLY, FinancialTransactionFrequency.WEEKLY] as const,
    default: null,
  },
  senderRecipient: {
    default: '',
  },
  dateTimeCompetence: {
    default: () => new Date(Date.now()),
  },
  frequencyInDays: {
    DAILY: 1,
    WEEKLY: 7,
    MONTHLY: 30,
    QUARTERLY: 90,
    SEMIANNUALLY: 180,
    ANNUALLY: 365,
  },
  update: {
    situationsEnableToUpdate: {
      enum: [FinancialTransactionSituation.CANCELED] as const,
    }
  }
}