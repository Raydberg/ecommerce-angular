import { CategoryAdminService } from '@admin/services/category-admin.service';
import { JsonPipe, NgClass } from '@angular/common';
import { Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryResponse } from '@core/interfaces/category.interface';
import { NgIcon, provideIcons } from '@ng-icons/core'
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'category-admin-page',
  imports: [NgClass, ReactiveFormsModule, NgIcon],
  viewProviders: [provideIcons({
    heroPencilSquare,
    heroTrash
  })],
  templateUrl: './category-admin-page.html',
})
export class CategoryAdminPage {

  modal = viewChild<ElementRef<HTMLDialogElement>>("modelCreate")
  openModal = computed(() => this.modal()?.nativeElement.showModal())

  readonly cardColors = [
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'bg-neutral',
    'bg-info',
    'bg-success'
  ];

  private readonly categoryService = inject(CategoryAdminService)
  private readonly toastService = inject(ToastService)

  categoryResource = rxResource({
    stream: () => {
      return this.categoryService.getCategories()
    }
  })

  fb = inject(FormBuilder)
  categoryForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    slug: ['']
  })

  onSubmit() {
    if (!this.categoryForm.valid) {
      this.categoryForm.markAllAsTouched()
      return;
    }

    const rawValues = this.categoryForm.getRawValue()
    const name = rawValues.name.trim()
    const slug = rawValues.slug?.trim()

    const payload = {
      name: name?.trim(),
      ...(slug ? { slug } : {})
    }

    this.categoryService.createCategory(payload).subscribe({
      next: (newCategory) => {
        this.toastService.show(`Categoria ${newCategory.name} creada`, 'success')
        this.categoryResource.reload()
        this.categoryForm.reset()
      },
      error: () => {
        this.categoryForm.reset()
      }
    })
  }


  onDelete(id: string) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        this.categoryResource.set(this.categoryResource.value()?.filter(category => category.id !== id))
        this.toastService.show(`Categoria ${response.name} eliminado exitosamente`)
      }
    })
  }

  onEdit(category: CategoryResponse) {
    console.log("Editar", category)

  }


}
