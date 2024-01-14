import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartData} from 'chart.js';
import {DEFAULT_INVERTER, Inverter, InverterService} from "../services/inverter-service.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  ngOnInit() {
    this.updateData();
  }

  inverterOne: Inverter = DEFAULT_INVERTER;
  inverterTwo: Inverter = DEFAULT_INVERTER;
  date: string = '';

  public productionChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Inversor 1', 'Inversor 2', 'Consumo'],
    datasets: [
      {
        data: [],
      }
    ]
  };

  public productionChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    // ... otras opciones de configuración ...
  };

  public batteryChartData: ChartData<'doughnut'> = {
    labels: ['Cargando', 'Descargando'],
    datasets: [
      {
        data: []
      }
    ]
  };


  public batteryChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '50%',
    rotation: 270,
    circumference: 180,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    // ... other chart options ...
  };




  constructor(private inverterService: InverterService) {
  }

  updateData() {
    this.inverterService.getLatestInverterData('inverter_1').subscribe(data => {
      console.log(data);
      this.inverterOne = data;
      this.date = data.timestr;
      this.updateChartData();
    });
    this.inverterService.getLatestInverterData('inverter_2').subscribe(data => {
      this.inverterTwo = data;
      this.updateChartData();
    });
  }

  updateChartData() {
    this.productionChartData = {
      datasets: [
        {
          data: [
            this.inverterOne.pvInputPower,
            this.inverterTwo.pvInputPower,
            this.inverterOne.totalAcOutputActivePower
          ],
          label: 'Producción'
        }
      ]
    };
    this.batteryChartData = {
      datasets: [
        {
          data: [
            this.inverterTwo.batteryVoltage - 22,
            (27.2 - this.inverterTwo.batteryVoltage < 0) ? 0 : 27.2 - this.inverterTwo.batteryVoltage
          ],
          label: 'Baterías',
          backgroundColor: ['#00c853', '#b9f6ca'],
        }
      ]
    };
  }
}
