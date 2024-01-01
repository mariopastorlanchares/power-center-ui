import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartType, ChartOptions} from 'chart.js';
import {update} from "@angular/fire/database";
import {DEFAULT_INVERTER, Inverter, InverterService} from "../services/inverter-service.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{


  ngOnInit() {
    this.updateData();
  }

  inverter1: Inverter = DEFAULT_INVERTER;
  inverter2: Inverter = DEFAULT_INVERTER;
  date: string = '';

  public batteryChartType: ChartType = 'doughnut';
  public batteryChartData: ChartConfiguration['data'] = {
//    labels: this.batteryLabels,
    datasets: [{
      data: [0, 100],
      backgroundColor: ['#00c853', '#b9f6ca']
    }]
  };
  public batteryChartOptions: ChartOptions = {
    elements: {
      arc: {
        // Configura aquí las opciones de rotación y circunferencia
       // rotation: Math.PI,
      //  circumference: Math.PI
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.data[context.dataIndex] + '%';
            return label;
          }
        }
      }
    }
  };




  constructor(private inverterService: InverterService) {}

  updateData() {
    this.inverterService.getLatestInverterData('inverter_1').subscribe(data => {
      console.log(data);
      this.inverter1 = data;
      this.date = data.timestr;
    });
    this.inverterService.getLatestInverterData('inverter_2').subscribe(data => {
      this.inverter2 = data;
    });
  }
}
