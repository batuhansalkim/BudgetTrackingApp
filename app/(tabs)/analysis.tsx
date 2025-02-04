import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../app/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import ExpenseChart from '../components/charts/ExpenseChart';
import SpendingTrendChart from '../components/charts/SpendingTrendChart';
import CategoryComparisonChart from '../components/charts/CategoryComparisonChart';

const periods = ["Bu Ay", "Son 3 Ay", "Son 6 Ay", "Bu Yıl"];

export default function AnalysisScreen() {
    const [selectedPeriod, setSelectedPeriod] = useState('Bu Ay');
    const [showPeriodModal, setShowPeriodModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState<'overview' | 'expenses' | 'income'>('overview');

    // Sample data
    const expenseData = [
        { category: 'Market', amount: 2500, color: '#FF6384', icon: 'cart-outline' },
        { category: 'Ulaşım', amount: 1200, color: '#36A2EB', icon: 'bus-outline' },
        { category: 'Faturalar', amount: 1800, color: '#FFCE56', icon: 'receipt-outline' },
        { category: 'Yemek', amount: 900, color: '#4BC0C0', icon: 'restaurant-outline' },
        { category: 'Alışveriş', amount: 1500, color: '#9966FF', icon: 'bag-outline' },
    ];

    const trendData = {
        labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
        datasets: [
            {
                data: [4500, 5200, 4800, 5800, 5100, 6200],
                color: (opacity = 1) => COLORS.primary,
                strokeWidth: 2,
            },
        ],
    };

    const categoryData = {
        labels: ['Market', 'Ulaşım', 'Faturalar', 'Yemek', 'Alışveriş'],
        datasets: [
            {
                data: [2500, 1200, 1800, 900, 1500],
            },
        ],
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'overview':
                return (
                    <>
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryTitle}>Genel Bakış</Text>
                            <View style={styles.summaryRow}>
                                <View style={styles.summaryItem}>
                                    <Text style={styles.summaryLabel}>Toplam Gelir</Text>
                                    <Text style={[styles.summaryValue, styles.incomeText]}>₺8,500</Text>
                                    <Text style={[styles.summaryChange, styles.incomeText]}>+12%</Text>
                                </View>
                                <View style={styles.summaryItem}>
                                    <Text style={styles.summaryLabel}>Toplam Gider</Text>
                                    <Text style={[styles.summaryValue, styles.expenseText]}>₺7,900</Text>
                                    <Text style={[styles.summaryChange, styles.expenseText]}>-8%</Text>
                                </View>
                            </View>
                        </View>
                        <SpendingTrendChart data={trendData} title="Aylık Trend" />
                    </>
                );
            case 'expenses':
                return (
                    <>
                        <ExpenseChart data={expenseData} totalExpense={7900} />
                        <CategoryComparisonChart data={categoryData} />
                    </>
                );
            case 'income':
                return (
                    <View style={styles.incomeAnalysis}>
                        <Text style={styles.chartTitle}>Gelir Kaynakları</Text>
                        {/* Gelir analizi içeriği buraya eklenecek */}
                    </View>
                );
            default:
                return null;
        }
    };

    const renderBudgetSection = () => (
        <View style={styles.budgetSection}>
            <Text style={styles.sectionTitle}>Bütçe Durumu</Text>
            <View style={styles.budgetProgressCard}>
                <View style={styles.budgetHeader}>
                    <Text style={styles.budgetCategory}>Aylık Bütçe</Text>
                    <Text style={styles.budgetAmount}>₺7,900 / ₺10,000</Text>
                </View>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '79%' }]} />
                </View>
                <Text style={styles.budgetRemaining}>Kalan: ₺2,100</Text>
            </View>
        </View>
    );

    const renderComparison = () => (
        <View style={styles.comparisonSection}>
            <Text style={styles.sectionTitle}>Geçmiş Dönem Karşılaştırması</Text>
            <View style={styles.comparisonCard}>
                <View style={styles.comparisonItem}>
                    <Text style={styles.comparisonLabel}>Geçen Ay</Text>
                    <Text style={styles.comparisonValue}>₺6,800</Text>
                    <Text style={styles.comparisonChange}>%16 Artış</Text>
                </View>
                <View style={styles.comparisonItem}>
                    <Text style={styles.comparisonLabel}>Ortalama (6 Ay)</Text>
                    <Text style={styles.comparisonValue}>₺6,200</Text>
                    <Text style={styles.comparisonChange}>%27 Artış</Text>
                </View>
            </View>
        </View>
    );

    const renderSavingTips = () => (
        <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>Tasarruf Önerileri</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.tipCard}>
                    <Ionicons name="trending-down" size={24} color={COLORS.primary} />
                    <Text style={styles.tipTitle}>Market Harcamaları</Text>
                    <Text style={styles.tipText}>
                        Bu ay market harcamalarınız geçen aya göre %20 arttı. 
                        İndirim günlerini takip ederek tasarruf edebilirsiniz.
                    </Text>
                </View>
                <View style={styles.tipCard}>
                    <Ionicons name="bulb" size={24} color={COLORS.secondary} />
                    <Text style={styles.tipTitle}>Fatura Tasarrufu</Text>
                    <Text style={styles.tipText}>
                        Elektrik faturanız ortalamadan yüksek. 
                        Enerji tasarruflu cihazlar kullanmayı düşünebilirsiniz.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );

    const renderSpendingHabits = () => (
        <View style={styles.habitsSection}>
            <Text style={styles.sectionTitle}>Harcama Alışkanlıkları</Text>
            <View style={styles.habitCard}>
                <Text style={styles.habitTitle}>En Çok Harcama Yapılan Günler</Text>
                <View style={styles.habitItem}>
                    <Text style={styles.habitDay}>Cumartesi</Text>
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Analiz</Text>
                <TouchableOpacity 
                    style={styles.periodButton}
                    onPress={() => setShowPeriodModal(true)}
                >
                    <Text style={styles.periodText}>{selectedPeriod}</Text>
                    <Ionicons name="chevron-down-outline" size={20} color={COLORS.gray} />
                </TouchableOpacity>
            </View>

            {/* Tab Buttons */}
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tabButton, selectedTab === 'overview' && styles.activeTab]}
                    onPress={() => setSelectedTab('overview')}
                >
                    <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>
                        Genel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tabButton, selectedTab === 'expenses' && styles.activeTab]}
                    onPress={() => setSelectedTab('expenses')}
                >
                    <Text style={[styles.tabText, selectedTab === 'expenses' && styles.activeTabText]}>
                        Giderler
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tabButton, selectedTab === 'income' && styles.activeTab]}
                    onPress={() => setSelectedTab('income')}
                >
                    <Text style={[styles.tabText, selectedTab === 'income' && styles.activeTabText]}>
                        Gelirler
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {renderTabContent()}
                {renderBudgetSection()}
                {renderComparison()}
                {renderSavingTips()}
            </ScrollView>

            {/* Period Selection Modal */}
            <Modal
                visible={showPeriodModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowPeriodModal(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowPeriodModal(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Dönem Seçin</Text>
                        {periods.map((period) => (
                            <TouchableOpacity
                                key={period}
                                style={[
                                    styles.periodOption,
                                    selectedPeriod === period && styles.selectedPeriod
                                ]}
                                onPress={() => {
                                    setSelectedPeriod(period);
                                    setShowPeriodModal(false);
                                }}
                            >
                                <Text style={[
                                    styles.periodOptionText,
                                    selectedPeriod === period && styles.selectedPeriodText
                                ]}>
                                    {period}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
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
        paddingBottom: SIZES.base,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    title: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.black,
    },
    periodButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.base,
        borderRadius: SIZES.radius,
    },
    periodText: {
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        marginRight: SIZES.base,
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.white,
    },
    tabButton: {
        flex: 1,
        paddingVertical: SIZES.base,
        marginHorizontal: 4,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
    },
    activeTab: {
        backgroundColor: COLORS.primary,
    },
    tabText: {
        fontFamily: FONTS.medium,
        color: COLORS.gray,
    },
    activeTabText: {
        color: COLORS.white,
    },
    content: {
        flex: 1,
        padding: SIZES.padding,
    },
    summaryCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginBottom: SIZES.padding,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
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
    summaryChange: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginTop: 4,
    },
    incomeText: {
        color: COLORS.secondary,
    },
    expenseText: {
        color: COLORS.primary,
    },
    chartTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        width: '80%',
    },
    modalTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
    periodOption: {
        paddingVertical: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    selectedPeriod: {
        backgroundColor: COLORS.lightGray,
    },
    periodOptionText: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        textAlign: 'center',
    },
    selectedPeriodText: {
        color: COLORS.primary,
    },
    incomeAnalysis: {
        padding: SIZES.padding,
    },
    budgetSection: {
        padding: SIZES.padding,
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
    budgetProgressCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginBottom: SIZES.padding,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    budgetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    budgetCategory: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
    },
    budgetAmount: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
    },
    progressBar: {
        height: 10,
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        marginBottom: SIZES.padding,
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 5,
    },
    budgetRemaining: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
    },
    comparisonSection: {
        padding: SIZES.padding,
    },
    comparisonCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginBottom: SIZES.padding,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    comparisonItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    comparisonLabel: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
    },
    comparisonValue: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.black,
    },
    comparisonChange: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    tipsSection: {
        marginTop: SIZES.padding * 2,
    },
    tipCard: {
        width: 250,
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        marginRight: SIZES.padding,
        elevation: 2,
    },
    tipTitle: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.font,
        marginVertical: SIZES.base,
    },
    tipText: {
        fontFamily: FONTS.regular,
        color: COLORS.gray,
    },
}); 