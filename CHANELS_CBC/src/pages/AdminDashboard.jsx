import { useState, useEffect } from 'react';
import { useChannels } from '../context/ChannelsContext';
import StatusBadge from '../components/StatusBadge';
import InlineEditInput from '../components/InlineEditInput';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { channels, toggleStatus, updateChannel } = useChannels();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // Persistir sesión simple en esta pestaña
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === 'cbc') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  const handleSaveName = (id, newName) => {
    updateChannel(id, { name: newName });
  };

  const handleSaveDescription = (id, newDesc) => {
    updateChannel(id, { description: newDesc });
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container animate-fade-in">
        <div className="login-box">
          <h2>Panel de Control</h2>
          <p>Introduce la contraseña para continuar</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              autoFocus
            />
            {error && <span className="login-error">{error}</span>}
            <button type="submit" className="btn-primary">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  const inputChannels = channels.filter(ch => ch.type === 'input');
  const outputChannels = channels.filter(ch => ch.type === 'output');

  return (
    <div className="admin-dashboard animate-fade-in">
      <header className="admin-header">
        <div className="header-info">
          <h2>Rack de Administración</h2>
          <p>Edición directa de los 32 canales y 16 auxiliares</p>
        </div>
        <div className="stats-rack">
          <div className="stat-unit">
            <span className="stat-value">{channels.filter(c => c.is_active).length}</span>
            <span className="stat-label">Activos</span>
          </div>
          <div className="stat-unit">
            <span className="stat-value">{channels.filter(c => !c.is_active).length}</span>
            <span className="stat-label">Mute</span>
          </div>
          <div className="auth-controls">
            <button 
              onClick={() => {
                setIsAuthenticated(false);
                sessionStorage.removeItem('admin_auth');
              }}
              className="btn-logout"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        <section className="admin-section">
          <h3>Entradas (1—32)</h3>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th width="60">Ch</th>
                  <th width="80">Estado</th>
                  <th>Nombre / Instrumento</th>
                  <th>Descripción / Nota</th>
                </tr>
              </thead>
              <tbody>
                {inputChannels.map(ch => (
                  <tr key={ch.id} className={!ch.is_active ? 'row-muted' : ''}>
                    <td className="font-mono">#{ch.channel_number.toString().padStart(2, '0')}</td>
                    <td>
                      <button onClick={() => toggleStatus(ch.id)} className="status-toggle">
                        <StatusBadge isActive={ch.is_active} showText={false} />
                      </button>
                    </td>
                    <td>
                      <InlineEditInput 
                        className="inline-edit-input main-input"
                        value={ch.name}
                        onSave={(val) => handleSaveName(ch.id, val)}
                        placeholder="Sin nombre..."
                      />
                    </td>
                    <td>
                      <InlineEditInput 
                        className="inline-edit-input sub-input"
                        value={ch.description}
                        onSave={(val) => handleSaveDescription(ch.id, val)}
                        placeholder="Nota técnica..."
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-section">
          <h3>Salidas (Aux/Mon)</h3>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th width="60">Aux</th>
                  <th width="80">Estado</th>
                  <th>Destino</th>
                  <th>Descripción / Nota</th>
                </tr>
              </thead>
              <tbody>
                {outputChannels.map(ch => (
                  <tr key={ch.id} className={!ch.is_active ? 'row-muted' : ''}>
                    <td className="font-mono">#{ch.channel_number.toString().padStart(2, '0')}</td>
                    <td>
                      <button onClick={() => toggleStatus(ch.id)} className="status-toggle">
                        <StatusBadge isActive={ch.is_active} showText={false} />
                      </button>
                    </td>
                    <td>
                      <InlineEditInput 
                        className="inline-edit-input main-input"
                        value={ch.name}
                        onSave={(val) => handleSaveName(ch.id, val)}
                        placeholder="Sin nombre..."
                      />
                    </td>
                    <td>
                      <InlineEditInput 
                        className="inline-edit-input sub-input"
                        value={ch.description}
                        onSave={(val) => handleSaveDescription(ch.id, val)}
                        placeholder="Nota técnica..."
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
