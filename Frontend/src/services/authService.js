import { userProfiles } from '../data/users';
import subscriptionData from '../../../Model/exported_user_transactions.json';

export const authService = {
    login: (email, password) => {
        const user = userProfiles.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Get user's subscriptions
            const userSubscriptions = subscriptionData.find(data => data.email === email)?.subscriptions || [];
            
            // Create a safe user object (without password)
            const { password: _, ...safeUser } = user;
            
            return {
                success: true,
                user: {
                    ...safeUser,
                    subscriptions: userSubscriptions
                },
                token: 'dummy-token' // In production, use proper JWT
            };
        }
        
        return {
            success: false,
            message: "Invalid email or password"
        };
    },

    getUserProfile: (userId) => {
        const user = userProfiles.find(u => u.id === userId);
        if (user) {
            const { password: _, ...safeUser } = user;
            return safeUser;
        }
        return null;
    }
}; 