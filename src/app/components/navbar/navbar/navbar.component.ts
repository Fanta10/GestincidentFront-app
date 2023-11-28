import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router:Router){}
  
  logout(){
    const jwtToken = localStorage.getItem('JWT');
     localStorage.removeItem('JWT');

    this.router.navigate(['/login']);


  }

}
