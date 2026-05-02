

// Notes routes: /notes
// Other routes: /*

// { userId: 'user1', isActive: true, _id: ... }
// subscriptionDao.getSubscription(userId)
// req.userId

// function
//.   - we have req, res, next
//.   - get subscription (DAO, req.userId, isActive)
//.   - if true, next()
//.   - else, return 403

const notesAuthMiddleware = async (req, res, next) => {
    const subscription = await subscriptionDao.getSubscription(req.userId);
    if (subscription.isActive) {
        return next();
    }

    return res.sendStatus(403);
}

app.get('/notes', notesAuthMiddleware, (req, res) => {});

// notesRoutes: notesRoutes.get('/', ...), notesRoutes.post('/', ...);

app.use('/notes', notesAuthMiddleware, notesRoutes);