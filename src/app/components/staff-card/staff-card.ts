import { Component, input } from '@angular/core';
import { StaffMember } from '../../models/staff.model';

@Component({
  imports: [],
  selector: 'app-staff-card',
  styleUrl: './staff-card.css',
  templateUrl: './staff-card.html',
})
export class StaffCard {
  readonly staff = input.required<StaffMember>();
}
