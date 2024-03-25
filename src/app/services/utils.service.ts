import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isBefore, addMonths, isPast } from 'date-fns';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  /**
   * Formats the value to millions, billions, etc
   * @param value The number to be formatted
   * @return string
   */
  formatMoney(value: number): any {
    return Math.abs(Number(value)) >= 1.0e+15
        ? (Math.abs(Number(value)) / 1.0e+15).toFixed(2) + 'Q'
        : Math.abs(Number(value)) >= 1.0e+12
            ? (Math.abs(Number(value)) / 1.0e+12).toFixed(2) + 'T'
            : Math.abs(Number(value)) >= 1.0e+9
                ? (Math.abs(Number(value)) / 1.0e+9).toFixed(2) + 'B'
                : Math.abs(Number(value)) >= 1.0e+6
                    ? (Math.abs(Number(value)) / 1.0e+6).toFixed(2) + 'M'
                    : Math.abs(Number(value)) >= 1.0e+3
                        ? (Math.abs(Number(value)) / 1.0e+3) + 'K'
                        : Math.abs(Number(value));
  }

  /**
   * Gets the difference of days between two dates
   * @param firstDate for comparison
   * @param secondDate for comparison
   * @return number of days
   */
  daysLeft(firstDate: Date, secondDate: Date): number {
    const timeDifference = secondDate.getTime() - firstDate.getTime();
    return timeDifference / (1000 * 3600 * 24);
  }

  /**
   * Gets the minimum date
   * @return string of the date
   */
  getMinDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Gets the maximum date
   * @return string of the date
   */
  getMaxDate(): string {
    const currentDate = new Date();
    return new Date(currentDate.setDate(currentDate.getDate() + 29))
        .toISOString().split('T')[0];
  }

  validateCalendarDate(event: any, controlName: string, formControls: any) {
    const control = formControls[controlName];
    const day = parseInt(formControls.calendarDay.value);
    const month = parseInt(formControls.calendarMonth.value) - 1;
    const year = parseInt(formControls.calendarYear.value);
    const isLetterCharacter = /^[A-Z]$/i;
    const actualValue = formControls[controlName].errors?.pattern?.actualValue;
    if (
        !control.value ||
        controlName !== 'calendarYear' && control.value.includes('00') ||
        isLetterCharacter.test(actualValue) ||
        formControls[controlName].hasError('maxlength') ||
        controlName === 'calendarDay' && parseInt(control.value) > 31 ||
        controlName === 'calendarMonth' && parseInt(control.value) > 12
    ) {
      formControls[controlName].setValue('');
    }
    if (formControls.calendarDay.invalid) {
      this.focusDateInput('day');
    }
    if (formControls.calendarDay.valid) {
      this.focusDateInput('month');
    }
    if (formControls.calendarDay.valid && formControls.calendarMonth.valid) {
      this.focusDateInput('year');
    }
    if (
        formControls.calendarDay.valid &&
        formControls.calendarMonth.valid &&
        formControls.calendarYear.valid &&
        this.isValidDate(year, month, day)) {
      formControls.calendarDate.setValue(`${year}-${month + 1}-${day}`);
    } else {
      formControls.calendarDate.setValue('');
    }
  }

  /**
   * Gets the date format
   * @return string of the date
   */
  isValidDate(year: number, month: number, day: number) {
    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  }

  focusDateInput(type: string) {
    (document.querySelector(`.${type}`) as HTMLElement).focus();
  }
}
