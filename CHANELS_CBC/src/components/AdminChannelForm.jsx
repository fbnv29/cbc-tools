import { useState } from 'react';
import { useChannels } from '../context/ChannelsContext';
import './AdminChannelForm.css';

const AdminChannelForm = ({ channel, onClose }) => {
  const { updateChannel } = useChannels();
  const [formData, setFormData] = useState({
    name: channel.name,
    description: channel.description,
    is_active: channel.is_active
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateChannel(channel.id, formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in">
        <header className="modal-header">
          <h3>Editar Canal {channel.channel_number}</h3>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </header>
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Nombre / Instrumento</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Ej: Voz Líder, Kick, Guitarra..."
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Descripción / Nota Técnica</label>
            <textarea 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Ej: Micrófono SM58, Caja DI..."
            />
          </div>

          <div className="form-row">
            
            <div className="form-group checkbox-group">
              <label>Estado</label>
              <div className="toggle-container">
                <input 
                  type="checkbox" 
                  checked={formData.is_active} 
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  id="status-toggle-modal"
                />
                <label htmlFor="status-toggle-modal" className="toggle-label">
                  {formData.is_active ? 'Activo' : 'Mute'}
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminChannelForm;
