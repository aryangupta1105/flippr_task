import { useState, useEffect } from 'react';
import { getClients, createClient, updateClient, deleteClient, getImageUrl } from '../services/api';
import ImageCropper from './ImageCropper';

export default function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    designation: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      setMessage('Error fetching clients');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!croppedImage && !editingId) {
      setMessage('Please select and crop an image');
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('description', formData.description);
      form.append('designation', formData.designation);
      if (croppedImage) {
        form.append('image', croppedImage);
      }

      if (editingId) {
        await updateClient(editingId, form);
        setMessage('Client updated successfully');
        setEditingId(null);
      } else {
        await createClient(form);
        setMessage('Client created successfully');
      }

      setFormData({ name: '', description: '', designation: '' });
      setCroppedImage(null);
      setShowForm(false);
      fetchClients();
    } catch (error) {
      setMessage('Error saving client: ' + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };

  const handleEdit = (client) => {
    setEditingId(client._id);
    setFormData({
      name: client.name,
      description: client.description,
      designation: client.designation
    });
    setShowForm(true);
    setCroppedImage(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await deleteClient(id);
        setMessage('Client deleted successfully');
        fetchClients();
      } catch (error) {
        setMessage('Error deleting client');
      }
    }
  };

  const handleImageSave = (file) => {
    setCroppedImage(file);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', description: '', designation: '' });
    setCroppedImage(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Clients</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-success"
        >
          {showForm ? 'Cancel' : '+ Add Client'}
        </button>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {showForm && (
        <div className="card mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Client Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="input-field"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
                className="input-field"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="input-field"
                rows="3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Image (450x350)</label>
              {croppedImage ? (
                <div className="mb-2 p-2 bg-green-50 rounded">
                  ✓ Image selected and cropped
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowCropper(true)}
                  className="btn-secondary w-full"
                >
                  {editingId ? 'Change Image (Optional)' : 'Upload & Crop Image'}
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="btn-success flex-1">
                {loading ? 'Saving...' : editingId ? 'Update Client' : 'Create Client'}
              </button>
              <button type="button" onClick={handleCancel} className="btn-secondary flex-1">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showCropper && (
        <ImageCropper
          onImageSave={handleImageSave}
          onClose={() => setShowCropper(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {clients.map(client => (
          <div key={client._id} className="card text-center">
            <div className="h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden w-32">
              <img
                src={getImageUrl(client.image)}
                alt={client.name}
                className="w-full h-full object-cover"
                onError={(e) => e.target.src = 'https://via.placeholder.com/200x200?text=Client'}
              />
            </div>
            <h3 className="text-lg font-bold mb-1">{client.name}</h3>
            <p className="text-blue-600 text-sm mb-2">{client.designation}</p>
            <p className="text-gray-600 text-sm mb-4">{client.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(client)}
                className="btn-secondary flex-1 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(client._id)}
                className="btn-danger flex-1 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
