import { memo } from 'react';
import './StatusBadge.css';

const StatusBadge = memo(({ isActive, showText = true }) => {
  return (
    <div className={`status-badge ${isActive ? 'active' : 'inactive'}`}>
      <span className="led-light"></span>
      {showText && (
        <span className="status-text">
          {isActive ? 'ACTIVO' : 'MUTE'}
        </span>
      )}
    </div>
  );
});

StatusBadge.displayName = 'StatusBadge';

export default StatusBadge;
