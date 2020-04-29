const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');

const tokenList = {};
const router = express.Router();

function processLogoutRequest(request, response) {
  if (request.cookies) {
    const refreshToken = request.cookies.refreshJwt;
    if (refreshToken in tokenList) delete tokenList[refreshToken];
    response.clearCookie('jwt');
    response.clearCookie('refreshJwt');
  }
  if (request.method === 'POST') {
    response.status(200).json({ message: 'logged out', status: 200 });
  } else if (request.method === 'GET') {
    response.sendFile('logout.html', { root: './public' });
  }
}

router.get('/status', (req, res, next) => {
  res.status(200).json({ status: 'ok' });
});

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
  res.status(200).json({ message: 'signup successful' });
});

router.post('/login', passport.authenticate('login', { session: false }), async (req, res, next) => {

  console.log("logging in")

  const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, { expiresIn: 30000 });
  const refreshToken = jwt.sign(
    { user: req.user }, process.env.JWT_REFRESH_SECRET, { expiresIn: 86400 },
  );

  // store tokens in cookie
  res.cookie('jwt', token);
  res.cookie('refreshJwt', refreshToken);

  // store tokens in memory
  tokenList[refreshToken] = {
    token,
    refreshToken,
    email: req.user.email,
    _id: req.user._id,
    name: req.user.name
  };

  //Send back the token to the user
  res.send({ token, refreshToken });
});

router.post('/token', (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken in tokenList) {
    const body = {
      email: tokenList[refreshToken].email,
      _id: tokenList[refreshToken]._id,
      name: tokenList[refreshToken].name,
    };
    const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: 300 });

    // update jwt
    res.cookie('jwt', token);
    tokenList[refreshToken].token = token;

    res.status(200).json({ token, status: 200 });
  } else {
    res.status(401).json({ message: 'unauthorized', status: 401 });
  }
});
// router.post('/token', (req, res) => {
//   const { refreshToken } = req.body;
//   if (refreshToken in tokenList) {
//     const body = { email: tokenList[refreshToken].email, _id: tokenList[refreshToken]._id, name: tokenList[refreshToken].name };
//     const token = jwt.sign({ user: body }, 'top_secret', { expiresIn: 300 });

//     // update jwt
//     res.cookie('jwt', token);
//     tokenList[refreshToken].token = token;

//     res.status(200).json({ token });
//   } else {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.cookies) {
//     const refreshToken = req.cookies['refreshJwt'];
//     if (refreshToken in tokenList) delete tokenList[refreshToken]
//     res.clearCookie('refreshJwt');
//     res.clearCookie('jwt');
//   }

//   res.status(200).json({ message: 'logged out' });
// });


router.route('/logout')
  .get(processLogoutRequest)
  .post(processLogoutRequest);
// router.post('/logout', (request, response) => {
//   if (request.cookies) {
//     const refreshToken = request.cookies.refreshJwt;
//     if (refreshToken in tokenList) delete tokenList[refreshToken];
//     response.clearCookie('jwt');
//     response.clearCookie('refreshJwt');
//   }
//   response.status(200).json({ message: 'logged out', status: 200 });
// });

module.exports = router;
