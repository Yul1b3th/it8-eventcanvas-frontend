import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { Calendar, CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DateClickArg } from '@fullcalendar/interaction'; // Añade esta línea

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


import { EventsService } from '../../services/calendar.service';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { Event } from '../../interfaces/calendar.interface';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export default class CalendarComponent implements OnInit {
  public event_calendar?: Event;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: esLocale,
    dateClick: this.handleDateClick.bind(this),
    events: [],
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private eventsService: EventsService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.updateEvents();
  }

  handleEventClick(arg: EventClickArg) {
    const eventId = Number(arg.event.id);
    this.eventsService.getEventById(eventId.toString()).subscribe(event => {
      this.handleDialogClose(this.dialog.open(DeleteComponent, { data: event }), eventId);
    });
  }

  handleDateClick(arg: DateClickArg) {
    this.handleDialogClose(this.dialog.open(AddComponent, { data: { date: arg.dateStr } }));
  }

  openDialog(): void {
    this.dialog.open(AddComponent, { data: {} }).afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  updateEvents() {
    this.eventsService.getEvents().subscribe(events => {
      this.calendarOptions.events = this.mapEventsToEventInput(events);
    });
  }

  private mapEventsToEventInput(events: Event[]): EventInput[] {
    return events
      .filter(event => event.state)
      .map(event => ({
        title: event.title || '',
        start: event.start_date || '',
        end: event.end_date || '',
        color: event.color || '',
        id: event.id?.toString(),
        state: event.state,
      }));
  }

  private handleDialogClose(dialogRef: MatDialogRef<any, any>, eventId?: number) {
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'DELETE') {
        this.eventsService.deleteEventById(eventId!).subscribe(() => {
          this.updateEvents();
        });
      } else if (result) {
        this.eventsService.updateEvent(result).subscribe(() => {
          this.updateEvents();
        });
      }
    });
  }
}

