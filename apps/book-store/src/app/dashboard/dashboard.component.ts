import { Book } from './../models/book';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'online-cart-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public booksList: Book[];
  public recentSearchs: string[];

  constructor() { }

  ngOnInit() {
    this.booksList = [];
  }

  searchBooks( form: NgForm ) {

  }

}
