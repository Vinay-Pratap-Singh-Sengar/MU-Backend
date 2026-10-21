
export const roleAuhorization = (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                status:"failed",
                message : "you are not authorized to access this resource..."
            })
        }
        next();
    }
}
