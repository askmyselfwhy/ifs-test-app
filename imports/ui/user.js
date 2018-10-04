import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import './user.html';

Template.user.onCreated(function whenCreated(){
	this.user = Meteor.user()
})

Template.user.helpers({
	username(){
		return this.username;
	},
  isSubscribed(){
 		if(this.followers){
 	 		const arr = this.followers.filter(id => id === Meteor.userId())
 	 		if(arr.length > 0){
				return true;	
 	 		}
 			return false;
 		}
 		return false;
  }
})

Template.user.events({
	'click .follow'(event){
		Meteor.call('users.follow', this._id);
	},
	'click .unfollow'(event){
		Meteor.call('users.unfollow', this._id);
	}
})