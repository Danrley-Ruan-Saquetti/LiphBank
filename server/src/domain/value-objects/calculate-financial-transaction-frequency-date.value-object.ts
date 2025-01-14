import { FinancialTransactionFrequency } from '@domain/entities/financial-transaction.entity'
import { FinancialTransactionRule } from '../rules/financial-transaction.rule'

export class CalculateFinancialTransactionFrequencyDate {

  constructor(
    private frequency: FinancialTransactionFrequency,
    private timesToRepeat = 1
  ) { }

  calculateDates() {
    const frequencyInDay = FinancialTransactionRule.frequencyInDays[this.frequency]

    console.log(this, frequencyInDay)
  }
}