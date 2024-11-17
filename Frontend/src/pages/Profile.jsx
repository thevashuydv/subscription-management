import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import subscriptionData from '../../../Model/exported_user_transactions.json';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const platformStyles = {
    'Netflix': {
        bgColor: 'bg-gradient-to-br from-red-700 to-red-900',
        textColor: 'text-white',
        logo: '/images/netflix-logo.png'
    },
    'Amazon Prime Video': {
        bgColor: 'bg-gradient-to-br from-blue-800 to-blue-900',
        textColor: 'text-white',
        logo: '/images/prime-logo.png'
    },
    'Disney+ Hotstar': {
        bgColor: 'bg-gradient-to-br from-blue-600 to-blue-800',
        textColor: 'text-white',
        logo: '/images/hotstar-logo.png'
    },
    'HBO Max': {
        bgColor: 'bg-gradient-to-br from-purple-700 to-purple-900',
        textColor: 'text-white',
        logo: '/images/hbo-logo.png'
    },
    'Hulu': {
        bgColor: 'bg-gradient-to-br from-green-600 to-green-800',
        textColor: 'text-white',
        logo: '/images/hulu-logo.png'
    },
    'Sony Liv': {
        bgColor: 'bg-gradient-to-br from-blue-900 to-blue-950',
        textColor: 'text-white',
        logo: '/images/sonyliv-logo.png'
    },
    'Apple TV+': {
        bgColor: 'bg-gradient-to-br from-gray-800 to-gray-900',
        textColor: 'text-white',
        logo: '/images/appletv-logo.png'
    }
};

const SubscriptionCard = ({ subscription }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const platformStyle = platformStyles[subscription.platform] || {
        bgColor: 'bg-gradient-to-br from-gray-700 to-gray-900',
        textColor: 'text-white',
        logo: '/images/default-logo.png'
    };

    const isActive = new Date(subscription.end_date) > new Date();
    const monthlyPayment = subscription.plan_type === 'Annual' 
        ? Math.round(subscription.payment / 12)
        : subscription.payment;

    const handleAction = (e) => {
        e.stopPropagation(); // Prevent card from flipping when clicking button
        if (isActive) {
            // Handle cancellation
            console.log('Cancel subscription:', subscription.platform);
        } else {
            // Handle renewal
            console.log('Renew subscription:', subscription.platform);
        }
    };

    return (
        <div 
            className="relative w-full h-72 cursor-pointer group perspective"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`relative preserve-3d duration-500 w-full h-full ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front of card */}
                <div className={`absolute backface-hidden w-full h-full rounded-xl ${platformStyle.bgColor} ${platformStyle.textColor} shadow-xl overflow-hidden`}>
                    <div className="relative p-6 flex flex-col h-full justify-between">
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <img 
                                    src={platformStyle.logo} 
                                    alt={subscription.platform}
                                    className="w-20 h-20 object-contain filter drop-shadow-lg"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">
                                {subscription.platform}
                            </h3>
                            <p className="text-lg opacity-90">
                                {subscription.plan_type} Plan
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <p className="text-3xl font-bold">₹{subscription.payment}</p>
                            <p className="text-sm opacity-75">
                                {subscription.plan_type === 'Annual' ? 
                                    `(₹${monthlyPayment}/month)` : 
                                    '/month'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back of card */}
                <div className="absolute backface-hidden w-full h-full rounded-xl p-6 bg-white shadow-xl rotate-y-180">
                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-gray-800 text-lg">
                                    {subscription.platform}
                                </h4>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                    isActive 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {isActive ? 'Active' : 'Expired'}
                                </span>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Subscription Start</span><br/>
                                        {new Date(subscription.start_date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">
                                            {isActive ? 'Next Renewal' : 'Expired On'}
                                        </span><br/>
                                        {new Date(subscription.end_date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Plan Details</span><br/>
                                        {subscription.plan_type} - ₹{subscription.payment}
                                        {subscription.plan_type === 'Annual' && 
                                            ` (₹${monthlyPayment}/month)`}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Updated Action Button */}
                        <button 
                            onClick={handleAction}
                            className={`w-full py-2.5 rounded-lg transition-colors text-sm font-medium ${
                                isActive 
                                    ? 'bg-red-600 text-white hover:bg-red-700' 
                                    : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                        >
                            {isActive ? 'Cancel Subscription' : 'Renew Subscription'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SpendingGraph = ({ subscriptions }) => {
    const calculateMonthlySpending = () => {
        const today = new Date();
        const monthsData = {};
        
        // Get data for the last 6 months
        for (let i = 5; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthKey = date.toLocaleString('default', { month: 'short' });
            monthsData[monthKey] = 0;
        }

        // Calculate spending for each subscription
        subscriptions.forEach(sub => {
            const startDate = new Date(sub.start_date);
            const endDate = new Date(sub.end_date);
            const monthlyAmount = sub.plan_type === 'Annual' ? sub.payment / 12 : sub.payment;

            // For each month in our range, check if subscription was active
            Object.keys(monthsData).forEach(month => {
                const monthDate = new Date(today.getFullYear(), today.getMonth() - Object.keys(monthsData).indexOf(month), 1);
                if (monthDate >= startDate && monthDate <= endDate) {
                    monthsData[month] += monthlyAmount;
                }
            });
        });

        return monthsData;
    };

    const monthlyData = calculateMonthlySpending();

    const chartData = {
        labels: Object.keys(monthlyData),
        datasets: [
            {
                label: 'Monthly Subscription Spending',
                data: Object.values(monthlyData),
                fill: true,
                borderColor: 'rgb(59, 130, 246)', // Blue
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleColor: '#fff',
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                callbacks: {
                    label: function(context) {
                        return `₹${context.parsed.y.toFixed(2)}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return '₹' + value;
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Subscription Spending Trends</h3>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                        <span className="text-sm text-gray-600">Monthly Spending</span>
                    </div>
                </div>
            </div>
            <div className="h-[300px]">
                <Line data={chartData} options={options} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-gray-500">Average Monthly</p>
                    <p className="text-lg font-bold text-blue-600">
                        ₹{(Object.values(monthlyData).reduce((a, b) => a + b, 0) / 6).toFixed(2)}
                    </p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm text-gray-500">Lowest Month</p>
                    <p className="text-lg font-bold text-green-600">
                        ₹{Math.min(...Object.values(monthlyData)).toFixed(2)}
                    </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-sm text-gray-500">Highest Month</p>
                    <p className="text-lg font-bold text-purple-600">
                        ₹{Math.max(...Object.values(monthlyData)).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Profile = () => {
    const [user, setUser] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Calculate active subscriptions
    const activeSubscriptions = subscriptions.filter(sub => 
        new Date(sub.end_date) > new Date()
    );

    // Calculate total monthly spending
    const totalMonthly = subscriptions.reduce((total, sub) => {
        const monthlyAmount = sub.plan_type === 'Annual' 
            ? sub.payment / 12 
            : sub.payment;
        return total + monthlyAmount;
    }, 0);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }

        const currentUser = JSON.parse(userData);
        setUser(currentUser);

        // Find user's subscriptions from the JSON data
        const userSubscriptionData = subscriptionData.find(
            data => data.email === currentUser.email
        );

        if (userSubscriptionData) {
            setSubscriptions(userSubscriptionData.subscriptions);
        }
        setLoading(false);
    }, [navigate]);

    const UserStats = ({ user, activeCount, totalSpending }) => {
        return (
            <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Active Subscriptions */}
                <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                        <span className="text-2xl mr-2">📺</span>
                        <div>
                            <p className="text-sm text-gray-500">Active Subscriptions</p>
                            <p className="text-xl font-bold text-blue-600">
                                {activeCount}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Monthly Spending */}
                <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                        <span className="text-2xl mr-2">💰</span>
                        <div>
                            <p className="text-sm text-gray-500">Monthly Spending</p>
                            <p className="text-xl font-bold text-green-600">
                                ₹{Math.round(totalSpending)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* User Profile Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    <div className="md:flex">
                        {/* Profile Image and Basic Info */}
                        <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
                            <div className="text-center">
                                <div className="w-32 h-32 rounded-full bg-white p-2 mx-auto mb-4">
                                    <img
                                        src={user?.profileImage}
                                        alt={user?.name}
                                        className="w-full h-full rounded-full object-cover"
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name)}&background=random`;
                                        }}
                                    />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
                                <p className="text-blue-100 mb-4">{user?.email}</p>
                                <div className="inline-flex items-center bg-blue-700 rounded-full px-4 py-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                    <span className="text-sm">Active Member</span>
                                </div>
                            </div>
                        </div>

                        {/* User Details and Stats */}
                        <div className="md:w-2/3 p-8">
                            <UserStats 
                                user={user} 
                                activeCount={activeSubscriptions.length}
                                totalSpending={totalMonthly}
                            />
                            
                            {/* Quick Actions */}
                            <div className="flex gap-4">
                                <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add New Subscription
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Spending Graph */}
                <SpendingGraph subscriptions={subscriptions} />

                {/* Subscriptions Section */}
                <div className="mb-6 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-900">Your Subscriptions</h3>
                    <div className="text-sm text-gray-500">
                        {activeSubscriptions.length} Active / {subscriptions.length} Total
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subscriptions.map((subscription, index) => (
                        <SubscriptionCard 
                            key={index} 
                            subscription={subscription}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;