import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { StaffMember } from '../../models/staff.model';
import { StaffService } from '../../services/staff.service';
import { StaffCard } from '../../components/staff-card/staff-card';

type SortMode = 'featured' | 'name' | 'department';

@Component({
  imports: [StaffCard],
  selector: 'app-staff-page',
  styleUrl: './staff-page.css',
  templateUrl: './staff-page.html',
})
export class StaffPage implements OnInit {
  private readonly staffService: StaffService = inject(StaffService);

  protected readonly loading = signal(true);
  protected readonly staff = signal<StaffMember[]>([]);
  protected readonly errorMessage = signal('');

  protected readonly searchText = signal('');
  protected readonly selectedDepartment = signal('all');
  protected readonly sortBy = signal<SortMode>('featured');

  ngOnInit(): void {
    this.staffService.getStaff().subscribe({
      next: (staff) => {
        this.staff.set(staff);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load staff information.');
        this.loading.set(false);
      },
    });
  }

  protected readonly departments = computed(() =>
    [...new Set(this.staff().map((m) => m.department))].sort(),
  );
  protected readonly visibleStaff = computed(() => {
    const text = this.searchText().trim().toLowerCase();
    const dept = this.selectedDepartment();
    const filtered = this.staff().filter(
      (m) => m.name.toLowerCase().includes(text) && (dept === 'all' || m.department === dept),
    );
    return this.sortBy() === 'name'
      ? filtered.sort((a, b) => a.name.localeCompare(b.name))
      : filtered.sort((a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id);
  });

  protected onSearch(event: Event): void {
    this.searchText.set((event.target as HTMLInputElement).value);
  }
  protected onDepartmentChange(event: Event): void {
    this.selectedDepartment.set((event.target as HTMLSelectElement).value);
  }

  protected onSortChange(event: Event): void {
    this.sortBy.set((event.target as HTMLSelectElement).value as SortMode);
  }
}
