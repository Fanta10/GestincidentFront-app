import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';
import { Rex } from '../models/rex';

@Component({
  selector: 'app-rex',
  templateUrl: './rex.component.html',
  styleUrls: ['./rex.component.css']
})
export class RexComponent implements OnInit {
  mat! : Rex;
  rexp : Rex[] = [];
  myFormenv! : FormGroup;
  productId! : number;

  rexPage : any={};

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private appComponent:AppComponent,
  ) { }

  ngOnInit() {
    this.getRexPage(0, 3);
    //this.getRexPages(0, 10);
    this.appComponent.routeTitle = "Liste des Rex d'applications"
    this.myFormenv = this.fb.group({

      idRex : 0,
      nom:['', Validators.required],
      prenom:['', Validators.required],
      fonction:['', Validators.required],


      })


    this.service.listRex().subscribe((response : any) => {
      this.rexp = response;
      console.log(this.rexp);

  });
  }
  chargeData(rex: Rex){
    this.mat = rex;
    this.myFormenv.patchValue({
      idRex: rex.idRex,
      nom: rex.nom,
      prenom: rex.prenom,
      fonction: rex.fonction
    });

  }
  delete(materiel:Rex){
    this.service.deleteRex(materiel.idRex).subscribe({
      next : data => {
        //console.log(data);
        alert("succes")
        window.location.reload();
      },
      error : error => {
        console.log(error)
        alert("error")
      }
    });


  }

  edit(){
    this.service.updateRex(this.myFormenv.value).subscribe({
      next : data1 => {
        console.log(data1);
        //alert("succes")
        //console.log(data1)
        window.location.reload();
      },
      error : error => {
        console.log(error)
        alert("error")
      }
    });

  }




  getRexPage(pageNumber: number, pageSize: number): void {
    this.service.getRexPage(pageNumber, pageSize).subscribe(
      (response) => {
        console.log('Rex Page:', response);
        this.rexPage = response;
        // Vous pouvez maintenant utiliser this.rexPage.content pour accéder à la liste des éléments Rex.
      },
      (error) => {
        console.error('Error fetching Rex Page:', error);
        // Gérez l'erreur, par exemple, affichez un message à l'utilisateur.
      }
    );
  }

  getRexPages(pageNumber: number, pageSize: number): void {
    this.service.getEnvPage(pageNumber, pageSize).subscribe(
      (response) => {
        console.log('Rex Page:', response);
        this.rexPage = response;
      },
      (error) => {
        console.error('Error fetching Rex Page:', error);
      }
    );
  }

}
