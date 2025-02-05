import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const screenWidth = Dimensions.get('window').width;

interface ExpenseChartProps {
    data: any[];
    totalExpense: number;
    showPercentages?: boolean;
    enableAnimation?: boolean;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({
    data,
    totalExpense,
    showPercentages = true,
    enableAnimation = true,
}) => {
    const chartConfig = {
        backgroundGradientFrom: COLORS.white,
        backgroundGradientTo: COLORS.white,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        useShadowColorFromDataset: false,
        decimalPlaces: 0,
    };

    const chartData = data.map(item => ({
        name: item.category,
        amount: item.amount,
        color: item.color,
        legendFontColor: COLORS.gray,
        legendFontSize: 12,
        legendFontFamily: FONTS.regular,
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Harcama Dağılımı</Text>
            <Text style={styles.totalAmount}>₺{totalExpense.toLocaleString('tr-TR')}</Text>
            <View style={styles.chartContainer}>
                <PieChart
                    data={chartData}
                    width={screenWidth - (SIZES.padding * 4)}
                    height={180}
                    chartConfig={chartConfig}
                    accessor="amount"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    center={[0, 0]}
                    absolute
                    hasLegend={true}
                    avoidFalseZero={true}
                />
            </View>
        </View>
    );
};

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
        marginBottom: SIZES.base,
    },
    totalAmount: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
        marginBottom: SIZES.padding,
    },
    chartContainer: {
        alignItems: 'center',
        marginTop: -SIZES.padding,
    },
});

export default ExpenseChart; 