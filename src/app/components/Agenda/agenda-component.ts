import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions, EventClickArg, EventInput, } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import frLocale from '@fullcalendar/core/locales/fr';

import { Appointment } from '../../models/appointment.model';
import { AppointmentListComponent } from '../appointment-list/appointment-list.component';
import { AppointmentdetailsComponent } from '../appointmentdetails/appointmentdetails.component';
import { AppointmentCreateComponent } from '../appointment-create/appointment-create.component';
import { AppointmentService } from '../../services/appointment.service';
import { VicidialUserService } from '../../services/vicidil-user-service.service';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    AppointmentListComponent,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './agenda-component.html',
  styleUrls: ['./agenda-component.css']
})
export class AgendaComponent implements OnInit {
  @ViewChild('fullCalendar') fullCalendar!: FullCalendarComponent;

  appointments: Appointment[] = [];
  users: any[] = [];
  selectedUserId?: number;

  calendarOptions: CalendarOptions;

  constructor(
    private dialog: MatDialog,
    private userService: VicidialUserService,
    private appointmentService: AppointmentService
  ) {
    this.calendarOptions = this.createCalendarOptions('dayGridMonth');
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // 🔹 Charger tous les utilisateurs
  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => console.error('Erreur chargement users', err)
    });
  }

  // 🔹 Charger les rendez-vous d’un utilisateur sélectionné
  loadAppointments(userId?: number) {
    this.selectedUserId = userId;

    if (userId) {
      this.appointmentService.getByUser(userId).subscribe({
        next: (appointments) => this.onAppointmentsLoaded(appointments),
        error: (err) => console.error('Erreur chargement rendez-vous', err)
      });
    } else {
      this.onAppointmentsLoaded([]);
    }
  }

  // 🔹 Créer les options du calendrier
  createCalendarOptions(initialView: string): CalendarOptions {
    return {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      initialView: initialView,
      locale: frLocale,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      events: [] as EventInput[],
      eventClick: this.handleEventClick.bind(this)
    };
  }

  // 🔹 Mettre à jour les rendez-vous dans le calendrier
  onAppointmentsLoaded(appointments: Appointment[]) {
    this.appointments = appointments;

    const events: EventInput[] = appointments.map(a => ({
      title: `${a.description} - ${a.user?.fullName || a.user?.user || 'Inconnu'}${a.lead ? ' (' + (a.lead.firstName || a.lead.lastName) + ')' : ''}`,
      start: a.startTime,
      end: a.endTime,
      color: '#1976d2',
      extendedProps: { appointment: a }
    }));

    this.calendarOptions = {
      ...this.calendarOptions,
      events
    };
  }

  // 🔹 Cliquer sur un rendez-vous pour voir les détails
  handleEventClick(clickInfo: EventClickArg) {
    const appointment: Appointment | undefined = clickInfo.event.extendedProps['appointment'];
    if (!appointment) return;

    const dialogRef = this.dialog.open(AppointmentdetailsComponent, {
      data: appointment,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((action: 'update' | 'delete' | null) => {
      if (action === 'delete') {
        this.onAppointmentsLoaded(this.appointments.filter(a => a.id !== appointment.id));
      }
    });
  }

  // 🔹 Ouvrir la création d’un nouveau rendez-vous
  openCreateDialog() {
    const dialogRef = this.dialog.open(AppointmentCreateComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((newAppointment: Appointment | null) => {
      if (newAppointment) {
        this.onAppointmentsLoaded([...this.appointments, newAppointment]);
      }
    });
  }

  // 🔹 Petit calendrier
  miniCalendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    height: 'auto',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: ''
    },
    dayHeaderFormat: { weekday: 'short' },
    selectable: false,
    editable: false,
    fixedWeekCount: false,
    dateClick: this.onMiniDateClick.bind(this) // 🔹 synchronisation
  };

  // 🔹 Synchronisation petit calendrier → grand calendrier
  onMiniDateClick(arg: any) {
    if (!this.fullCalendar) return;
    const calendarApi = this.fullCalendar.getApi(); // getApi() retourne le Calendar de core
    calendarApi.gotoDate(arg.date);
    calendarApi.changeView('timeGridDay'); // optionnel
  }
  
}
