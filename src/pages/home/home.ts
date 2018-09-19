import { Component } from '@angular/core';
import { NavController, Header } from 'ionic-angular';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { customFunctions } from '../../functions';
import { StockDetailPage } from '../stock-detail/stock-detail';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data=[];
  alldata;

  today: String = new Date().toLocaleDateString();
  start_data;
  end_data;

  constructor(public navCtrl: NavController, private http: Http, private func: customFunctions) {
    this.getData();
  }

  getData(){
    this.start_data = 0;
    this.end_data = 10;
    this.data=[]
    this.func.presentLoading("Loading Stock Data");
      
      var headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');
    let options = new RequestOptions({headers: headers}); 
    
    // let headers = new HttpHeaders({
    //   'Access-Control-Allow-Origin':'*',
    //   'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT',
    //   'Accept':'application/json',
    //   'content-type':'application/json',
    // })

    this.http.get('/data',options)
      .subscribe(data => {
        let json = JSON.parse(data['_body'])
        console.log(json)
        this.func.dismissLoading()
        this.alldata = json;
        this.spliceData(json);
      })
  }
  

  doRefresh(event){
    console.log('Begin async operation', event);
    setTimeout(() => {
      this.getData()
      console.log('Async operation has ended');
      event.complete();
    }, 500);
  }

  doInfinite(event){
    console.log('Begin async operation');
    setTimeout(() => {
      if(this.alldata){
        for(this.start_data=0; this.start_data<this.end_data; this.start_data++){
          this.data.push(this.alldata[this.start_data])
        }
        this.end_data += 10;
        console.log(this.data, this.end_data, this.start_data)
      }
      console.log('Async operation has ended');
      event.complete();
    }, 500);
  }

  spliceData(data){
    if(data){
      for(this.start_data=0; this.start_data<this.end_data; this.start_data++){
        this.data.push(data[this.start_data])
      }
      this.end_data += 10;
      console.log(this.data, this.end_data, this.start_data)
    }
  }

  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.data = this.alldata.filter((stock) => {
        if(val !== undefined){
          return ((stock.companyName .toLowerCase().indexOf(val.toLowerCase()) > -1)) ;
        }
      });
    }
    else{
      this.getData();
    }
  }

  stockDetail(data){
    this.navCtrl.push(StockDetailPage, {data: data});
  }

}
