import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject, getImageUrl } from '../services/api';
import ImageCropper from './ImageCropper';

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      setMessage('Error fetching projects');
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
      if (croppedImage) {
        form.append('image', croppedImage);
      }

      if (editingId) {
        await updateProject(editingId, form);
        setMessage('Project updated successfully');
        setEditingId(null);
      } else {
        await createProject(form);
        setMessage('Project created successfully');
      }

      setFormData({ name: '', description: '' });
      setCroppedImage(null);
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      setMessage('Error saving project: ' + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      name: project.name,
      description: project.description
    });
    setShowForm(true);
    setCroppedImage(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        setMessage('Project deleted successfully');
        fetchProjects();
      } catch (error) {
        setMessage('Error deleting project');
      }
    }
  };

  const handleImageSave = (file) => {
    setCroppedImage(file);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', description: '' });
    setCroppedImage(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-success"
        >
          {showForm ? 'Cancel' : '+ Add Project'}
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
              <label className="block text-gray-700 font-bold mb-2">Project Name</label>
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
              <label className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="input-field"
                rows="4"
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
                {loading ? 'Saving...' : editingId ? 'Update Project' : 'Create Project'}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <div key={project._id} className="card">
            <div className="h-40 bg-gray-300 rounded overflow-hidden mb-4">
              <img
                src={getImageUrl(project.image)}
                alt={project.name}
                className="w-full h-full object-cover"
                onError={(e) => e.target.src = 'https://via.placeholder.com/450x350?text=Project'}
              />
            </div>
            <h3 className="text-lg font-bold mb-2">{project.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{project.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="btn-secondary flex-1 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
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
