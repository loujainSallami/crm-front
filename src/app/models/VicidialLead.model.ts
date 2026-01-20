// src/app/models/vicidial-lead.model.ts
import { Appointment } from './appointment.model';
import { VicidialCampaign } from './VicidialCampaign.model';
import { VicidialStatuses } from './VicidialStatuses.model';

export interface VicidialLead {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  appointments?: Appointment[];       // OneToMany avec Appointment
  campaign?: VicidialCampaign | null; // ManyToOne avec VicidialCampaign
  status: VicidialStatuses;           // ManyToOne avec VicidialStatuses
}
