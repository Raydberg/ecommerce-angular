import { UserAdminService } from '@admin/services/user-admin.service';
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { UserTable } from "./user-table/user-table";

@Component({
  selector: 'app-users',
  imports: [UserTable],
  templateUrl: './users-admin-page.html',
})
export class UsersAdminPage {


  userService = inject(UserAdminService)
  private readonly paginationService = inject(PaginationService)
  currentPage = this.paginationService.currentPage
  productPerPage = signal(10)
  userRx = rxResource({
    params: () => this.paginationService.currentPage(),
    stream: ({ params: page }) => {
      return this.userService.getAllUsers(page)
    }
  })

}
