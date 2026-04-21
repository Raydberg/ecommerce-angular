import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '@auth/interfaces/user.interface';

@Component({
  selector: 'user-table',
  imports: [RouterLink],

  templateUrl: './user-table.html',
})
export class UserTable {

  users = input.required<User[]>()

}
