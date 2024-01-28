import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Sale } from '../../interfaces/sales.interfaces';
import { SalesService } from '../../services/sale.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})

export default class ChartComponent implements OnInit {
  salesData: Sale[] = [];

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.fetchSalesData();
  }

  fetchSalesData() {
    this.salesService.getSales().subscribe(
      (data: Sale[]) => {
        this.salesData = data;
        this.renderBarChart();
        this.renderLineChart();
      },
      (error) => {
        console.error('Error fetching sales data:', error);
      }
    );
  }

  renderBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.salesData.map(sale => sale.year.toString()),
        datasets: [{
          label: 'Amount',
          data: this.salesData.map(sale => sale.amount),
          backgroundColor: this.salesData.map(sale => sale.colorcode),
          borderWidth: 1
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

  renderLineChart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;

    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.salesData.map(sale => sale.year.toString()),
        datasets: [{
          label: 'Amount',
          data: this.salesData.map(sale => sale.amount),
          borderColor: this.salesData.map(sale => sale.colorcode),
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointBackgroundColor: this.salesData.map(sale => sale.colorcode),
          pointBorderColor: this.salesData.map(sale => sale.colorcode),
          pointHoverBackgroundColor: this.salesData.map(sale => sale.colorcode),
          pointHoverBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          pointHitRadius: 10,
          pointBorderWidth: 2,
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
