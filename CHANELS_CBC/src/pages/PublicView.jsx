import { useChannels } from '../context/ChannelsContext';
import ChannelCard from '../components/ChannelCard';
import './PublicView.css';

const PublicView = () => {
  const { channels } = useChannels();
  
  const activeInputs = channels.filter(ch => ch.type === 'input' && ch.is_active);
  const activeOutputs = channels.filter(ch => ch.type === 'output' && ch.is_active);

  return (
    <div className="public-view animate-fade-in">
      {activeInputs.length > 0 && (
        <section className="channel-section">
          <div className="section-title">
            <h3>Entradas</h3>
          </div>
          <div className="channel-grid">
            {activeInputs.map(ch => <ChannelCard key={ch.id} channel={ch} />)}
          </div>
        </section>
      )}

      {activeOutputs.length > 0 && (
        <section className="channel-section">
          <div className="section-title">
            <h3>Monitores</h3>
          </div>
          <div className="channel-grid">
            {activeOutputs.map(ch => <ChannelCard key={ch.id} channel={ch} />)}
          </div>
        </section>
      )}
      
      {activeInputs.length === 0 && activeOutputs.length === 0 && (
        <div className="empty-state">No hay canales activos</div>
      )}
    </div>
  );
};

export default PublicView;
