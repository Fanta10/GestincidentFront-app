import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';
import { Logiciel } from '../models/logiciel';
import { Rex } from '../models/rex';

@Component({
  selector: 'app-logiciel',
  templateUrl: './logiciel.component.html',
  styleUrls: ['./logiciel.component.css']
})
export class LogicielComponent implements OnInit{
  materiels: Logiciel[] = [];
  rexList : Rex[] = [];
  mat! : Logiciel;
  myFormenv! : FormGroup;
  //mat! : Environ
  appPage!: any;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private appComponent:AppComponent,
  ) { }

  ngOnInit(): void {

    this.getAppPage(0,3)

    this.appComponent.routeTitle = "Liste des applications"

    this.myFormenv = this.fb.group({

      idApp : 0,
      libelleApp:['', Validators.required],
      descriptionApp:['', Validators.required],
      rex:['', Validators.required]




      })
    //getAllMateriel(){
      this.service.listLogiciel().subscribe((response : any) => {
        this.materiels = response;
        //console.log('jj' + this.materiels);

    });

      this.service.listRex().subscribe((data : any) => {
        this.rexList = data;
        console.log(this.rexList);
      });








  }
  chargeData(appl : Logiciel){
    this.mat = appl;
    this.myFormenv.patchValue({
      idApp: appl.idApp,
      libelleApp: appl.libelleApp,
      descriptionApp: appl.descriptionApp,
      rex: appl.rex.idRex




    });
  }
  delete(materiel: Logiciel){

    this.service.deleteLogiciel(materiel.idApp).subscribe({
      next : data => {
        //console.log(data);
       // alert("succes")
        window.location.reload();
      },
      error : error => {
        console.log(error)
        alert("error")
      }
    });


  }
  edit(){
    let idApp = this.myFormenv.get('idApp')?.value;
    // let libelleApp = this.myFormenv.get('libelleApp')?.value;
    // let descriptionApp = this.myFormenv.get('descriptionApp')?.value;
    // let rex = this.myFormenv.get('rex')?.value;
    this.service.updateLogiciel(idApp, this.myFormenv.value).subscribe({
      next : data1 => {
        console.log(data1);
        alert("succes")
        console.log(this.myFormenv.value)
        window.location.reload();
      },
      error : error => {
        console.log(error)
        alert("error")
      }
    });
    console.log(this.myFormenv.value)
  }

  getAppPage(pageNumber: number, pageSize: number) {
    this.service.getAppPage(pageNumber, pageSize).subscribe(
      (response) => {
        console.log('app Page:', response);
        this.appPage = response;
      },
      (error) => {
        console.error('Error fetching Rex Page:');
      }
    );
  }

}
