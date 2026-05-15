import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { allMockChannels } from '../data/mockChannels';

const ChannelsContext = createContext();

export const useChannels = () => useContext(ChannelsContext);

export const ChannelsProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch inicial de datos
  const fetchChannels = async () => {
    try {
      const { data, error } = await supabase
        .from('channels')
        .select('*')
        .order('type', { ascending: false }) // 'output' vs 'input'
        .order('channel_number', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setChannels(data);
      } else {
        // Si la tabla está vacía, inicializar con mock data (opcional)
        console.warn('No se encontraron canales en Supabase, usando mock data.');
        setChannels(allMockChannels);
      }
    } catch (err) {
      console.error('Error fetching channels:', err.message);
      setChannels(allMockChannels); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();

    // 2. Suscripción en Realtime
    const channelSubscription = supabase
      .channel('public:channels')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'channels' 
      }, (payload) => {
        console.log('Realtime change received!', payload);
        
        if (payload.eventType === 'INSERT') {
          setChannels(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setChannels(prev => prev.map(ch => ch.id === payload.new.id ? payload.new : ch));
        } else if (payload.eventType === 'DELETE') {
          setChannels(prev => prev.filter(ch => ch.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channelSubscription);
    };
  }, []);

  // 3. Acciones de actualización (escribir en Supabase)
  const updateChannel = async (id, updatedData) => {
    // Optimistic update
    setChannels(prev => prev.map(ch => ch.id === id ? { ...ch, ...updatedData } : ch));

    try {
      const { error } = await supabase
        .from('channels')
        .update(updatedData)
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating channel:', err.message);
      // Revertir si hay error? O simplemente dejar que fetchChannels o Realtime lo corrija
    }
  };

  const toggleStatus = async (id) => {
    const channel = channels.find(ch => ch.id === id);
    if (!channel) return;

    const newStatus = !channel.is_active;
    
    // Optimistic update
    setChannels(prev => prev.map(ch => ch.id === id ? { ...ch, is_active: newStatus } : ch));

    try {
      const { error } = await supabase
        .from('channels')
        .update({ is_active: newStatus })
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error toggling status:', err.message);
    }
  };

  return (
    <ChannelsContext.Provider value={{ channels, updateChannel, toggleStatus, loading }}>
      {children}
    </ChannelsContext.Provider>
  );
};
