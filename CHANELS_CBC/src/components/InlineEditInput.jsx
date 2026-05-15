import { useState, useEffect } from 'react';

/**
 * InlineEditInput
 * Un input especializado para evitar el "flickering" en aplicaciones en tiempo real.
 * Mantiene un estado local mientras el usuario edita y sincroniza con el exterior
 * solo cuando el campo deja de tener foco.
 */
const InlineEditInput = ({ value, onSave, className, placeholder }) => {
  const [localValue, setLocalValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);

  // Sincronizar el valor local con el valor externo (Realtime) 
  // SOLO si el usuario no está editando actualmente el campo.
  useEffect(() => {
    if (!isFocused) {
      setLocalValue(value || '');
    }
  }, [value, isFocused]);

  const handleBlur = () => {
    setIsFocused(false);
    // Solo guardamos si el valor ha cambiado realmente
    if (localValue !== value) {
      onSave(localValue);
    }
  };

  const handleKeyDown = (e) => {
    // Permitir guardar al presionar Enter
    if (e.key === 'Enter') {
      e.target.blur();
    }
    // Permitir cancelar con Escape (opcional)
    if (e.key === 'Escape') {
      setLocalValue(value || '');
      e.target.blur();
    }
  };

  return (
    <input
      type="text"
      className={className}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  );
};

export default InlineEditInput;
