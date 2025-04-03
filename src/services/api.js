import { supabase } from '../lib/supabase';

export const fetchInventory = async () => {
  const { data, error } = await supabase
    .from('inventory')
    .select('*');

  if (error) {
    console.error('❌ Error fetching inventory:', error.message);
    return [];
  }

  console.log('✅ Inventory data:', data);
  return data;
};
