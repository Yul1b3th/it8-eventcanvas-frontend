import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, } from '@angular/core';

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

import { ChangeDetectorRef } from '@angular/core';




import { User } from '../../../interfaces/user.interface';
import { CardComponent } from '../card/card.component';
import { UsersService } from '../../../services/user.service';
import { filter, switchMap } from 'rxjs';
import AddComponent from '../add/add.component';


@Component({
    selector: 'app-list',
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
        CommonModule,
        CardComponent,
        AddComponent,
    ],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})

export class ListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUsers();

    // Suscríbete al Subject userAdded en el servicio
    this.usersService.userAdded.subscribe(() => {
      // Cuando se agrega un nuevo usuario, vuelve a cargar la lista de usuarios
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.cd.markForCheck(); // Indica a Angular que debe verificar este componente para posibles cambios
      });
  }

  edit() {

  }

  handleUserDeleted(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  onAddUser() {
    const dialogRef = this.dialog.open(AddComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.addUser(result).subscribe(newUser => {
          this.loadUsers(); // Vuelve a cargar la lista de usuarios después de agregar un nuevo usuario
        });
      }
    });
  }

  onUserUpdated(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users; // Actualiza la lista de usuarios
    });
  }
}


