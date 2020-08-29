import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Friend } from '../models/friend';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allPosts: Observable<Post[]>;
  private allFriends: Observable<Friend[]>;

  // collection: connection between service and my database

  postCollection: AngularFirestoreCollection<Post>;
  friendCollection: AngularFirestoreCollection<Friend>;

  constructor(private fst: AngularFirestore) { 
    this.postCollection = fst.collection<Post>('posts');
    this.friendCollection = fst.collection<Friend>('friends');
  }

  private retrievePosts() {
    this.allPosts = this.postCollection.valueChanges();
  }

  private retrieveFriends() {
    this.allFriends = this.friendCollection.valueChanges();
  }

  public savePost(post){
    let item = Object.assign({}, post); // copy post into a simple object
    this.postCollection.add(item);
  }

  public getAllPosts(){
    this.retrievePosts();
    return this.allPosts; // returning an observable
  }

  public saveFriend(friend) {
    let item = Object.assign({}, friend);
    this.friendCollection
    .add(item)
    .then(() => console.log("Saved correctly"))
    .catch((error) => console.log("Error saving", error));
  }

    public getAllfriends() {
      this.retrieveFriends();
      return this.allFriends;
    }
}

