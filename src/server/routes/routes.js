import testRoutes from './testRoutes';
import legislatorRoutes from './legislatorRoutes';
import testControllers from '../controllers/testcontrollers.js';

module.exports = function(app, passport) {

  // route for home page
  app.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });

  app.use('/test', testRoutes);

  app.get('/api/test', isLoggedIn, (req, res) => {
    console.log('api/test callback hit')
    res.send('yo dog')
  });

  app.get('/twitter/redirect', function(req, res) {
    res.send('twitter redirect')
  })

  // app.use('/api/test', testRoutes);

  app.use('/api/legislators', legislatorRoutes);

  app.get('/loadInfo', function (req, res) {
    res.send({
      message: "This message came from the newer api server",
      time: Date.now()
    })
  })

  // app.get('/loadAuth', function (req, res) {
  //   res.send(req.session.user || null)
  // })

  // route for showing the profile page
  app.get('/loadAuth', function(req, res) {
    console.log('/loadAuth hit');
    if (req.isAuthenticated()) {
      console.log('/loadAuth req authorized')
      res.send({
        user : req.user // get the user out of session and pass to template
      });
    } else {
      console.log('req.isAuth ==', req.isAuthenticated());
      res.send(401, 'no login found');
    }

  });

  // route for logging out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // facebook routes

  // =====================================
  // TWITTER ROUTES ======================
  // =====================================
  // route for twitter authentication and login
  app.get('/auth/twitter', passport.authenticate('twitter'));

  // handle the callback after twitter has authenticated the user
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
      successRedirect : 'http://localhost:3000/',
      failureRedirect : '/login'
    }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  console.log('user logged in');

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
