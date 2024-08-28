import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-weight-details',
  templateUrl: './view-weight-details.component.html',
  styleUrl: './view-weight-details.component.scss'
})
export class ViewWeightDetailsComponent implements OnInit {
  @Input() jobQuantities: any;

  constructor() {}
  ngOnInit(): void {
    console.log(this.jobQuantities);
    
  }

}
