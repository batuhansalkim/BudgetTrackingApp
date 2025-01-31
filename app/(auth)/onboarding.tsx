import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Animated,
    useWindowDimensions,
    Platform,
    ListRenderItem,
    ViewToken,
    ViewabilityConfig,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { COLORS, FONTS, SIZES } from '../../app/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface Slide {
    id: string;
    title: string;
    description: string;
    gradientColors: [string, string];  // Exactly two colors for gradient
    icon: string;
    decorationIcons: string[];
}

const slides: Slide[] = [
    {
        id: '1',
        title: 'Finansal Özgürlüğünüze\nHoş Geldiniz',
        description: 'Gelir ve giderlerinizi kolayca takip edin, finansal hedeflerinize ulaşın.',
        gradientColors: [COLORS.primary, COLORS.secondary],
        icon: 'wallet-outline',
        decorationIcons: ['cash-outline', 'card-outline', 'trending-up-outline'],
    },
    {
        id: '2',
        title: 'Akıllı Bütçe\nYönetimi',
        description: 'Kategori bazlı harcama takibi ve otomatik bütçe önerileri ile kontrolü elinizde tutun.',
        gradientColors: [COLORS.secondary, '#4CAF50'],
        icon: 'pie-chart-outline',
        decorationIcons: ['bar-chart-outline', 'stats-chart-outline', 'analytics-outline'],
    },
    {
        id: '3',
        title: 'Hedeflerinizi\nGerçekleştirin',
        description: 'Finansal hedefler belirleyin ve ilerlemenizi adım adım takip edin.',
        gradientColors: ['#4CAF50', '#2196F3'],
        icon: 'trophy-outline',
        decorationIcons: ['flag-outline', 'star-outline', 'ribbon-outline'],
    },
    {
        id: '4',
        title: 'Detaylı Analiz ve\nRaporlama',
        description: 'Harcama alışkanlıklarınızı analiz edin, tasarruf fırsatlarını keşfedin.',
        gradientColors: ['#2196F3', '#9C27B0'],
        icon: 'stats-chart-outline',
        decorationIcons: ['analytics-outline', 'bar-chart-outline', 'trending-up-outline'],
    },
    {
        id: '5',
        title: 'Güvenli ve\nKolay Kullanım',
        description: 'Verileriniz güvende, kullanımı kolay arayüz ile finansal yönetim artık çok basit.',
        gradientColors: ['#9C27B0', COLORS.primary],
        icon: 'shield-checkmark-outline',
        decorationIcons: ['lock-closed-outline', 'finger-print-outline', 'key-outline'],
    },
];

export default function OnboardingScreen() {
    const { width } = useWindowDimensions();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<FlatList<Slide>>(null);
    const router = useRouter();

    const viewableItemsChanged = useRef(({ 
        viewableItems 
    }: {
        viewableItems: ViewToken[];
        changed: ViewToken[];
    }) => {
        if (viewableItems[0]?.index !== null) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef<ViewabilityConfig>({ 
        viewAreaCoveragePercentThreshold: 50 
    }).current;

    const scrollTo = (index: number) => {
        if (slidesRef.current) {
            slidesRef.current.scrollToIndex({ index });
        }
    };

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
    );

    const handleStart = () => {
        router.push('/setup');
    };

    const renderItem: ListRenderItem<Slide> = ({ item, index }) => {
        return (
            <View style={[styles.slide, { width }]}>
                <LinearGradient
                    colors={item.gradientColors}
                    style={styles.gradientBackground}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons name={item.icon as any} size={80} color={COLORS.white} />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                </LinearGradient>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.skipButton} onPress={() => scrollTo(slides.length - 1)}>
                <Text style={styles.skipText}>Geç</Text>
            </TouchableOpacity>

            <FlatList
                data={slides}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={item => item.id}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
            />

            <View style={styles.paginationContainer}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                width: currentIndex === index ? 20 : 10,
                                opacity: currentIndex === index ? 1 : 0.3,
                            },
                        ]}
                    />
                ))}
            </View>

            <View style={styles.buttonContainer}>
                {currentIndex === slides.length - 1 ? (
                    <TouchableOpacity style={styles.button} onPress={handleStart}>
                        <Text style={styles.buttonText}>Başla</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => scrollTo(currentIndex + 1)}
                    >
                        <Text style={styles.buttonText}>İleri</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    skipButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 30,
        right: 20,
        zIndex: 1,
        padding: 10,
    },
    skipText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    slide: {
        flex: 1,
    },
    gradientBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.padding * 2,
    },
    iconContainer: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: SIZES.extraLarge * 1.2,
        fontFamily: FONTS.bold,
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: SIZES.padding,
    },
    description: {
        fontSize: SIZES.large,
        fontFamily: FONTS.regular,
        color: COLORS.white,
        textAlign: 'center',
        opacity: 0.8,
        lineHeight: 24,
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        marginHorizontal: 5,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 40 : 20,
        left: 0,
        right: 0,
        paddingHorizontal: SIZES.padding * 2,
    },
    button: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
    },
});