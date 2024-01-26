import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartData, ChartDataset} from "chart.js";
import {HistoryRecord, Inverter, InverterService} from "../services/inverter-service.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public historicChartData: ChartConfiguration<'line'>['data'];
  public historicChartOptions: ChartConfiguration<'line'>['options'];
  // TODO
  timeRange: any;

  constructor(private inverterService: InverterService) {
    this.historicChartData = {
      datasets: [],
      labels: []
    } as ChartConfiguration<'line'>['data'];
  }

  ngOnInit() {
    this.initChartData();
    this.fetchHistoricData();
  }

  initChartData(): void {
    this.historicChartData = {
      datasets: [
        {
          label: 'Inversor 1',
          data: [], // Data must be typed as number[] or {x: any, y: number}[]
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
          fill: false,
        },
        {
          label: 'Inversor 2',
          data: [], // Data must be typed as number[] or {x: any, y: number}[]
          borderColor: 'rgba(54, 162, 235, 1)',
          tension: 0.1,
          fill: false,
        },
        {
          label: 'Producción',
          data: [], // Data must be typed as number[] or {x: any, y: number}[]
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
          fill: false,
        },
        {
          label: 'Consumo',
          data: [], // Data must be typed as number[] or {x: any, y: number}[]
          borderColor: 'rgba(255, 206, 86, 1)',
          tension: 0.1,
          fill: false,
        }
      ],
      labels: [] // Labels must be typed as string[]
    } as ChartData<'line'>; // Type cast to ChartData<'line'>
  }

  fetchHistoricData() {
    // Determinar el timestamp para 'lastDay', que sería 24 horas atrás desde ahora.
    const now = new Date();
    const lastDayTimestamp = now.setDate(now.getDate() - 1);

    // Llamar al servicio pasando el timestamp de inicio
    this.inverterService.getHistoricData(lastDayTimestamp).subscribe(data => {
      this.processHistoricData(data);
    });
  }

  processHistoricData(history: HistoryRecord[]) {
    // Extract the labels for the chart
    console.log(history)
    this.historicChartData.labels = history.map(record => {
      // Convert timestr to a more readable format if necessary, or just use it as is
      let timeString = (record.inverter_1) ? record.inverter_1.timestr : record.inverter_2.timestr;
      const date = new Date(timeString);
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    });
    // TODO Arreglar el comando de subida para que espere a tener los dos inverters
    const inverter1Data = history.map(record => record.inverter_1.pvInputPower);
    const inverter2Data = history.map(record => record.inverter_2.pvInputPower);
    const productionData = history.map(record => record.inverter_1.pvInputPower);
    const consumptionData = history.map(record => record.inverter_1.totalAcOutputActivePower);
    this.historicChartData.datasets = [
      {...this.historicChartData.datasets[0], data: inverter1Data},
      {...this.historicChartData.datasets[1], data: inverter2Data},
      {...this.historicChartData.datasets[2], data: productionData},
      {...this.historicChartData.datasets[3], data: consumptionData},
    ];

    // If you're using a library like ng2-charts, you might need to trigger chart update manually
    // For example, if you have ViewChild for the chart, you can call chart.update()
  }
}
