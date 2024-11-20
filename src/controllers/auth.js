import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/auth.js';
// import { ONE_DAY } from '../constants/index.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + session.refreshTokenValidUntil),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + session.refreshTokenValidUntil),
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  const session = await loginUser({
    email: req.body.email,
    password: req.body.password,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully registered a user!',
    data: { user },
    accessToken: session.accessToken,
    // refreshToken: session.refreshToken,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  // res.cookie('refreshToken', session.refreshToken, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + ONE_DAY),
  // });
  // res.cookie('sessionId', session._id, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + ONE_DAY),
  // });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
      // refreshToken: session.refreshToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId, req.cookies.refreshToken);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

// export const getGoogleAuthUrlController = async (req, res) => {
//   const url = generateAuthUrl();
//   res.json({
//     status: 200,
//     message: 'Successfully get Google OAuth url!',
//     data: {
//       url,
//     },
//   });
// };

// export const loginWithGoogleController = async (req, res) => {
//   const session = await loginOrSignupWithGoogle(req.body.code);
//   setupSession(res, session);

//   res.json({
//     status: 200,
//     message: 'Successfully logged in via Google OAuth!',
//     data: {
//       accessToken: session.accessToken,
//     },
//   });
// };

export const refreshController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  const session = await refreshSession({
    refreshToken,
    sessionId,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
