import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import ProjectManagement from '../components/ProjectManagement';
import ClientManagement from '../components/ClientManagement';
import ContactManagement from '../components/ContactManagement';
import SubscriberManagement from '../components/SubscriberManagement';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'contacts', label: 'Contacts', icon: '📧' },
    { id: 'subscribers', label: 'Subscribers', icon: '📬' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">Flippr Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="container py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 font-bold transition text-center ${
                  activeTab === tab.id
                    ? 'border-b-4 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <span>{tab.icon} {tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'projects' && <ProjectManagement />}
          {activeTab === 'clients' && <ClientManagement />}
          {activeTab === 'contacts' && <ContactManagement />}
          {activeTab === 'subscribers' && <SubscriberManagement />}
        </div>
      </div>
    </div>
  );
}
