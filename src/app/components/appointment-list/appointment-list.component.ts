import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';
@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
  export class AppointmentListComponent implements OnInit {
    @Output() appointmentsLoaded = new EventEmitter<Appointment[]>();
  
    constructor(private appointmentService: AppointmentService) {}
  
    ngOnInit(): void {
      this.loadAppointments();
    }
    loadAppointments(): void {
      this.appointmentService.getAllAppointments().subscribe({
        next: (data) => {
          console.log('Appointments from service:', data);
          this.appointmentsLoaded.emit(data);
        },
        error: (err) => console.error('Erreur chargement rendez-vous:', err),
      });
    }
    
}
