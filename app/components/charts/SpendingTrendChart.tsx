import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const screenWidth = Dimensions.get('window').width;

interface SpendingTrendChartProps {
    data: {
        labels: string[];
        datasets: {
            data: number[];
            color?: (opacity: number) => string;
            strokeWidth?: number;
        }[];
    };
    title: string;
}

export default function SpendingTrendChart({ data, title }: SpendingTrendChartProps) {
    const chartConfig = {
        backgroundGradientFrom: COLORS.white,
        backgroundGradientTo: COLORS.white,
        decimalPlaces: 0,
        color: (opacity = 1) => COLORS.primary,
        labelColor: (opacity = 1) => COLORS.gray,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: COLORS.primary,
        },
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <LineChart
                data={data}
                width={screenWidth - SIZES.padding * 4}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                withInnerLines={false}
                withOuterLines={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginBottom: SIZES.padding,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    title: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
}); 