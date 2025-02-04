import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../app/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import TransactionModal from '../components/TransactionModal';
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleQuickAction = (type: 'income' | 'expense') => {
        setTransactionType(type);
        setShowTransactionModal(true);
    };

    const handleAddTransaction = (data: any) => {
        // Burada işlem ekleme mantığı olacak
        setShowTransactionModal(false);
        showNotificationMessage(`${data.amount}₺ tutarında ${transactionType === 'income' ? 'gelir' : 'gider'} eklendi`);
    };

    const showNotificationMessage = (message: string) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    // Sample recent transactions
    const recentTransactions = [
        {
            id: '1',
            type: 'expense',
            amount: '150',
            category: 'Market',
            description: 'Haftalık market alışverişi',
            date: new Date('2024-03-15'),
            icon: 'cart-outline'
        },
        {
            id: '2',
            type: 'income',
            amount: '5400',
            category: 'Maaş',
            description: 'Mart ayı maaş',
            date: new Date('2024-03-14'),
            icon: 'cash-outline'
        },
        {
            id: '3',
            type: 'expense',
            amount: '60',
            category: 'Ulaşım',
            description: 'Akbil yükleme',
            date: new Date('2024-03-13'),
            icon: 'bus-outline'
        }
    ];

    // Sample monthly data for chart
    const monthlyData = {
        labels: ["Oca", "Şub", "Mar", "Nis"],
        datasets: [
            {
                data: [3200, 4500, 5400, 3800],
                color: (opacity = 1) => COLORS.secondary,
                label: 'Gelir'
            },
            {
                data: [2100, 3200, 2800, 2400],
                color: (opacity = 1) => COLORS.primary,
                label: 'Gider'
            }
        ]
    };

    const handleSeeAllTransactions = () => {
        router.push('/(tabs)/transactions');
    };

    const handleSeeAnalysisDetails = () => {
        router.push('/analysis'); // Bu sayfayı oluşturmamız gerekecek
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Merhaba,</Text>
                        <Text style={styles.userName}>Batuhan</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications-outline" size={24} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>

                {/* Total Balance Card */}
                <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={styles.balanceCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.balanceTitle}>Toplam Bakiye</Text>
                    <Text style={styles.balanceAmount}>₺100.980.750</Text>
                    <View style={styles.balanceRow}>
                        <View style={styles.balanceItem}>
                            <Ionicons name="arrow-up-circle-outline" size={24} color={COLORS.white} />
                            <Text style={styles.balanceLabel}>Gelir</Text>
                            <Text style={styles.balanceValue}>₺480.225.685</Text>
                        </View>
                        <View style={styles.balanceItem}>
                            <Ionicons name="arrow-down-circle-outline" size={24} color={COLORS.white} />
                            <Text style={styles.balanceLabel}>Gider</Text>
                            <Text style={styles.balanceValue}>₺60,450.00</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => handleQuickAction('income')}
                    >
                        <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
                            <Ionicons name="add-circle-outline" size={24} color={COLORS.secondary} />
                        </View>
                        <Text style={styles.actionText}>Gelir Ekle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => handleQuickAction('expense')}
                    >
                        <View style={[styles.actionIcon, { backgroundColor: '#FFEBEE' }]}>
                            <Ionicons name="remove-circle-outline" size={24} color="#FF5252" />
                        </View>
                        <Text style={styles.actionText}>Gider Ekle</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Transactions */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Son İşlemler</Text>
                        <TouchableOpacity onPress={handleSeeAllTransactions}>
                            <Text style={styles.seeAll}>Tümünü Gör</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {recentTransactions.map((transaction) => (
                        <View key={transaction.id} style={styles.transactionItem}>
                            <View style={[
                                styles.transactionIcon,
                                { backgroundColor: transaction.type === 'income' ? '#E8F5E9' : '#FFEBEE' }
                            ]}>
                                <Ionicons 
                                    name={transaction.icon} 
                                    size={24} 
                                    color={transaction.type === 'income' ? COLORS.secondary : COLORS.primary} 
                                />
                            </View>
                            <View style={styles.transactionInfo}>
                                <Text style={styles.transactionCategory}>{transaction.category}</Text>
                                <Text style={styles.transactionDescription}>{transaction.description}</Text>
                                <Text style={styles.transactionDate}>
                                    {transaction.date.toLocaleDateString('tr-TR')}
                                </Text>
                            </View>
                            <Text style={[
                                styles.transactionAmount,
                                transaction.type === 'income' ? styles.incomeText : styles.expenseText
                            ]}>
                                {transaction.type === 'income' ? '+' : '-'}₺{transaction.amount}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Monthly Analysis */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Aylık Analiz</Text>
                        <TouchableOpacity onPress={handleSeeAnalysisDetails}>
                            <Text style={styles.seeAll}>Detaylar</Text>
                        </TouchableOpacity>
                    </View>
                    
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
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                        showBarTops={true}
                        showValuesOnTopOfBars={true}
                        withInnerLines={false}
                    />
                </View>
            </ScrollView>

            {/* Transaction Modal */}
            <TransactionModal
                visible={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSubmit={handleAddTransaction}
                initialData={{
                    type: transactionType,
                    amount: '',
                    category: '',
                    description: '',
                    date: new Date(),
                }}
            />

            {/* Notification */}
            {showNotification && (
                <View style={styles.notification}>
                    <Text style={styles.notificationText}>{notificationMessage}</Text>
                </View>
            )}
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
    },
    greeting: {
        fontSize: SIZES.large,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
    },
    userName: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.black,
    },
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    balanceCard: {
        margin: SIZES.padding,
        padding: SIZES.padding,
        borderRadius: 20,
        elevation: 5,
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    balanceTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: 'rgba(255,255,255,0.8)',
    },
    balanceAmount: {
        fontSize: SIZES.extraLarge * 1.5,
        fontFamily: FONTS.bold,
        color: COLORS.white,
        marginVertical: SIZES.base,
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.padding,
    },
    balanceItem: {
        alignItems: 'center',
    },
    balanceLabel: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: 'rgba(255,255,255,0.8)',
        marginVertical: SIZES.base,
    },
    balanceValue: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.white,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: SIZES.padding,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    actionText: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
    },
    section: {
        padding: SIZES.padding,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
    },
    seeAll: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginBottom: SIZES.base,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transactionInfo: {
        flex: 1,
        marginLeft: SIZES.padding,
    },
    transactionCategory: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.black,
    },
    transactionDescription: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginTop: 2,
    },
    transactionDate: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginTop: 2,
    },
    transactionAmount: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.large,
        marginLeft: SIZES.padding,
    },
    incomeText: {
        color: COLORS.secondary,
    },
    expenseText: {
        color: COLORS.primary,
    },
    notification: {
        position: 'absolute',
        top: SIZES.padding * 4,
        left: SIZES.padding,
        right: SIZES.padding,
        backgroundColor: COLORS.primary,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        elevation: 5,
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    notificationText: {
        color: COLORS.white,
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        textAlign: 'center',
    },
}); 