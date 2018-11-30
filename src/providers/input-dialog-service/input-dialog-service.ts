import {AlertController} from 'ionic-angular';
import {GroceriesServiceProvider} from '../../providers/groceries-service/groceries-service';
import { Injectable } from '@angular/core';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

constructor(public alertCtrl : AlertController, public dataService : GroceriesServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

showPrompt(item?, index?) {
  const prompt = this
    .alertCtrl
    .create({
      title: item?'Edit item': 'Add item',
      message:item?'Please edit item...': 'Please enter item...',
      inputs :  [     
        {
          name: 'name',
          placeholder: 'Name',
          value: item? item.name: null
        },
         {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item? item.quantity: null         
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Save',
          handler: data => {
            console.log('Save handler', data);
            if (index !== undefined){
              item.name = data.name;
              item.quantity = data.quantity;
              this.dataService.editItem(item, index);
              
            }
            else{
              this.dataService.addItem(data);
            }
            
          }
        }
      ]
    });
  prompt.present();
}
}
