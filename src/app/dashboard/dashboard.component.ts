import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  chartData: any;

  labelData: any[]=[];
  realData: any[]=[];
  colorData: any[]=[];
  constructor(private service: AuthService){}

  ngOnInit(): void {
    this.service.getOutBays().subscribe((data) => {
      console.log(data);
      this.chartData = data.result;
      console.log(this.chartData);
      if (this.chartData != null)
      {
        for (let i = 0; i < this.chartData.length; i++)
        {
          const color = this.getRandomColor();
          console.log(color);
          console.log(this.chartData[i].name);
          this.labelData.push(this.chartData[i].name);
          this.realData.push(this.chartData[i].capacity);
          this.colorData.push(color);
        }
        this.RenderChart(this.labelData, this.realData, this.colorData, 'bar', 'barchart');
        // this.RenderChart(this.labelData, this.realData, this.colorData, 'pie', 'piechart');
        this.RenderChart(this.labelData, this.realData, this.colorData, 'doughnut', 'dochart');
        // this.RenderChart(this.labelData, this.realData, this.colorData, 'radar', 'radarchart');
        // this.RenderChart(this.labelData, this.realData, this.colorData, 'polarArea', 'pochart');
        // this.RenderChart(this.labelData, this.realData, this.colorData, 'bubble', 'bubblechart');
        // this.RenderChart(this.labelData, this.realData, this.colorData, 'scatter', 'scatterchart');
      }
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  RenderChart(labelData:any, mainData:any, colorData: any, type:any, id:any) {
    const ctx = document.getElementById('piechart')
    new Chart(id, {
      type: type,
      data: {
        labels: labelData, // ["Red", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: 'Capicity',
          data: mainData,  //[12, 19, 3, 5, 2, 3],
          backgroundColor: colorData,
          

          borderColor: [
            'rgba(253, 99, 132, 1)',
            'rgba(54, 102, 233, 1)',
            'rgba(255, 208, 88, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,

        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
