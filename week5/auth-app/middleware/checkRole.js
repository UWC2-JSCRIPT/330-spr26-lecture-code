import User from '../models/user';

const checkRole = (role) => async (req, res, next) => {
    // req.user.id
    const user = await User.findById(req.user.id);
    
    if (user && user.roles && user.roles.includes(role)) {
        return next();
    }

    return res.sendStatus(403);
};

export default checkRole;