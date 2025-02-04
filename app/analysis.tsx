import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    ScrollView,
    Dimensions 
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import { Stack } from 'expo-router';

export default function AnalysisScreen() {
    // Örnek veriler
    const monthlyData = {
        labels: ["Oca", "Şub", "Mar", "Nis", "May", "Haz"],
        datasets: [
            {
                data: [3200, 4500, 5400, 3800, 4200, 5100],
                color: (opacity = 1) => COLORS.secondary,
                label: 'Gelir'
            },
            {
                data: [2100, 3200, 2800, 2400, 2900, 3100],
                color: (opacity = 1) => COLORS.primary,
                label: 'Gider'
            }
        ]
    };

    const categoryData = [
        {
            name: "Market",
            amount: 2800,
            color: "#FF6384",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Faturalar",
            amount: 1500,
            color: "#36A2EB",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Ulaşım",
            amount: 800,
            color: "#FFCE56",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Eğlence",
            amount: 600,
            color: "#4BC0C0",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen 
                options={{
                    title: "Detaylı Analiz",
                    headerTitleStyle: {
                        fontFamily: FONTS.medium
                    }
                }} 
            />
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Aylık Gelir/Gider Grafiği</Text>
                    <BarChart
                        data={monthlyData}
                        width={Dimensions.get('window').width - (SIZES.padding * 2)}
                        height={220}
                        yAxisLabel="₺"
                        chartConfig={{
                            backgroundColor: COLORS.white,
                            backgroundGradientFrom: COLORS.white,
                            backgroundGradientTo: COLORS.white,
                            decimalPlaces: 0,
                            color: (opacity = 1) => COLORS.gray,
                            style: { borderRadius: 16 },
                        }}
                        style={styles.chart}
                        showBarTops={true}
                        showValuesOnTopOfBars={true}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Harcama Kategorileri</Text>
                    <PieChart
                        data={categoryData}
                        width={Dimensions.get('window').width - (SIZES.padding * 2)}
                        height={220}
                        chartConfig={{
                            color: (opacity = 1) => COLORS.gray,
                            style: { borderRadius: 16 },
                        }}
                        accessor="amount"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        style={styles.chart}
                    />
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Ortalama Gelir</Text>
                        <Text style={styles.statValue}>₺4.366</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Ortalama Gider</Text>
                        <Text style={styles.statValue}>₺2.750</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    section: {
        padding: SIZES.padding,
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        padding: SIZES.padding,
        justifyContent: 'space-between',
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    statLabel: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        marginBottom: 4,
    },
    statValue: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.black,
    },
}); 