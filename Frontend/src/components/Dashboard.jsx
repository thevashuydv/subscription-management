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
import { useAuth } from '../context/AuthContext';

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
    const platformStyle = platformStyles[subscription.platform] || {
        bgColor: 'bg-gradient-to-br from-gray-700 to-gray-900',
        textColor: 'text-white',
        logo: '/images/default-logo.png'
    };

    const isActive = new Date(subscription.end_date) > new Date();
    const monthlyPayment = subscription.plan_type === 'Annual' 
        ? Math.round(subscription.payment / 12)
        : subscription.payment;

    return (
        <div className={`rounded-xl ${platformStyle.bgColor} ${platformStyle.textColor} shadow-xl p-6`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <img 
                        src={platformStyle.logo} 
                        alt={subscription.platform}
                        className="w-12 h-12 object-contain"
                    />
                    <div className="ml-4">
                        <h3 className="text-lg font-bold">{subscription.platform}</h3>
                        <p className="text-sm opacity-75">{subscription.plan_type} Plan</p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                    isActive ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'
                }`}>
                    {isActive ? 'Active' : 'Expired'}
                </span>
            </div>
            <div className="mt-4">
                <p className="text-2xl font-bold">₹{subscription.payment}</p>
                <p className="text-sm opacity-75">
                    {subscription.plan_type === 'Annual' ? 
                        `(₹${monthlyPayment}/month)` : 
                        '/month'}
                </p>
            </div>
        </div>
    );
};

// Add this sample data
const sampleSubscriptionData = {
  subscriptions: [
    {
      platform: "Netflix",
      plan_type: "Annual",
      payment: 2500,
      start_date: "2023-09-01",
      end_date: "2024-08-31"
    },
    {
      platform: "Amazon Prime Video",
      plan_type: "Monthly",
      payment: 299,
      start_date: "2024-01-01",
      end_date: "2024-12-31"
    },
    {
      platform: "Disney+ Hotstar",
      plan_type: "Annual",
      payment: 1499,
      start_date: "2023-11-01",
      end_date: "2024-10-31"
    },
    {
      platform: "Sony Liv",
      plan_type: "Monthly",
      payment: 299,
      start_date: "2023-12-01",
      end_date: "2024-01-31"
    },
    {
      platform: "Apple TV+",
      plan_type: "Annual",
      payment: 999,
      start_date: "2023-08-01",
      end_date: "2023-12-31"
    }
  ]
};

const SpendingGraph = ({ subscriptions }) => {
    const calculateMonthlySpending = () => {
        // Fixed sample monthly spending data
        return {
            'Sep': 850,
            'Oct': 1200,
            'Nov': 1500,
            'Dec': 1800,
            'Jan': 1600,
            'Feb': 1400
        };
    };

    const monthlyData = calculateMonthlySpending();

    const chartData = {
        labels: Object.keys(monthlyData),
        datasets: [
            {
                label: 'Monthly Subscription Spending',
                data: Object.values(monthlyData),
                fill: true,
                borderColor: 'rgb(59, 130, 246)',
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

const Dashboard = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Use the sample data instead of looking for user's subscriptions
        setSubscriptions(sampleSubscriptionData.subscriptions);
        setLoading(false);
    }, [user, navigate]);

    // Separate active and inactive subscriptions
    const activeSubscriptions = subscriptions.filter(sub => 
        new Date(sub.end_date) > new Date()
    );
    
    const inactiveSubscriptions = subscriptions.filter(sub => 
        new Date(sub.end_date) <= new Date()
    );

    const totalMonthly = subscriptions.reduce((total, sub) => {
        const monthlyAmount = sub.plan_type === 'Annual' 
            ? sub.payment / 12 
            : sub.payment;
        return total + monthlyAmount;
    }, 0);

    if (loading) return <div className="text-center p-4">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-600">Active Subscriptions</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {activeSubscriptions.length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-600">Total Monthly Spending</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            ₹{Math.round(totalMonthly)}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-600">Total Subscriptions</h3>
                        <p className="text-3xl font-bold text-purple-600 mt-2">
                            {subscriptions.length}
                        </p>
                    </div>
                </div>

                {/* Spending Graph */}
                <SpendingGraph subscriptions={subscriptions} />

                {/* Active Subscriptions */}
                {activeSubscriptions.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Subscriptions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activeSubscriptions.map((subscription, index) => (
                                <SubscriptionCard 
                                    key={index} 
                                    subscription={subscription}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Inactive Subscriptions */}
                {inactiveSubscriptions.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Inactive Subscriptions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {inactiveSubscriptions.map((subscription, index) => (
                                <SubscriptionCard 
                                    key={index} 
                                    subscription={subscription}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
