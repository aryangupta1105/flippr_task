import { useState, useEffect } from 'react';
import { getSubscribers, deleteSubscriber } from '../services/api';

export default function SubscriberManagement() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await getSubscribers();
      setSubscribers(response.data);
    } catch (error) {
      setMessage('Error fetching subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      try {
        await deleteSubscriber(id);
        setMessage('Subscriber deleted successfully');
        fetchSubscribers();
      } catch (error) {
        setMessage('Error deleting subscriber');
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Newsletter Subscribers ({subscribers.length})</h2>

      {message && (
        <div className={`mb-4 p-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading subscribers...</div>
      ) : subscribers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Subscribed Date</th>
                <th className="border p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(subscriber => (
                <tr key={subscriber._id} className="hover:bg-gray-50">
                  <td className="border p-3">{subscriber.email}</td>
                  <td className="border p-3">{new Date(subscriber.subscribedAt).toLocaleDateString()}</td>
                  <td className="border p-3 text-center">
                    <button
                      onClick={() => handleDelete(subscriber._id)}
                      className="btn-danger text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-600">No subscribers yet.</div>
      )}
    </div>
  );
}
