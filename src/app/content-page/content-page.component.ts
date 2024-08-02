import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../services/auth.service';

Chart.register(...registerables);

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss'
})
export class ContentPageComponent implements OnInit {
  constructor(private service: AuthService) {}

  chartData: any;

  labelData: any[]=[];
  realData: any[]=[];
  colorData: any[]=[];
  
  ngOnInit(){
    // this.service.getOutBays().subscribe((data) => {
    //   console.log(data);
    //   this.chartData = data.result;
    //   console.log(this.chartData);
    //   if (this.chartData != null)
    //   {
    //     for (let i = 0; i < this.chartData.length; i++)
    //     {
    //       const color = this.getRandomColor();
    //       console.log(color);
    //       console.log(this.chartData[i].name);
    //       this.labelData.push(this.chartData[i].name);
    //       this.realData.push(this.chartData[i].capacity);
    //       this.colorData.push(color);
    //     }
    //     this.RenderChart(this.labelData, this.realData, this.colorData, 'bar', 'barchart');
    //     // this.RenderChart(this.labelData, this.realData, this.colorData, 'pie', 'piechart');
    //     this.RenderChart(this.labelData, this.realData, this.colorData, 'doughnut', 'dochart');
    //     // this.RenderChart(this.labelData, this.realData, this.colorData, 'radar', 'radarchart');
    //     // this.RenderChart(this.labelData, this.realData, this.colorData, 'polarArea', 'pochart');
    //     // this.RenderChart(this.labelData, this.realData, this.colorData, 'bubble', 'bubblechart');
    //     // this.RenderChart(this.labelData, this.realData, this.colorData, 'scatter', 'scatterchart');
    //   }
    // })
    
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  GetChartData()
  {
    this.service.getChartInfo().subscribe((data) => {
      console.log(data);
      this.chartData = data;
      if (this.chartData != null)
      {
        for (let i = 0; i < this.chartData.length; i++)
        {
          console.log(this.chartData[i].name);
          this.labelData.push(this.chartData[i].year);
          this.realData.push(this.chartData[i].amount);
          this.colorData.push(this.chartData[i].colorcode);
        }
        this.RenderChart(this.labelData, this.realData, this.colorData, 'bar', 'barchart');
        this.RenderChart(this.labelData, this.realData, this.colorData, 'pie', 'piechart');
        this.RenderChart(this.labelData, this.realData, this.colorData, 'doughnut', 'dochart');
        this.RenderChart(this.labelData, this.realData, this.colorData, 'radar', 'radarchart');
        this.RenderChart(this.labelData, this.realData, this.colorData, 'polarArea', 'pochart');
        this.RenderChart(this.labelData, this.realData, this.colorData, 'bubble', 'bubblechart');
        this.RenderChart(this.labelData, this.realData, this.colorData, 'scatter', 'scatterchart');
      }
    })
  }

  RenderChart(labelData:any, mainData:any, colorData: any, type:any, id:any) {
    const ctx = document.getElementById('piechart')
    new Chart(id, {
      type: type,
      data: {
        labels: labelData, // ["Red", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of votes',
          data: mainData,  //[12, 19, 3, 5, 2, 3],
          backgroundColor: colorData,
          /*[
            'rgba(253, 99, 132, 0.2)',
            'rgba(54, 102, 233, 0.2)',
            'rgba(255, 208, 88, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],*/

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
