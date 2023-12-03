import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private router:Router,
    private appComponent: AppComponent){}
    ngOnInit(): void {
      this.appComponent.routeTitle = "Tableau de bord"
    }

  logout(){
    const jwtToken = localStorage.getItem('JWT');
     localStorage.removeItem('JWT');

    this.router.navigate(['/login']);


  }

}
