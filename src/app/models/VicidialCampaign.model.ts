// src/app/models/vicidial-campaign.model.ts

import { VicidialLead } from "./VicidialLead.model";

export interface VicidialCampaign {
  id?: number;
  type: string;
  campaignName?: string | null;
  active?: string | null;
  dialStatusA?: string | null;
  webFormAddress?: string | null;
  scheduledCallbacks?: string | null;
  vicidialLeads?: VicidialLead[]; // relation OneToMany
}
