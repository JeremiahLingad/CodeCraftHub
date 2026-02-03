const User = require('../models/User');

class UserService {
    async getUserById(userId) {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async updateUser(userId, updateData) {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        return updatedUser;
    }
}

module.exports = new UserService();