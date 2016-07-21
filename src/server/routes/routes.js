import testRoutes from './testRoutes';
import legislatorRoutes from './legislatorRoutes';
import testControllers from '../controllers/testcontrollers.js';

module.exports = function(app, passport) {

  // route for home page
  app.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });

  app.use('/test', testRoutes);

  app.get('/api/test', authorize, (req, res) => {
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
  app.get('/loadUser', authorize, function(req, res) {
      res.send(req.user || null);  // get the user out of session and send it back
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
      failureRedirect : '/'
    }));

};

// route middleware to make sure a user is logged in
function authorize(req, res, next) {
  console.log('authorizing');
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log('req.isAuth ==', req.isAuthenticated());
    res.status(401).send('not authorized');
  }
}
