import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;

  constructor(private apiService: AuthService,) {
  
  }

  // updatePaginatedItems(): void {
  //   console.log("Getting paginated items");
  //   const allItems: {job: Jobs, jobDetail: JobDetails}[] = [];
  //   this.jobs.forEach(job => {
  //     job.jobDetails.forEach(jobDetail => {
  //       allItems.push({ job, jobDetail });
  //     });
  //   });
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   this.paginatedItems = allItems.slice(startIndex, startIndex + this.pageSize);
  //   // return this.jobs.slice(startIndex, endIndex);
  //   //this.paginatedItems = this.jobs.slice(startIndex, startIndex + this.pageSize);
  // }

  // getTotalPages(): number {
  //   const totalItems = this.jobs.reduce((count, parent) => count + parent.jobDetails.length, 0);
  //   return Math.ceil(totalItems / this.pageSize);
  //   //return Math.ceil(this.jobs.length / this.pageSize);
  // }

  // changePage(page: number): void {
  //   if (page >= 1 && page <= this.getTotalPages()) {
  //     this.currentPage = page;
  //   }
  // }

  // goToPage(page: number): void {
  //   this.currentPage = page;
  //   this.onFilterChange(this.filterText)
  //   //this.updatePaginatedItems();
  // }


}
