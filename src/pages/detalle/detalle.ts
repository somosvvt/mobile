import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html'
})
export class DetallePage {

   detallePost: any;
   loading: any;
   selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,public loadingCtrl: LoadingController) {
    this.selectedItem = navParams.get('item');
    this.loading = this.loadingCtrl.create({
      content: `<ion-spinner ></ion-spinner>`
    });

    this.getDetalleVVT();

  }

 getPost(){
    return this.http.get('https://vvt.io/t/'+ this.selectedItem.id +'.json').map(res => res.json());
 }

 getDetalleVVT(){
   this.loading.present();
   this.getPost().subscribe(
     result => {
       this.detallePost=result.post_stream.posts;
     },
     err =>{
       console.error("Error : "+err);
     } ,
     () => {
       this.loading.dismiss();
     }
   );
 }


}
