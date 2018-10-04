import {Meteor} from 'meteor/meteor'
import {Template} from 'meteor/templating'

import './user.js'
import './body.html'
import '../api/users.js'

Template.body.onCreated(function whenCreated(){
	Meteor.subscribe('users');
	Session.set('search', '');
})

Template.body.helpers({
	users(){
		return Meteor.users.find({"username" : { $regex: Session.get('search'), $options: 'i' }, _id: {$ne: Meteor.userId()}});
	},
	subscriptionsCount(){
		let user = Meteor.users.findOne({_id: Meteor.userId()});
		return user.subscriptions ? user.subscriptions.length : 0;
	},
	followersCount(){
		let user = Meteor.users.findOne({_id: Meteor.userId()});
		return user.followers ? user.followers.length : 0;
	}
})

Template.body.events({
	'keyup .find-user'(event, instance){
		event.preventDefault();

    const target = event.target;
    const username = target.value;

    Session.set('search', username)
	}
})
