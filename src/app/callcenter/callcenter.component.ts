import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callcenter',
  templateUrl: './callcenter.component.html',
  styleUrls: ['./callcenter.component.css']
})
export class CallcenterComponent {
  constructor(private router: Router){}
}
