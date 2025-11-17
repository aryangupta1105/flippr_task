import { useState, useEffect } from 'react';
import { getContacts, deleteContact } from '../services/api';

export default function ContactManagement() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await getContacts();
      setContacts(response.data);
    } catch (error) {
      setMessage('Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
        setMessage('Contact deleted successfully');
        fetchContacts();
      } catch (error) {
        setMessage('Error deleting contact');
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Form Submissions</h2>

      {message && (
        <div className={`mb-4 p-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading contacts...</div>
      ) : contacts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left">Full Name</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Mobile</th>
                <th className="border p-3 text-left">City</th>
                <th className="border p-3 text-left">Date</th>
                <th className="border p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="border p-3">{contact.fullName}</td>
                  <td className="border p-3">{contact.email}</td>
                  <td className="border p-3">{contact.mobileNumber}</td>
                  <td className="border p-3">{contact.city}</td>
                  <td className="border p-3">{new Date(contact.createdAt).toLocaleDateString()}</td>
                  <td className="border p-3 text-center">
                    <button
                      onClick={() => handleDelete(contact._id)}
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
        <div className="text-center py-8 text-gray-600">No contact submissions yet.</div>
      )}
    </div>
  );
}
