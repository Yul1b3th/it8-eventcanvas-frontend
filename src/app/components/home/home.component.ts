// home.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


import { ListComponent } from '../users/list/list.component';


@Component({
    selector: 'app-home',
    imports: [
        CommonModule,
        ListComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})


export default class HomeComponent {


}
