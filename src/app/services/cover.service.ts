import { Injectable, computed, signal } from '@angular/core';

// ----1----
@Injectable({ providedIn: 'root' })
export class CoverService {
  readonly max = 3;

  // Only this service can change the list of picked student ids.
  //   ----2----
  private readonly _ids = signal<number[]>([]);

  // A read-only view for everybody else.
  //   ----3----
  readonly ids = this._ids.asReadonly();

  // Derived state: never stored.
  //   ----4----
  readonly count = computed(() => this._ids().length);
  //   ----5----
  readonly isFull = computed(() => this.count() >= this.max);

  isPicked(id: number): boolean {
    return this._ids().includes(id);
  }

  // Remove the id if it is picked. Otherwise add it, but only if the cover is not full.
  toggle(id: number): void {
    // ----6----
    if (this.isPicked(id)) {
      this._ids.update((ids) => ids.filter((i) => i !== id));
    } else if (!this.isFull()) {
      this._ids.update((ids) => [...ids, id]);
    }
  }
}
