const adminAuth = async (req, res, next) => {
    try {
        if (req.user && req.user.userType === 'admin') {
            next();
        } else {
            return res.status(403).json({ 
                success: false, 
                message: "Access denied. Admin required." 
            });
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server error during authentication." 
        });
    }
};

export default adminAuth;