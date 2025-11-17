import { useState, useRef, useEffect } from 'react';
import ReactImageCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function ImageCropper({ onImageSave, onClose }) {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 100,
    height: 77.8,
    x: 0,
    y: 0
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  const handleImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const aspect = 450 / 350;
    const newCrop = {
      unit: '%',
      width: 100,
      height: 100 / aspect,
      x: 0,
      y: (100 - 100 / aspect) / 2
    };
    setCrop(newCrop);
    setCompletedCrop(newCrop);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const generateCroppedImage = async () => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement('canvas');
    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = 450 * pixelRatio;
    canvas.height = 350 * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    ctx.drawImage(
      image,
      (completedCrop.x / 100) * image.width * scaleX,
      (completedCrop.y / 100) * image.height * scaleY,
      (completedCrop.width / 100) * image.width * scaleX,
      (completedCrop.height / 100) * image.height * scaleY,
      0,
      0,
      450,
      350
    );

    canvas.toBlob((blob) => {
      const file = new File([blob], 'cropped-image.webp', { type: 'image/webp' });
      onImageSave(file);
      onClose();
    }, 'image/webp');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Crop Image (450x350)</h2>
        
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full"
          />
        </div>

        {src && (
          <>
            <div className="mb-4">
              <ReactImageCrop
                src={src}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={450 / 350}
              >
                <img
                  ref={imgRef}
                  src={src}
                  onLoad={handleImageLoad}
                  style={{ maxHeight: '400px', maxWidth: '100%' }}
                />
              </ReactImageCrop>
            </div>

            <div className="flex gap-2">
              <button
                onClick={generateCroppedImage}
                className="btn-success flex-1"
              >
                Save Cropped Image
              </button>
              <button
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {!src && (
          <p className="text-gray-500 text-center py-8">Please select an image to crop</p>
        )}
      </div>
    </div>
  );
}
