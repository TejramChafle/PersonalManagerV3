import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AppProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()

export class AppProvider {
  registrationId: string;

  constructor(public http: HttpClient) {
    console.log('Hello AppProvider Provider');
  }

  public actionMessage(message: { title: string, text: string }) {
    alert(JSON.stringify(message));
    /* this._snackBar.open(message.text, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    }); */
  }

  public handleError(error) {
    // console.log(error);
    if (error.error.error.message == 'INVALID_ID_TOKEN') {
      localStorage.clear();
      // this._router.navigate(['/login']);
    } else if (error.statusText == 'Unauthorized' && error.error.error == 'Auth token is expired') {
      this.actionMessage({ text: 'Login expired, Please login again.', title: 'Close' });
      localStorage.clear();
      // this._router.navigate(['/login']);
    }
  }


  public formatDate(jsDate) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date(jsDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return day + ' ' + months[month] + ', ' + year;
  }

  public inputDate(date) {
    const day = date.getDate();
    let month = date.getMonth();
    const year = date.getFullYear();
    month++;
    month = month < 10 ? '0' + month : month;
    return year + '-' + month + '-' + day;
  }


  // Calculate the time difference between two dates in Days, Hours and Minutes 
  timeDifference(time) {
    var startTime;
    var endTime;
    if (time && time.startDate) {
      let date = new Date(time.startDate);
      if (time.startTime) {
        date.setHours(time.startTime.split(':')[0]);
        date.setMinutes(time.startTime.split(':')[1]);
      }
      startTime = date.getTime();
    }

    if (time && time.dueDate) {
      let date = new Date(time.dueDate);
      if (time.endTime) {
        date.setHours(time.endTime.split(':')[0]);
        date.setMinutes(time.endTime.split(':')[1]);
      }
      endTime = date.getTime();
    }

    let days = (endTime - startTime) / (1000 * 3600 * 24);
    let total_hrs = (endTime - startTime) / (1000 * 60 * 60);
    let mins = ((endTime - startTime) % (1000 * 60 * 60)) / (1000 * 60);
    let hrs = total_hrs % 24;
    return {
      days: days ? days.toFixed() : null,
      hours: hrs ? hrs.toFixed() : null,
      minutes: mins ? mins : (hrs ? 0 : null)
    }
  }
}