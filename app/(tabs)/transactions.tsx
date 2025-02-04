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
import TransactionModal from '../components/TransactionModal';

// Temporary type for transactions
interface Transaction {
    id: string;
    type: 'income' | 'expense';
    amount: string;
    category: string;
    description: string;
    date: Date;
}

export default function TransactionsScreen() {
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [activeFilter, setActiveFilter] = useState<'currentMonth' | 'income' | 'expense' | 'lastMonth'>('currentMonth');
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    
    // Initial transactions data
    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: '1',
            type: 'income',
            amount: '5400',
            category: 'Maaş',
            description: 'Ocak ayı maaş',
            date: new Date('2024-03-15')
        },
        {
            id: '2',
            type: 'expense',
            amount: '150',
            category: 'Market',
            description: 'Haftalık market alışverişi',
            date: new Date('2024-03-14')
        },
        {
            id: '3',
            type: 'expense',
            amount: '60',
            category: 'Ulaşım',
            description: 'Akbil yükleme',
            date: new Date('2024-03-13')
        },
        {
            id: '4',
            type: 'income',
            amount: '1000',
            category: 'Freelance',
            description: 'Web tasarım projesi',
            date: new Date('2024-03-10')
        },
        {
            id: '5',
            type: 'expense',
            amount: '200',
            category: 'Faturalar',
            description: 'Elektrik faturası',
            date: new Date('2024-03-08')
        },
        {
            id: '6',
            type: 'income',
            amount: '300',
            category: 'Diğer',
            description: 'İkinci el satış',
            date: new Date('2024-03-05')
        }
    ]);

    // Filtered transactions based on activeFilter
    const filteredTransactions = transactions.filter(transaction => {
        if (activeFilter === 'currentMonth') {
            const today = new Date();
            return transaction.date.getMonth() === today.getMonth() && 
                   transaction.date.getFullYear() === today.getFullYear();
        }
        if (activeFilter === 'income') return transaction.type === 'income';
        if (activeFilter === 'expense') return transaction.type === 'expense';
        if (activeFilter === 'lastMonth') {
            const today = new Date();
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);
            return transaction.date.getMonth() === lastMonth.getMonth() && 
                   transaction.date.getFullYear() === lastMonth.getFullYear();
        }
        return true;
    });

    // Sort transactions function
    const getSortedTransactions = (transactionsToSort: Transaction[]) => {
        return [...transactionsToSort].sort((a, b) => {
            if (sortBy === 'date') {
                return sortOrder === 'desc' 
                    ? b.date.getTime() - a.date.getTime()
                    : a.date.getTime() - b.date.getTime();
            } else {
                return sortOrder === 'desc'
                    ? parseFloat(b.amount) - parseFloat(a.amount)
                    : parseFloat(a.amount) - parseFloat(b.amount);
            }
        });
    };

    const handleAddTransaction = (data: Omit<Transaction, 'id'>) => {
        const newTransaction = {
            ...data,
            id: Date.now().toString(), // Temporary ID generation
        };
        setTransactions([newTransaction, ...transactions]);
    };

    const handleEditTransaction = (data: Omit<Transaction, 'id'>) => {
        if (selectedTransaction) {
            const updatedTransactions = transactions.map(t => 
                t.id === selectedTransaction.id ? { ...data, id: t.id } : t
            );
            setTransactions(updatedTransactions);
        }
    };

    const handleDeleteTransaction = (id: string) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>İşlemler</Text>
                <TouchableOpacity 
                    style={styles.headerFilterButton}
                    onPress={() => setShowFilterModal(true)}
                >
                    <Ionicons name="filter-outline" size={24} color={COLORS.gray} />
                </TouchableOpacity>
            </View>

            {/* Filter Modal */}
            <Modal
                visible={showFilterModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowFilterModal(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowFilterModal(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Sıralama</Text>
                        
                        <Text style={styles.modalSubtitle}>Sıralama Kriteri</Text>
                        <View style={styles.optionsContainer}>
                            <TouchableOpacity 
                                style={[styles.optionButton, sortBy === 'date' && styles.selectedOption]}
                                onPress={() => setSortBy('date')}
                            >
                                <Text style={[styles.optionText, sortBy === 'date' && styles.selectedOptionText]}>
                                    Tarih
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.optionButton, sortBy === 'amount' && styles.selectedOption]}
                                onPress={() => setSortBy('amount')}
                            >
                                <Text style={[styles.optionText, sortBy === 'amount' && styles.selectedOptionText]}>
                                    Tutar
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalSubtitle}>Sıralama Yönü</Text>
                        <View style={styles.optionsContainer}>
                            <TouchableOpacity 
                                style={[styles.optionButton, sortOrder === 'desc' && styles.selectedOption]}
                                onPress={() => setSortOrder('desc')}
                            >
                                <Text style={[styles.optionText, sortOrder === 'desc' && styles.selectedOptionText]}>
                                    Azalan
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.optionButton, sortOrder === 'asc' && styles.selectedOption]}
                                onPress={() => setSortOrder('asc')}
                            >
                                <Text style={[styles.optionText, sortOrder === 'asc' && styles.selectedOptionText]}>
                                    Artan
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
                <TouchableOpacity 
                    style={[styles.filterButton, activeFilter === 'currentMonth' && styles.activeFilterButton]}
                    onPress={() => {
                        setActiveFilter('currentMonth');
                    }}
                >
                    <Text style={[styles.filterButtonText, activeFilter === 'currentMonth' && styles.activeFilterButtonText]}>
                        Bu Ay
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.filterButton, activeFilter === 'income' && styles.activeFilterButton]}
                    onPress={() => setActiveFilter('income')}
                >
                    <Text style={[styles.filterButtonText, activeFilter === 'income' && styles.activeFilterButtonText]}>
                        Gelir
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.filterButton, activeFilter === 'expense' && styles.activeFilterButton]}
                    onPress={() => setActiveFilter('expense')}
                >
                    <Text style={[styles.filterButtonText, activeFilter === 'expense' && styles.activeFilterButtonText]}>
                        Gider
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.filterButton, activeFilter === 'lastMonth' && styles.activeFilterButton]}
                    onPress={() => setActiveFilter('lastMonth')}
                >
                    <Text style={[styles.filterButtonText, activeFilter === 'lastMonth' && styles.activeFilterButtonText]}>
                        Geçen Ay
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Transactions List */}
            <ScrollView style={styles.transactionsList}>
                {filteredTransactions.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="receipt-outline" size={48} color={COLORS.gray} />
                        <Text style={styles.emptyStateText}>İşlem bulunmuyor</Text>
                        <Text style={styles.emptyStateSubText}>
                            Seçili filtrede işlem bulunmamaktadır
                        </Text>
                    </View>
                ) : (
                    getSortedTransactions(filteredTransactions).map((transaction) => (
                        <TouchableOpacity 
                            key={transaction.id}
                            style={styles.transactionItem}
                            onPress={() => {
                                setSelectedTransaction(transaction);
                                setShowModal(true);
                            }}
                        >
                            <View style={styles.transactionIcon}>
                                <Ionicons 
                                    name={transaction.type === 'income' ? 'arrow-up' : 'arrow-down'} 
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
                            <Text 
                                style={[
                                    styles.transactionAmount,
                                    transaction.type === 'income' ? styles.incomeText : styles.expenseText
                                ]}
                            >
                                {transaction.type === 'income' ? '+' : '-'}₺{transaction.amount}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            {/* Add Transaction Button */}
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => {
                    setSelectedTransaction(null);
                    setShowModal(true);
                }}
            >
                <Ionicons name="add" size={30} color={COLORS.white} />
            </TouchableOpacity>

            {/* Transaction Modal */}
            <TransactionModal
                visible={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedTransaction(null);
                }}
                onSubmit={(data) => {
                    if (selectedTransaction) {
                        handleEditTransaction(data);
                    } else {
                        handleAddTransaction(data);
                    }
                }}
                initialData={selectedTransaction || undefined}
            />
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
    },
    title: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.black,
    },
    headerFilterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.padding,
        marginBottom: SIZES.padding,
    },
    filterButton: {
        backgroundColor: COLORS.lightGray,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        minWidth: 70,
        alignItems: 'center',
    },
    activeFilterButton: {
        backgroundColor: COLORS.primary,
    },
    filterButtonText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.gray,
    },
    activeFilterButtonText: {
        color: COLORS.white,
    },
    transactionsList: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.padding * 4,
    },
    emptyStateText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.large,
        color: COLORS.gray,
        marginTop: SIZES.padding,
    },
    emptyStateSubText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
        textAlign: 'center',
        marginTop: SIZES.base,
        paddingHorizontal: SIZES.padding * 2,
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
        backgroundColor: COLORS.lightGray,
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
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
        marginLeft: SIZES.padding,
    },
    incomeText: {
        color: COLORS.secondary,
    },
    expenseText: {
        color: COLORS.primary,
    },
    addButton: {
        position: 'absolute',
        bottom: SIZES.padding * 2,
        right: SIZES.padding,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
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
        fontFamily: FONTS.bold,
        fontSize: SIZES.large,
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
    modalSubtitle: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginBottom: SIZES.base,
    },
    optionsContainer: {
        flexDirection: 'row',
        marginBottom: SIZES.padding,
    },
    optionButton: {
        flex: 1,
        padding: SIZES.base,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: COLORS.primary,
    },
    optionText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.gray,
    },
    selectedOptionText: {
        color: COLORS.white,
    },
}); 