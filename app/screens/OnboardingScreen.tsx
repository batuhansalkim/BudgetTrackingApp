import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Animated,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { ONBOARDING_DATA } from '../constants/onboarding';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Svg, { Circle, Path } from 'react-native-svg';
import { MotiView } from 'moti';

const { width, height } = Dimensions.get('window');

const Patterns = {
    circles: ({ color }: { color: string }) => (
        <Svg height="100%" width="100%" viewBox="0 0 100 100" opacity={0.1}>
            <Circle cx="25" cy="25" r="10" fill={color} />
            <Circle cx="75" cy="75" r="10" fill={color} />
            <Circle cx="75" cy="25" r="10" fill={color} />
            <Circle cx="25" cy="75" r="10" fill={color} />
        </Svg>
    ),
    dots: ({ color }: { color: string }) => (
        <Svg height="100%" width="100%" viewBox="0 0 100 100" opacity={0.1}>
            {Array.from({ length: 10 }).map((_, i) =>
                Array.from({ length: 10 }).map((_, j) => (
                    <Circle
                        key={`${i}-${j}`}
                        cx={i * 10 + 5}
                        cy={j * 10 + 5}
                        r="2"
                        fill={color}
                    />
                ))
            )}
        </Svg>
    ),
    waves: ({ color }: { color: string }) => (
        <Svg height="100%" width="100%" viewBox="0 0 100 100" opacity={0.1}>
            <Path
                d="M0 50 Q25 30 50 50 T100 50 T150 50"
                stroke={color}
                strokeWidth="2"
                fill="none"
            />
            <Path
                d="M0 70 Q25 50 50 70 T100 70 T150 70"
                stroke={color}
                strokeWidth="2"
                fill="none"
            />
        </Svg>
    ),
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function OnboardingScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);

    const renderPattern = (pattern: string, color: string) => {
        const PatternComponent = Patterns[pattern as keyof typeof Patterns];
        return PatternComponent ? <PatternComponent color={color} /> : null;
    };

    const renderItem = ({ item, index }: { item: typeof ONBOARDING_DATA[0]; index: number }) => {
        const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
        ];

        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
        });

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
        });

        const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [30, 0, 30],
        });

        return (
            <View style={styles.slide}>
                <LinearGradient
                    colors={item.backgroundColor}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.patternContainer}>
                        {renderPattern(item.pattern, '#fff')}
                    </View>
                    
                    <Animated.View
                        style={[
                            styles.content,
                            {
                                transform: [
                                    { scale },
                                    { translateY }
                                ],
                                opacity,
                            },
                        ]}
                    >
                        <MotiView
                            from={{
                                scale: 0.5,
                                opacity: 0,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                            transition={{
                                type: 'timing',
                                duration: 1000,
                            }}
                        >
                            <Text style={styles.image}>{item.image}</Text>
                        </MotiView>

                        <MotiView
                            from={{
                                translateY: 50,
                                opacity: 0,
                            }}
                            animate={{
                                translateY: 0,
                                opacity: 1,
                            }}
                            transition={{
                                type: 'timing',
                                duration: 1000,
                                delay: 300,
                            }}
                        >
                            <Text style={styles.title}>{item.title}</Text>
                        </MotiView>

                        <MotiView
                            from={{
                                translateY: 50,
                                opacity: 0,
                            }}
                            animate={{
                                translateY: 0,
                                opacity: 1,
                            }}
                            transition={{
                                type: 'timing',
                                duration: 1000,
                                delay: 600,
                            }}
                        >
                            <Text style={styles.description}>{item.description}</Text>
                        </MotiView>
                    </Animated.View>
                </LinearGradient>
            </View>
        );
    };

    const renderPagination = () => {
        return (
            <View style={styles.paginationContainer}>
                {ONBOARDING_DATA.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                    const width = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 20, 8],
                        extrapolate: 'clamp',
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp',
                    });

                    const backgroundColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ['rgba(255,255,255,0.4)', '#fff', 'rgba(255,255,255,0.4)'],
                    });

                    return (
                        <Animated.View
                            key={i}
                            style={[
                                styles.dot,
                                {
                                    width,
                                    opacity,
                                    backgroundColor,
                                },
                            ]}
                        />
                    );
                })}
            </View>
        );
    };

    const handleNext = () => {
        if (currentIndex < ONBOARDING_DATA.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            router.replace('/login');
        }
    };

    return (
        <View style={styles.container}>
            <AnimatedFlatList
                ref={flatListRef}
                data={ONBOARDING_DATA}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(
                        event.nativeEvent.contentOffset.x / width
                    );
                    setCurrentIndex(newIndex);
                }}
                scrollEventThrottle={16}
            />

            {renderPagination()}

            <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNext}
            >
                <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={styles.buttonContent}>
                        <Text style={styles.nextButtonText}>
                            {currentIndex === ONBOARDING_DATA.length - 1 ? 'Başla' : 'İleri'}
                        </Text>
                        <Text style={styles.buttonIcon}>→</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    slide: {
        width,
        height,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    patternContainer: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.7,
    },
    content: {
        alignItems: 'center',
        padding: SIZES.padding * 2,
    },
    image: {
        fontSize: 100,
        marginBottom: SIZES.padding,
    },
    title: {
        fontSize: SIZES.extraLarge * 1.2,
        fontFamily: FONTS.bold,
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: SIZES.base,
    },
    description: {
        fontSize: SIZES.large,
        fontFamily: FONTS.regular,
        color: COLORS.white,
        textAlign: 'center',
        opacity: 0.8,
        paddingHorizontal: SIZES.padding,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: height * 0.2,
        width: '100%',
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: COLORS.white,
    },
    nextButton: {
        position: 'absolute',
        bottom: height * 0.1,
        width: width * 0.4,
        alignSelf: 'center',
        overflow: 'hidden',
        borderRadius: 30,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    buttonGradient: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButtonText: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        marginRight: 8,
    },
    buttonIcon: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
    },
});