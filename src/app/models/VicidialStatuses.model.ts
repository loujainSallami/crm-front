// src/app/models/vicidial-statuses.model.ts

import { VicidialLead } from "./VicidialLead.model";

export interface VicidialStatuses {
  id?: number;
  status: string;
  statusName?: string | null;
  selectable?: string | null;
  humanAnswered?: string | null;
  category?: string | null;
  vicidialLeads?: VicidialLead[]; // OneToMany avec VicidialLead
}
