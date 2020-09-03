import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Asientos } from './asientos';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  info;
  resultado;
  slideOpts = {
    initialSlide: 1,
    speed: 1000
  };


  constructor(private servis : DataService,
    public loadingController: LoadingController,
    private router : Router) {
        
  }

  async ngOnInit(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    
    await loading.present();
    await this.servis.asientos.subscribe(
      async datos =>{
        this.asientos = await datos;
        this.saldo();
        loading.dismiss();
      }
    )
    
  }

  asientos : Asientos[];

  verMas( id : any)
  {
    if(id != this.info)
    {
      this.info = id;
    }
    else
    {
      this.info = "";
    }

    console.log(new Date());
  }


  saldo()
  {
    let totalDebe = 0;
    let totalHaber = 0;
      
    this.asientos.forEach(item => {
      if(item.debe)
      {
        totalDebe += item.debe;     
      }
      else
      {
        totalHaber += item.haber;
      }
    });

    this.resultado = totalDebe - totalHaber;
  }

  eliminarAsiento(id)
  {
    this.servis.deleteAsiento(id);
  }

  editarAsiento( asiento : Asientos)
  {
    localStorage.setItem("editable",JSON.stringify(asiento));
    this.router.navigateByUrl("formulario/" + asiento.id);
  }

}
