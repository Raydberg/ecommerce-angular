import { CategoryAdminService } from '@admin/services/category-admin.service';
import { JsonPipe, NgClass } from '@angular/common';
import { Component, computed, ElementRef, inject, model, signal, viewChild } from '@angular/core';
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

  currentCategoryId = signal<string | null>(null)

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


  modalTitle = computed(() => this.currentCategoryId() ? 'Editar categoria' : 'Crear categoria')
  openModal() {
    this.currentCategoryId.set(null)
    this.modal()?.nativeElement.showModal()
  }
  closeModal() {
    this.categoryForm.reset()
    this.modal()?.nativeElement.close()
    this.currentCategoryId.set(null)
  }

  onSubmit() {
    console.log("Click")
    // if (!this.categoryForm.valid) {
    //   this.categoryForm.markAllAsTouched()
    //   return;
    // }
    if (this.currentCategoryId()) {
      // const { name, slug } = this.categoryForm.value
      // this.preparedEdit({ id: this.currentCategoryId() ?? '', name: name ?? '', slug: slug ?? '' })
      this.onUpdate()
    } else {
      this.onCreate()
    }


  }

  onCreate() {
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
        this.closeModal()
      }
    })
  }

  onDelete(id: string) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        this.categoryResource.set(this.categoryResource.value()?.filter(category => category.id !== id))
        this.toastService.show(`Categoria ${response.name} eliminado exitosamente`, 'success')
      }
    })
  }

  preparedEdit(category: CategoryResponse) {
    this.currentCategoryId.set(category.id)
    this.categoryForm.setValue({
      name: category.name,
      slug: category.slug
    })
    this.modal()?.nativeElement.showModal()
  }
  onUpdate() {
    const { name, slug } = this.categoryForm.value
    console.log("Los nuevos valores son", {
      name, slug
    })
    this.categoryService.updateCategory(this.currentCategoryId()!, { name: name!, slug }).subscribe({
      next: (response) => {
        this.categoryResource.update((currentCategories) => {
          if (!currentCategories) return [];
          return currentCategories.map(category =>
            (category.id === response.id) ? response : category
          )
        })
        this.toastService.show(`Categoria ${response.name} actualizada`)
        this.closeModal()
      }
    })
  }

}
