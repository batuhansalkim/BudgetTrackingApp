import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../app/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import ExpenseChart from '../components/charts/ExpenseChart';
import SpendingTrendChart from '../components/charts/SpendingTrendChart';
import CategoryComparisonChart from '../components/charts/CategoryComparisonChart';

// Sample data - replace with real data later
const sampleExpenseData = [
    { category: 'Market', amount: 2500, color: '#FF6384' },
    { category: 'Ulaşım', amount: 1200, color: '#36A2EB' },
    { category: 'Faturalar', amount: 1800, color: '#FFCE56' },
    { category: 'Yemek', amount: 900, color: '#4BC0C0' },
    { category: 'Alışveriş', amount: 1500, color: '#9966FF' },
];

const sampleTrendData = {
    labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
    datasets: [
        {
            data: [4500, 5200, 4800, 5800, 5100, 6200],
            color: (opacity = 1) => COLORS.primary,
            strokeWidth: 2,
        },
    ],
};

const sampleCategoryData = {
    labels: ['Market', 'Ulaşım', 'Faturalar', 'Yemek', 'Alışveriş'],
    datasets: [
        {
            data: [2500, 1200, 1800, 900, 1500],
        },
    ],
};

export default function AnalysisScreen() {
    const [selectedPeriod, setSelectedPeriod] = useState('Bu Ay');
    const totalExpense = sampleExpenseData.reduce((sum, item) => sum + item.amount, 0);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Analiz</Text>
                <TouchableOpacity style={styles.dateButton}>
                    <Text style={styles.dateText}>{selectedPeriod}</Text>
                    <Ionicons name="chevron-down-outline" size={20} color={COLORS.gray} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {/* Overview Card */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Genel Bakış</Text>
                    <View style={styles.summaryRow}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>Toplam Gelir</Text>
                            <Text style={[styles.summaryValue, styles.incomeText]}>₺8,500</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>Toplam Gider</Text>
                            <Text style={[styles.summaryValue, styles.expenseText]}>₺{totalExpense}</Text>
                        </View>
                    </View>
                </View>

                {/* Expense Distribution */}
                <ExpenseChart 
                    data={sampleExpenseData}
                    totalExpense={totalExpense}
                />

                {/* Spending Trend */}
                <SpendingTrendChart 
                    data={sampleTrendData}
                    title="Harcama Trendi"
                />

                {/* Category Comparison */}
                <CategoryComparisonChart data={sampleCategoryData} />

                {/* Budget Status */}
                <View style={styles.budgetCard}>
                    <Text style={styles.cardTitle}>Bütçe Durumu</Text>
                    <View style={styles.budgetItem}>
                        <View style={styles.budgetHeader}>
                            <Text style={styles.budgetCategory}>Market</Text>
                            <Text style={styles.budgetAmount}>₺2,500 / ₺3,000</Text>
                        </View>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '83%', backgroundColor: '#FF6384' }]} />
                        </View>
                    </View>
                    <View style={styles.budgetItem}>
                        <View style={styles.budgetHeader}>
                            <Text style={styles.budgetCategory}>Ulaşım</Text>
                            <Text style={styles.budgetAmount}>₺1,200 / ₺1,500</Text>
                        </View>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '80%', backgroundColor: '#36A2EB' }]} />
                        </View>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
        paddingTop: SIZES.padding,
        paddingBottom: SIZES.padding,
    },
    title: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.black,
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.base,
        borderRadius: 20,
    },
    dateText: {
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        marginRight: SIZES.base,
    },
    content: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
    },
    summaryCard: {
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
    summaryTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryItem: {
        flex: 1,
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        marginBottom: SIZES.base,
    },
    summaryValue: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
    },
    incomeText: {
        color: COLORS.secondary,
    },
    expenseText: {
        color: COLORS.primary,
    },
    budgetCard: {
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
    cardTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
    budgetItem: {
        marginBottom: SIZES.padding,
    },
    budgetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZES.base,
    },
    budgetCategory: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.black,
    },
    budgetAmount: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
    },
    progressBar: {
        height: 8,
        backgroundColor: COLORS.lightGray,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
}); 