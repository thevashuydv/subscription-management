router.get('/:userId/subscriptions', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate('subscriptions');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.subscriptions);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}); 