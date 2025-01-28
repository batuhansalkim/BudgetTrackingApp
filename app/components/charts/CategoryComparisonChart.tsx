import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const screenWidth = Dimensions.get('window').width;

interface CategoryComparisonChartProps {
    data: {
        labels: string[];
        datasets: {
            data: number[];
        }[];
    };
}

export default function CategoryComparisonChart({ data }: CategoryComparisonChartProps) {
    const chartConfig = {
        backgroundGradientFrom: COLORS.white,
        backgroundGradientTo: COLORS.white,
        decimalPlaces: 0,
        color: (opacity = 1) => COLORS.primary,
        labelColor: (opacity = 1) => COLORS.gray,
        barPercentage: 0.7,
        style: {
            borderRadius: 16,
        },
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kategori Karşılaştırması</Text>
            <BarChart
                data={data}
                width={screenWidth - SIZES.padding * 4}
                height={220}
                yAxisLabel="₺"
                chartConfig={chartConfig}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                showValuesOnTopOfBars
                withInnerLines={false}
                fromZero
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