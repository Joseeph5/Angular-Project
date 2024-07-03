// src/app/components/layout/nav-bar/nav-bar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports: [RouterLink, NgIf],
})
export class NavBarComponent implements OnInit {
  showAccount: boolean = false;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleAccount(): void {
    this.showAccount = !this.showAccount;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
