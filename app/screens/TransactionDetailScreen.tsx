import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Share,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

interface TransactionDetailProps {
    route: {
        params: {
            transaction: {
                id: string;
                type: 'income' | 'expense';
                amount: number;
                category: string;
                description: string;
                date: Date;
                attachments?: string[];
                notes?: string;
            }
        }
    };
    navigation: any;
}

const TransactionDetailScreen: React.FC<TransactionDetailProps> = ({ route, navigation }) => {
    const { transaction } = route.params;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `İşlem Detayı:\nTür: ${transaction.type === 'income' ? 'Gelir' : 'Gider'}\nMiktar: ${transaction.amount}₺\nKategori: ${transaction.category}\nTarih: ${new Date(transaction.date).toLocaleDateString('tr-TR')}`,
            });
        } catch (error) {
            Alert.alert('Hata', 'Paylaşım sırasında bir hata oluştu');
        }
    };

    const handleDelete = () => {
        setShowDeleteConfirm(true);
        Alert.alert(
            'İşlemi Sil',
            'Bu işlemi silmek istediğinizden emin misiniz?',
            [
                {
                    text: 'İptal',
                    style: 'cancel',
                    onPress: () => setShowDeleteConfirm(false),
                },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: () => {
                        // TODO: Delete transaction logic
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.amount}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {transaction.amount}₺
                    </Text>
                    <Text style={styles.category}>{transaction.category}</Text>
                    <Text style={styles.date}>
                        {new Date(transaction.date).toLocaleDateString('tr-TR')}
                    </Text>
                </View>
            </LinearGradient>

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('EditTransaction', { transaction })}
                >
                    <Ionicons name="pencil" size={24} color={COLORS.primary} />
                    <Text style={styles.actionText}>Düzenle</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handleShare}
                >
                    <Ionicons name="share-outline" size={24} color={COLORS.primary} />
                    <Text style={styles.actionText}>Paylaş</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handleDelete}
                >
                    <Ionicons name="trash-outline" size={24} color={COLORS.error} />
                    <Text style={[styles.actionText, { color: COLORS.error }]}>Sil</Text>
                </TouchableOpacity>
            </View>

            {/* Details */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Açıklama</Text>
                    <Text style={styles.detailValue}>{transaction.description || '-'}</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Kategori</Text>
                    <View style={styles.categoryTag}>
                        <Text style={styles.categoryTagText}>{transaction.category}</Text>
                    </View>
                </View>

                {transaction.notes && (
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Notlar</Text>
                        <Text style={styles.detailValue}>{transaction.notes}</Text>
                    </View>
                )}

                {transaction.attachments && transaction.attachments.length > 0 && (
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Ekler</Text>
                        <View style={styles.attachmentsList}>
                            {transaction.attachments.map((attachment, index) => (
                                <TouchableOpacity 
                                    key={index}
                                    style={styles.attachmentItem}
                                    onPress={() => {/* TODO: Open attachment */}}
                                >
                                    <Ionicons name="document-outline" size={24} color={COLORS.primary} />
                                    <Text style={styles.attachmentName}>Ek {index + 1}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </View>

            {/* Similar Transactions */}
            <View style={styles.similarTransactions}>
                <Text style={styles.sectionTitle}>Benzer İşlemler</Text>
                <Text style={styles.placeholder}>Benzer işlemler burada listelenecek</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        padding: SIZES.padding * 2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerContent: {
        alignItems: 'center',
    },
    amount: {
        fontSize: SIZES.extraLarge * 1.5,
        fontFamily: FONTS.bold,
        color: COLORS.white,
        marginBottom: SIZES.base,
    },
    category: {
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
        color: COLORS.white,
        marginBottom: SIZES.base,
    },
    date: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.white,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginTop: -SIZES.padding,
        marginHorizontal: SIZES.padding,
        elevation: 5,
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionText: {
        marginTop: SIZES.base,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    detailsContainer: {
        padding: SIZES.padding,
    },
    detailItem: {
        marginBottom: SIZES.padding,
    },
    detailLabel: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        marginBottom: SIZES.base,
    },
    detailValue: {
        fontSize: SIZES.large,
        fontFamily: FONTS.regular,
        color: COLORS.black,
    },
    categoryTag: {
        backgroundColor: COLORS.lightGray,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.base,
        borderRadius: SIZES.radius,
        alignSelf: 'flex-start',
    },
    categoryTagText: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    attachmentsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    attachmentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        padding: SIZES.base,
        borderRadius: SIZES.radius,
        marginRight: SIZES.base,
        marginBottom: SIZES.base,
    },
    attachmentName: {
        marginLeft: SIZES.base,
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.primary,
    },
    similarTransactions: {
        padding: SIZES.padding,
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
    placeholder: {
        textAlign: 'center',
        color: COLORS.gray,
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        paddingVertical: SIZES.padding,
    },
}); 