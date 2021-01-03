import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import * as moment from 'moment';
declare var require: any;
const masterData: any = require('../../../assets/json/master.json');

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public datepickerFormat: string = 'DD MMM, YYYY';
  public dateFormat: string = 'MMM dd, yyyy';
  public minDate: Date = new Date('1900-01-01T00:00:00');

  public minDateForReport(): Date {
    return moment().subtract(18, 'months').toDate();
  }

  public isEmpty(data: any): boolean {
    if (data instanceof Array) {
      return data === null || data === undefined || data.length === 0;
    } else {
      if (data) {
        data = data.toString().trim();
      }
      return data === null || data === undefined || data === '';
    }
  }

  getDate(dateString: string): Date {
    return new Date(dateString);
  }

  getDateString(date: Date): string {
    return date.toUTCString();
  }

  getYear(date: Date): number {
    if (_.isDate(date)) {
      return date.getFullYear();
    }
    return null;
  }

  getMonth(date: Date): number {
    if (_.isDate(date)) {
      return date.getMonth();
    }
    return null;
  }

  getDateFromYearAndMonth(dateString: string): Date {
    try {
      return moment(dateString).toDate();
    } catch {
      return null;
    }
  }

  getMonthLastDate(date: Date) {
    return moment(date).endOf('month').toDate();
  }

  getMonthStartDate(date: Date) {
    return moment(date).startOf('month').toDate();
  }

  convertDateToString(date: Date, format: string) {
    return moment(date).format(format);
  }

  getCurrentAge(dob: Date): number {
    if (_.isDate(dob)) {
      return moment().diff(dob, 'years');
    }
    return null;
  }

  filterList(searchKey: string, list: Array<any>) {
    const lowSearch = searchKey.toLowerCase();
    return list.filter((item) => {
      return Object.values(item).some(val =>
        String(val).toLowerCase().includes(lowSearch)
      );
    });
  }

  getJSON(obj) {
    if (
      !this.isEmpty(obj) && _.isObject(obj) &&
      (Object.prototype.toString.apply(obj) === '[object Object]' || Object.prototype.toString.apply(obj) === '[object Array]')
    ) {
      const json = JSON.stringify(obj);
      const newJson = json.replace(/"([\w]+)":/g, ($0, $1) => {
        return ('"' + $1.toLowerCase() + '":');
      });
      return JSON.parse(newJson);
    }
    return obj;
  }

  getSiteMasterData() {
    return masterData;
  }

  getRandomColors(count): Array<string> {
    const colorData = [];
    const letters = '0123456789ABCDEF'.split('');
    for (let k = 0; k < count; k++) {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      colorData.push('rgb(' + r + ',' + g + ',' + b + ', 0.8)');
    }
    return ['#78C350', '#348CD4', '#17A2B8', '#E56D45', ...colorData];
  }
}
