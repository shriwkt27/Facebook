
/**
 * Module dependencies.
 */

var express = require('express')
  //, routes = require('./routes')
  
  , http = require('http')
  , path = require('path')
  //, signUp = require('./routes/signUp')
  ,home = require('./routes/home')
  ,landingPage = require('./routes/landingPage')
  ,groups= require('./routes/groups')
  ,about= require('./routes/about')
  ,friends= require('./routes/friends')
  ,interests = require('./routes/interests');
var app = express();

//Session code 
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({   
	cookieName: 'session',    
	secret: 'This is my secret string for encryption',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,  }));

// session code end here

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', home.home);
app.get('/home',home.home);
app.post('/login',home.login);
app.get('/signUp', home.signUp);
app.post('/register',home.register);
app.get('/logout',home.logout);
app.post('/groupmembers',landingPage.displayGroup);
app.post('/post',landingPage.postIt);
app.get('/getnewsfeed',landingPage.getNewsFeed);
app.get('/fetchallposts',landingPage.fetchAllPosts);
app.get('/creategroup',groups.createGroupPage);
app.post('/createnewgroup',groups.createNewGroup);
app.post('/addmember',groups.addMember);
app.post('/removemember',groups.removeMember);
app.post('/deletegroup',groups.deleteGroup);
app.get('/about',about.about);
app.get('/showlifeevents',about.showLifeEvents);
app.post('/addlifeevent',about.addLifeEvent);
app.get('/friends',friends.friendList);
app.get('/findfriends',friends.findFriend);
app.post('/friendrequest',friends.friendRequest);
app.get('/showrequests',friends.showFriendRequests);
app.post('/confirm',friends.confirmFriendRequest);
app.post('/deletefriendrequest',friends.deleteFriendRequest);
app.get('/interests',interests.showInterests);
app.get('/interestsload',interests.loadData);
app.post('/addmusic',interests.addMusic);
app.post('/addshows',interests.addShows);
app.post('/addsports',interests.addSport);
app.get('/displaymusic',interests.displayMusic);
app.get('/displaytvshow',interests.displayShow);
app.get('/displaysport',interests.displaySport);

//app.post('/signUpComplete', home.signUpComplete);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
