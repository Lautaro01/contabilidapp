import { Component, OnInit } from '@angular/core';
import { Asientos } from '../home/asientos';
import { DataService } from '../home/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  debe = true;
  monto : number = 0;
  editar : boolean;
  asiento : Asientos ={
    titulo : "",
    debe : null,
    haber : null,
    date : new Date(),
    detalle : "",
    id : ""
  }

  constructor(private servis : DataService, private ruta : ActivatedRoute) { }

  ngOnInit() {
    let id = this.ruta.snapshot.paramMap.get('id');
    if(id != "false")
    {
      this.editar = true;
      this.servis.getAsientoUnico(id).subscribe(
        async asientoViejo=>
        {
          this.asiento = await asientoViejo.payload.data() as Asientos;
          if(this.asiento.debe)
          {
            this.monto = this.asiento.debe;
          }
          else
          {
            this.monto = this.asiento.haber;
          }
        }
      )
    }
    else
    {
      this.editar = false;
      console.log("sin editar");
    }
  }

  altaAsiento()
  {
    if(this.debe)
    {
      this.asiento.debe = this.monto;
      this.asiento.haber = null;
    }
    else
    {
      this.asiento.haber = this.monto;
      this.asiento.debe = null;
    }


    console.log(this.asiento);
    this.servis.setAsiento(this.asiento);
  }

  asientoEditado()
  {
    if(this.debe)
    {
      this.asiento.debe = this.monto;
      this.asiento.haber = null;
    }
    else
    {
      this.asiento.haber = this.monto;
      this.asiento.debe = null;
    }
    
    this.servis.updateAsiento(this.asiento);
  }

}
