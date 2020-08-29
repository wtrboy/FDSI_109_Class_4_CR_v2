import { Component } from '@angular/core';
import { Friend } from '../models/friend';
import { DataService } from '../services/data.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  model = new Friend();
  myFriends: Friend[] = [];

  constructor(private data: DataService, private shared: SharedService) {
    this.data.getAllfriends().subscribe(list => {
      this.myFriends = list.filter(f => f.friendOf === this.shared.userName);
      console.log(this.myFriends);
      console.log(this.myFriends.length);
    });
  }

  // source Type:
  // 0 - Choose from Gallery
  // 1 - Take pic with camera

  choosePic(sourceType: number) {

  }

  onSave() {
    this.model.friendOf = this.shared.userName;
    console.log(this.model);
    this.data.saveFriend(this.model);


    // clear form
    this.model = new Friend();
  }
}
