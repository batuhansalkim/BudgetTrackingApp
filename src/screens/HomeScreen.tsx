import { useSettings } from '../context/SettingsContext';
import { translations } from '../translations';
import { formatCurrency } from '../utils/formatCurrency';

export const HomeScreen = () => {
  const { language, currency } = useSettings();
  
  return (
    <View>
      <Text>{translations[language].welcome}</Text>
      <Text>{formatCurrency(1000, currency)}</Text>
    </View>
  );
}; 