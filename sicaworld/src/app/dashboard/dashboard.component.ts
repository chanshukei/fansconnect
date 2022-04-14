import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { EventService } from '../service/event.service';
import { Expense } from '../model/expense';
import { Income } from '../model/income';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  isLoading: boolean = true;
  total: number = 0;
  expenses: Expense[] = [];
  incomes: Income[] = [];
  incomeSummarys: Income[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.router.navigate(['../dashboard'], {relativeTo: this.route});
      });
    }

    backToHome(): void{
      this.router.navigate(['../home'], {relativeTo: this.route});
    }

  ngOnInit(): void {
    this.listResult();
    this.listExpense();
  }

  listExpense(): void{
    this.eventService.getExpenses(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: Expense = {
            idolId: e[i].idolId,
            expenseId: e[i].expenseId,
            amount: e[i].amount,
            createDate: e[i].createDate,
            expenseDescription: e[i].expenseDescription
          };
          this.total -= e2.amount;
          this.expenses.push(e2);
        };
      }
    );
  }

  listResult(): void{
    this.isLoading = true;
    this.eventService.getIncomes(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: Income = {
            idolId: e[i].idolId,
            incomeId: e[i].incomeId,
            payeeName: '',
            tgId: '',
            amount: e[i].amount,
            createDate: e[i].createDate,
            imageContent: '',
            answer1: e[i].answer1,
            answer2: e[i].answer2,
            answer3: e[i].answer3,
            answer4: e[i].answer4,
            answer5: e[i].answer5
          };
          this.total += e2.amount;
          this.incomes.push(e2);
        };

        //sumary
        this.createSummary();

        //pie
        this.createChart1();
        this.createChart2();

        this.isLoading = false;
      }
    );
  }

  createSummary(): void{
    var answer52 = '';
    var amount2 = 0;
    var date2 = new Date('1900-01-01');
    for(var i=0; i<this.incomes.length; i++){
      if(this.incomes[i].createDate == date2){
        amount2 += this.incomes[i].amount;
      }else{
        if(amount2>0){
          var income1: Income = {
            incomeId:0,
            amount: amount2,
            createDate: date2,
            tgId: '', payeeName: '',
            imageContent: '',
            answer1: '', answer2: '', answer3: '', answer4: '', answer5: answer52,
            idolId: 0
          };
          this.incomeSummarys.push(income1);
        }
        date2 = this.incomes[i].createDate;
        amount2 = this.incomes[i].amount;
        answer52 = this.incomes[i].answer5;
      }
    }

    if(amount2>0){
      var income1: Income = {
        incomeId:0,
        amount: amount2,
        createDate: date2,
        tgId: '', payeeName: '',
        imageContent: '',
        answer1: '', answer2: '', answer3: '', answer4: '', answer5: '',
        idolId: 0
      };
      this.incomeSummarys.push(income1);
    }

  }

  createChart1(): void{
    const chartData = {
      datasets: [
        {
          data: [],
          backgroundColor: []
        }
      ],
      labels: []
    };
    const canvas = document.getElementById('doughnut') as HTMLCanvasElement

    var opt1 = 0;
    var opt100 = 0;
    var opt500 = 0;
    var opt1000 = 0;
    var opt2000 = 0;
    this.incomes.forEach( i=>{
      if(i.amount<100)
        opt1++;
      else if(i.amount<500)
        opt100++;
      else if(i.amount<1000)
        opt500++;
      else if(i.amount<2000)
        opt1000++;
      else
        opt2000++;
    });

    new Chart(canvas,
      {
        type: 'pie',
        data: {
            labels: ['< $100', '$100 ~ $499', '$500 ~ $999', '$1000 ~ $1999', '> $1999'],
            datasets: [{
                label: '眾籌能量',
                data: [opt1, opt100, opt500, opt1000, opt2000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
        }
      }
      );
  }

  createChart2(): void{
    const chartData = {
      datasets: [
        {
          data: [],
          backgroundColor: []
        }
      ],
      labels: []
    };
    const canvas = document.getElementById('doughnut2') as HTMLCanvasElement

    var opt1 = 0;
    var opt2 = 0;
    var opt3 = 0;
    var opt4 = 0;
    this.incomes.forEach( i=>{
      if(i.answer1.indexOf('公益')>=0)
        opt1++;
      if(i.answer1.indexOf('印其他應援物')>=0)
        opt2++;
      if(i.answer1.indexOf('媒體廣告')>=0)
        opt3++;
      if(i.answer1.indexOf('線下活動')>=0)
        opt4++;
    });

    new Chart(canvas,
      {
        type: 'pie',
        data: {
            labels: ['公益','印其他應援物','媒體廣告','線下活動'],
            datasets: [{
                label: '眾籌能量',
                data: [opt1, opt2, opt3, opt4],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
        }
      }
      );
  }

}
