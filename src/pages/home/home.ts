import {AlertController} from 'ionic-angular';
import { Component } from '@angular/core';
import {GroceriesServiceProvider} from '../../providers/groceries-service/groceries-service';
import {InputDialogServiceProvider} from '../../providers/input-dialog-service/input-dialog-service';
import { NavController } from 'ionic-angular';
import {SocialSharing} from '@ionic-native/social-sharing';
import {ToastController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
//Defining a variable called title to hold the value of ion title in ion toolbar
  title = "Grocery";
  items = [];
  errorMessage: string;
  

//injecting ToastController and AlertController, GroceriesServiceProvider and socialSharing in the constructor
constructor(public navCtrl : NavController, public toastCtrl : ToastController, public alertCtrl : AlertController, public dataService : GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing){
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }
ionViewDidLoad(){
 this.loadItems();
}
//function for getting items
  loadItems() {
    this.dataService.getItems() 
    .subscribe( 
      items => this.items = items,
      error => this.errorMessage = <any>error);
   
  }
  //Defining removeItem function for removing items and show the removed item in a toast
  removeItem(id) {
    this.dataService.removeItem(id);
    
}
//Defining shareItem function to be used for social sharing feature of ionic native
   shareItem(item, index) {
    console.log("Sharing Item - ", item, index);
    const toast = this
    .toastCtrl
    .create({
      message: 'Sharing Item - ' + index + "...",
      duration: 3000
    });
    toast.present();
 
    let message = "Grocery Item - Name: " + item.name + "Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";
    this.socialSharing.share(message, subject)
    .then(() => {
      console.log("Shared successfully");
  })
   .catch((error) => {
     console.log("Error while sharing ", error);
    
  });
}
//editing items
  editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = this
      .toastCtrl
      .create({ message: 'Editing Item - ' + index + "...", duration: 3000 });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
    
  }
  //adding items
   addItem(){
     console.log("Adding item")
     this.inputDialogService.showPrompt();
   }

  }


