import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { User } from '../../../interfaces/user.interface';
import { UsersService } from '../../../services/user.service';

@Component({
    selector: 'app-edit',
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
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.scss'
})
export default class EditComponent implements OnInit {
  public userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      id: [user.id],
      first_name: [user.first_name, Validators.required],
      last_name: [user.last_name, Validators.required],
      email: [user.email, Validators.required],
      phone: [user.phone, Validators.required],
      location: [user.location, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.usersService.getUserById(id)))
        .subscribe((user) => {
          if (!user) {
            this.router.navigateByUrl('/');
          } else {
            this.userForm.reset(user);
          }
        });
    }
  }

  get currentUser(): User {
    return this.userForm.value as User;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    // this.dialogRef.close(true)
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.currentUser.id) {
        this.usersService.updateUser(this.currentUser).subscribe((user) => {
          console.log(`${user.first_name} updated!`);
          this.dialogRef.close(user); // Pasar los datos del usuario
        });
      } else {
        this.usersService.addUser(this.currentUser).subscribe((user) => {
          console.log(`${user.first_name} added!`);
          this.dialogRef.close(user); // Pasar los datos del usuario
        });
      }
    }
  }
}
