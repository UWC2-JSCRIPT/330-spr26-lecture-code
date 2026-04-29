/*
Imagine a site where users all have access to some features,
but only users with a paid subscription have access to their
notes data
● There is a subscription model to store subscription data
○ fields userId and isActive (boolean)
● There is a subscription dao to get subscription data
○ function is getSubscription(userId)
● There is already a middleware function that performs
authentication and sets req.userId
● Write a middleware function that enforces that all calls to
/notes routes are made by users with an active subscription
● If not, send back a 403 (Forbidden) response
*/

// function
// - we have req, res, next
// - get subscription (DAO, req.userId, isActive)
// - if true, next()
// - else, return 403

const notesAuthMiddleware = async (req, res, next) => {
  const subscription = await subscriptionDao.getSubscription(req.userId);
  if (subscription.isActive) {
    return next();
  }

  return res.sendStatus(403);
}
app .get('/notes', notesAuthMiddleware, (req, res) => {});
app.use('/notes', notesAuthMiddleware, notesRoutes)