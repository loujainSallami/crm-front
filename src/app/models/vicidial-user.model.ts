import { Appointment } from "./appointment.model";
import { Note } from "./note.model";
import { Task } from "./task.model";

export interface VicidialUser {
    id: number;
    userId?: number;        // user_id en PHP
    user: string;           // user
    pass: string;           // pass
    fullName?: string;      // full_name
    userLevel?: number;     // user_level
    userGroup?: string;     // user_group
    phoneLogin?: string;    // phone_login
    phonePass?: string;     // phone_pass
    appointments?: Appointment[];
    tasks?: Task[];
    notifications?: Notification[];
    notes?: Note[];
}
