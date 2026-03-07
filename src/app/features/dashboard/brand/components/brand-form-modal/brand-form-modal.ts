import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Brand } from '../../../../../core/models/brand.model';

export interface BrandFormData {
  brand?: Brand;
}

@Component({
  selector: 'app-brand-form-modal',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './brand-form-modal.html',
  styleUrl: './brand-form-modal.scss',
})
export class BrandFormModal implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<BrandFormModal>);
  private data: BrandFormData = inject(MAT_DIALOG_DATA);

  get isEditMode(): boolean {
    return !!this.data?.brand;
  }

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    code: ['', [Validators.required, Validators.pattern(/^[A-Z0-9\-]{3,30}$/)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    rancher: ['', [Validators.required, Validators.maxLength(150)]],
    isActive: [true],
  });

  ngOnInit(): void {
    if (this.data?.brand) {
      this.form.patchValue({
        name: this.data.brand.name,
        code: this.data.brand.code,
        description: this.data.brand.description,
        rancher: this.data.brand.rancher,
        isActive: this.data.brand.isActive,
      });
    }
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  getFieldError(field: string): string {
    const control = this.form.get(field);
    if (!control?.errors || !control.touched) return '';
    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    if (control.errors['maxlength']) return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    if (control.errors['pattern']) return 'Solo mayúsculas, números y guiones (3-30 caracteres)';
    return 'Campo inválido';
  }
}
