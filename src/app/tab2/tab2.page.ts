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

  // TODO
  timeRange: any;
  inverter1Total = 0;
  inverter2Total = 0;
  productionTotal = 0;
  consumptionTotal = 0;
  total = 0;

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
          data: [],
          borderColor: '#2196F3',
          backgroundColor: 'rgba(0, 0, 0, 0)', // Un azul sólido para Inversor 1
          tension: 0.1,
          fill: false, // Cambiar a true para llenar el área bajo la línea
          pointRadius: 0,
          type: 'line'
        },
        {
          label: 'Inversor 2',
          data: [],
          borderColor: '#FFEB3B',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          tension: 0.1,
          fill: false,
          pointRadius: 0,
          type: 'line'
        },
        {
          label: 'Producción',
          data: [],
          borderColor: '#8BC34A',
          backgroundColor: 'rgba(139, 195, 74, 0.5)',
          // backgroundColor: '#ffc107', // Un amarillo sólido para Producción
          tension: 0.1, // Cambiar la tensión para una curva más suave
          fill: true,
          pointBackgroundColor: 'rgba(0, 128, 0, 1)',
          pointRadius: 0, // Hacer los puntos un poco más grandes
          type: 'line'
        },
        {
          label: 'Consumo',
          data: [],
          borderColor: '#F44336', // Cambiar a un color más visible
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Un rojo sólido para Consumo
          tension: 0.1,
          fill: true,
          pointBackgroundColor: '#dc3545', // Asegurarse de que los puntos sean visibles
          pointRadius: 0, // Hacer los puntos un poco más grandes
          type: 'line'
        }
      ],
      labels: []
    } as ChartData<'line'>;
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
    this.historicChartData.labels = history.map(record => {
      // Convert timestr to a more readable format if necessary, or just use it as is
      let timeString = (record.inverter_1) ? record.inverter_1.timestr : record.inverter_2.timestr;
      const date = new Date(timeString);
      return `${date.getHours()}:${date.getMinutes()}`;
    });

    // TODO Arreglar el comando de subida para que espere a tener los dos inverters
    const inverter1Data = history.map(record => record.inverter_1.pvInputPower);
    const inverter2Data = history.map(record => record.inverter_2.pvInputPower);
    const productionData = history.map(record => {
        return record.inverter_1.pvInputPower + record.inverter_2.pvInputPower;
      }
    );
    const consumptionData = history.map(record => record.inverter_1.totalAcOutputActivePower);
    this.historicChartData.datasets = [
      {...this.historicChartData.datasets[0], data: inverter1Data},
      {...this.historicChartData.datasets[1], data: inverter2Data},
      {...this.historicChartData.datasets[2], data: productionData},
      {...this.historicChartData.datasets[3], data: consumptionData},
    ];
  }
}
