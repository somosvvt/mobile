
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DetallePage } from '../detalle/detalle';
import { HttpProvider } from '../../providers/http-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[HttpProvider]
})
export class HomePage {

  newsData: any;
  loading: any;

  constructor(public navCtrl: NavController, private httpProvider:HttpProvider,public loadingCtrl: LoadingController) {

    this.loading = this.loadingCtrl.create({
      content: `
      <ion-spinner ></ion-spinner>`
    });

    this.getdata();
  }

	  getdata(){
	    this.loading.present();
	    this.httpProvider.getJsonData().subscribe(
	      result => {
	        this.newsData=result.topic_list.topics;
	       // console.log("Success : "+this.newsData);
	      },
	      err =>{
	        console.error("Error : "+err);
	      } ,
	      () => {
	        this.loading.dismiss();
	      //  console.log('getData completed');
	      }
	    );
	  }

	itemTapped(event, item) {
     this.navCtrl.push(DetallePage, {
      item: item
    });
  }
}
