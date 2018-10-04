import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.publish('users', function() {
    return Meteor.users.find({});
  })
}

Meteor.methods({
  'users.follow'(userId) {
    check(userId, String);

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    const target = Meteor.users.findOne(userId);
    const current = Meteor.users.findOne(Meteor.userId());
    const meteor_userId = Meteor.userId();

    const newSubscriptions = current.subscriptions ? [...current.subscriptions, userId] : [userId];
    const newFollowers = target.followers ? [...target.followers, meteor_userId] : [meteor_userId];
    
		Meteor.users
					.update({_id: meteor_userId}, {$set: {subscriptions: newSubscriptions}})
		Meteor.users
					.update({_id: userId}, {$set: {followers: newFollowers}})
  },
  'users.unfollow'(userId) {
    check(userId, String);
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
  	const meteor_userId = Meteor.userId();
    const target = Meteor.users.findOne(userId);
    const current = Meteor.users.findOne(Meteor.userId())

    const newSubscriptions = current.subscriptions.filter(id => id !== userId);
    const newFollowers = target.followers.filter(id => id !== meteor_userId);

		Meteor.users
					.update({_id: meteor_userId}, {$set: {subscriptions: newSubscriptions}})
		Meteor.users
					.update({_id: userId}, {$set: {followers: newFollowers}})
  },
});