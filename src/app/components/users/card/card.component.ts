import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';



import { User } from '../../../interfaces/user.interface';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { UsersService } from '../../../services/user.service';
import EditComponent from '../edit/edit.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,

    EditComponent,

    RouterModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
  @Input() public user!: User;
  @Output() userDeleted = new EventEmitter<number>();
  @Output() userUpdated = new EventEmitter<void>();
  public users: User[] = []; // Agrega esta línea

  constructor(
    private usersService: UsersService,
    @Inject(MatDialog) private dialog: MatDialog
  ) { }


  onEditUser(user: User) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: user,
      // width: '400px',

    });

    dialogRef.afterClosed().subscribe(() => {
      this.userUpdated.emit(); // Emitir el evento
    });
  }

  onDeleteUser(id: number, user: User) {
    if (!id) throw new Error('Usuario id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: this.user });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.usersService.deleteUserById(id).subscribe(() => {
          this.userDeleted.emit(id);
          this.loadUsers(); // Llama a loadUsers después de eliminar un usuario
        }, error => {
          console.error('Error deleting user:', error);
        });
      }
    });
  }

  loadUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
