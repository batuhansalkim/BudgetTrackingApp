import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const ONBOARDING_DATA = [
    {
        id: '1',
        title: 'Bütçenizi Akıllıca Yönetin',
        description: 'Gelir ve giderlerinizi kolayca takip edin, finansal hedeflerinize daha hızlı ulaşın.',
        image: '💰',
        backgroundColor: ['#4C669F', '#3B5998'] as const,
        pattern: 'circles',
        animation: {
            type: 'bounce',
            duration: 1000,
        }
    },
    {
        id: '2',
        title: 'Harcamalarınızı Analiz Edin',
        description: 'Detaylı grafikler ve raporlarla harcama alışkanlıklarınızı görün, tasarruf fırsatlarını keşfedin.',
        image: '📊',
        backgroundColor: ['#00C6FB', '#005BEA'] as const,
        pattern: 'dots',
        animation: {
            type: 'pulse',
            duration: 1200,
        }
    },
    {
        id: '3',
        title: 'Hedeflerinize Ulaşın',
        description: 'Finansal hedefler belirleyin, ilerlemenizi takip edin ve başarıya ulaşın.',
        image: '🎯',
        backgroundColor: ['#1D976C', '#93F9B9'] as const,
        pattern: 'waves',
        animation: {
            type: 'slide',
            duration: 800,
        }
    }
] as const;
