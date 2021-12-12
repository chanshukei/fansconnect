import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goToSupport(): void{
    this.router.navigate(['../supportitem'], {relativeTo: this.route});
  }

  goToPhotoBattle(): void{
    this.router.navigate(['../photobattle'], {relativeTo: this.route});
  }

  goToQuestions(): void{
    this.router.navigate(['../questions'], {relativeTo: this.route});
  }

  goToEvents(): void{
    this.router.navigate(['../events'], {relativeTo: this.route});
  }

  goToIncome(): void{
    this.router.navigate(['../income'], {relativeTo: this.route});
  }
}
