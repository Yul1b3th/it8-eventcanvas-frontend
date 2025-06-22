// home.component.ts


import { Component } from '@angular/core';


import { ListComponent } from '../users/list/list.component';


@Component({
    selector: 'app-home',
    imports: [
    ListComponent
],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})


export default class HomeComponent {


}
