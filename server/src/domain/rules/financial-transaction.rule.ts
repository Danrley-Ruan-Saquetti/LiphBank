import { FinancialTransactionFrequency, FinancialTransactionSituation, FinancialTransactionType, FinancialTransactionTypeOccurrence } from '@domain/entities/financial-transaction.entity'

export const FinancialTransactionRule = {
  title: {
    minCharacters: 3,
    maxCharacters: 45,
  },
  description: {
    default: '',
  },
  situation: {
    enum: [FinancialTransactionSituation.CANCELED, FinancialTransactionSituation.LATED, FinancialTransactionSituation.PAID_OUT, FinancialTransactionSituation.PENDING, FinancialTransactionSituation.RECEIVED] as const,
  },
  type: {
    enum: [FinancialTransactionType.EXPENSE, FinancialTransactionType.INCOME] as const,
  },
  typeOccurrence: {
    enum: [FinancialTransactionTypeOccurrence.SINGLE, FinancialTransactionTypeOccurrence.PROGRAMMATIC] as const,
    default: FinancialTransactionTypeOccurrence.SINGLE,
  },
  timesToRepeat: {
    default: null,
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
    [FinancialTransactionFrequency.DAILY]: 1,
    [FinancialTransactionFrequency.WEEKLY]: 7,
    [FinancialTransactionFrequency.MONTHLY]: 30,
    [FinancialTransactionFrequency.QUARTERLY]: 90,
    [FinancialTransactionFrequency.SEMIANNUALLY]: 180,
    [FinancialTransactionFrequency.ANNUALLY]: 365,
  },
  update: {
    situationsEnableToUpdate: {
      enum: [FinancialTransactionSituation.CANCELED] as const,
    }
  },
  closedSituations: [FinancialTransactionSituation.CANCELED, FinancialTransactionSituation.PAID_OUT, FinancialTransactionSituation.RECEIVED]
}