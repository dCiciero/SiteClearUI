import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-processing-bay-users',
  templateUrl: './processing-bay-users.component.html',
  styleUrl: './processing-bay-users.component.scss'
})
export class ProcessingBayUsersComponent implements OnInit {
  processingBays: any[]=[];
  @Output() selectedBaysEmiiter: EventEmitter<any[]> = new EventEmitter<any[]>;

  selectedBays: any[]=[];

  constructor(private apiService: AuthService) {}

  ngOnInit(): void {
    this.getProcessingBays();
  }

  getProcessingBays() {
    this.apiService.getProcessingBays().subscribe(
      (data: any) => {
        console.log(data);
        if (data.isSuccess) {
          this.processingBays = data.result;
        }
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        console.log("Complete");
      }
    )
  }
  getSelectedPermission(event: any, bay: any) {
    console.log(this.selectedBays);
    console.log(event.target.checked, bay.name);
    if ( event.target.checked) {
      this.selectedBays.push(bay.id)
    } else {
      this.selectedBays.splice(this.selectedBays.indexOf(bay.id), 1)
    }
    console.log(this.selectedBays);
    
    
  }

  confirmSelection() {
    this.selectedBaysEmiiter.emit(this.selectedBays)
  }

}
