import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../models/student.model';

@Component({
  imports: [RouterLink],
  selector: 'app-student-card',
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})
export class StudentCard {
  // The parent page will give us one student through this input.
  readonly student = input.required<Student>();

  // Remember whether the student's photo failed to load.
  private readonly imageFailed = signal(false);

  // Use the placeholder when the original photo cannot load.
  protected readonly photoSrc = computed(() =>
    this.imageFailed() ? 'images/placeholder-portrait.svg' : this.student().photo,
  );

  // Called when the browser cannot load the image.
  protected onImageError(): void {
    this.imageFailed.set(true);
  }
}
