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
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

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
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter-outline" size={24} color={COLORS.gray} />
                </TouchableOpacity>
            </View>

            {/* Filter Chips */}
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.filterContainer}
                contentContainerStyle={styles.filterContent}
            >
                <TouchableOpacity style={[styles.chip, styles.activeChip]}>
                    <Text style={[styles.chipText, styles.activeChipText]}>Tümü</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chip}>
                    <Text style={styles.chipText}>Gelirler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chip}>
                    <Text style={styles.chipText}>Giderler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chip}>
                    <Text style={styles.chipText}>Bu Ay</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Transactions List */}
            <ScrollView style={styles.transactionsList}>
                {transactions.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="receipt-outline" size={48} color={COLORS.gray} />
                        <Text style={styles.emptyStateText}>Henüz işlem bulunmuyor</Text>
                        <Text style={styles.emptyStateSubText}>
                            İlk işleminizi eklemek için aşağıdaki butona tıklayın
                        </Text>
                    </View>
                ) : (
                    transactions.map((transaction) => (
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
    filterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterContainer: {
        paddingHorizontal: SIZES.padding,
        marginBottom: SIZES.padding,
    },
    filterContent: {
        paddingRight: SIZES.padding,
    },
    chip: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.base,
        borderRadius: 20,
        backgroundColor: COLORS.lightGray,
        marginRight: SIZES.base,
    },
    activeChip: {
        backgroundColor: COLORS.primary,
    },
    chipText: {
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        fontSize: SIZES.font,
    },
    activeChipText: {
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
}); 