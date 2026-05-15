import { memo } from 'react';
import StatusBadge from './StatusBadge';
import './ChannelCard.css';

const ChannelCard = memo(({ channel }) => {
  return (
    <div className={`channel-card ${!channel.is_active ? 'muted' : ''}`}>
      <div className="channel-id-box">
        <span className="channel-num">{channel.channel_number.toString().padStart(2, '0')}</span>
      </div>
      <div className="channel-content">
        <h3 className="channel-name-title">{channel.name || '---'}</h3>
      </div>
      <div className="channel-status-box">
        <StatusBadge isActive={channel.is_active} showText={false} />
      </div>
    </div>
  );
});

ChannelCard.displayName = 'ChannelCard';

export default ChannelCard;
