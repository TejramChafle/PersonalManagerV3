import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-schedule-event',
  templateUrl: 'schedule-event.html',
})

export class ScheduleEventPage {
  
  event = { title: null, description: null, startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false, monthLoop: false };
  minDate = new Date().toISOString();

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleEventPage');
  }

  onDismiss() {
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    this.viewCtrl.dismiss(this.event);
  }

}