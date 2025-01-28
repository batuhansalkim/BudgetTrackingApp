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

export default function HomeScreen() {
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
                    <Text style={styles.balanceAmount}>₺1.680.750</Text>
                    <View style={styles.balanceRow}>
                        <View style={styles.balanceItem}>
                            <Ionicons name="arrow-up-circle-outline" size={24} color={COLORS.white} />
                            <Text style={styles.balanceLabel}>Gelir</Text>
                            <Text style={styles.balanceValue}>₺680.225.685</Text>
                        </View>
                        <View style={styles.balanceItem}>
                            <Ionicons name="arrow-down-circle-outline" size={24} color={COLORS.white} />
                            <Text style={styles.balanceLabel}>Gider</Text>
                            <Text style={styles.balanceValue}>₺2,450.00</Text>
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
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>Tümünü Gör</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* Transaction List Placeholder */}
                    <Text style={styles.placeholder}>İşlemler burada listelenecek</Text>
                </View>

                {/* Monthly Analysis */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Aylık Analiz</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>Detaylar</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* Analysis Chart Placeholder */}
                    <Text style={styles.placeholder}>Grafik burada gösterilecek</Text>
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
    placeholder: {
        textAlign: 'center',
        color: COLORS.gray,
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        paddingVertical: SIZES.padding,
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