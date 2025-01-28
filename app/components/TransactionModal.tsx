import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface TransactionModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: {
        type: 'income' | 'expense';
        amount: string;
        category: string;
        description: string;
        date: Date;
    };
}

const TransactionModal: React.FC<TransactionModalProps> = ({
    visible,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [type, setType] = useState<'income' | 'expense'>(initialData?.type || 'expense');
    const [amount, setAmount] = useState(initialData?.amount || '');
    const [category, setCategory] = useState(initialData?.category || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [date, setDate] = useState(initialData?.date || new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const expenseCategories = [
        { id: '1', name: 'Market', icon: 'cart' },
        { id: '2', name: 'Ulaşım', icon: 'bus' },
        { id: '3', name: 'Eğlence', icon: 'game-controller' },
        { id: '4', name: 'Sağlık', icon: 'medical' },
        { id: '5', name: 'Eğitim', icon: 'school' },
        { id: '6', name: 'Faturalar', icon: 'receipt' },
        { id: '7', name: 'Kira', icon: 'home' },
        { id: '8', name: 'Diğer', icon: 'apps' },
    ];

    const incomeCategories = [
        { id: '1', name: 'Maaş', icon: 'cash' },
        { id: '2', name: 'Freelance', icon: 'laptop' },
        { id: '3', name: 'Yatırım', icon: 'trending-up' },
        { id: '4', name: 'Kira Geliri', icon: 'home' },
        { id: '5', name: 'Hediye', icon: 'gift' },
        { id: '6', name: 'Diğer', icon: 'apps' },
    ];

    const categories = type === 'income' ? incomeCategories : expenseCategories;

    const handleTypeChange = (newType: 'income' | 'expense') => {
        setType(newType);
        setCategory(''); // Kategori seçimini sıfırla
    };

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleSubmit = () => {
        if (!amount || !category) {
            Alert.alert('Uyarı', 'Lütfen tutar ve kategori alanlarını doldurun.');
            return;
        }

        onSubmit({
            type,
            amount: parseFloat(amount),
            category,
            description,
            date,
        });

        // Reset form
        setType('expense');
        setAmount('');
        setCategory('');
        setDescription('');
        setDate(new Date());
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {initialData ? 'İşlemi Düzenle' : 'Yeni İşlem'}
                        </Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color={COLORS.gray} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Transaction Type */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>İşlem Tipi</Text>
                            <View style={styles.typeContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.typeButton,
                                        type === 'income' && styles.selectedTypeButton,
                                    ]}
                                    onPress={() => handleTypeChange('income')}
                                >
                                    <Ionicons
                                        name="arrow-up-circle"
                                        size={24}
                                        color={type === 'income' ? COLORS.white : COLORS.primary}
                                    />
                                    <Text style={[
                                        styles.typeText,
                                        type === 'income' && styles.selectedTypeText,
                                    ]}>
                                        Gelir
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.typeButton,
                                        type === 'expense' && styles.selectedTypeButton,
                                    ]}
                                    onPress={() => handleTypeChange('expense')}
                                >
                                    <Ionicons
                                        name="arrow-down-circle"
                                        size={24}
                                        color={type === 'expense' ? COLORS.white : COLORS.primary}
                                    />
                                    <Text style={[
                                        styles.typeText,
                                        type === 'expense' && styles.selectedTypeText,
                                    ]}>
                                        Gider
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Amount */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Tutar</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0.00"
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={setAmount}
                            />
                        </View>

                        {/* Category */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Kategori</Text>
                            <View style={styles.categoryGrid}>
                                {categories.map((cat) => (
                                    <TouchableOpacity
                                        key={cat.id}
                                        style={[
                                            styles.categoryButton,
                                            category === cat.name && styles.selectedCategoryButton,
                                        ]}
                                        onPress={() => setCategory(cat.name)}
                                    >
                                        <Ionicons
                                            name={cat.icon as any}
                                            size={24}
                                            color={category === cat.name ? COLORS.white : COLORS.primary}
                                        />
                                        <Text style={[
                                            styles.categoryText,
                                            category === cat.name && styles.selectedCategoryText,
                                        ]}>
                                            {cat.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Date */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Tarih</Text>
                            <TouchableOpacity
                                style={styles.dateButton}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Ionicons name="calendar" size={24} color={COLORS.primary} />
                                <Text style={styles.dateText}>
                                    {date.toLocaleDateString('tr-TR')}
                                </Text>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    onChange={handleDateChange}
                                    positiveButton={{label: 'Tamam'}}
                                    negativeButton={{label: 'İptal'}}
                                />
                            )}
                        </View>

                        {/* Description */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Açıklama</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="İşlem açıklaması..."
                                multiline
                                numberOfLines={4}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.submitButtonText}>
                                {initialData ? 'Güncelle' : 'Ekle'}
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: SIZES.padding,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    title: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
    },
    section: {
        marginTop: SIZES.padding,
    },
    sectionTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        marginBottom: SIZES.base,
    },
    typeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    typeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.padding,
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        marginHorizontal: SIZES.base,
    },
    selectedTypeButton: {
        backgroundColor: COLORS.primary,
    },
    typeText: {
        marginLeft: SIZES.base,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    selectedTypeText: {
        color: COLORS.white,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -SIZES.base,
    },
    categoryButton: {
        width: '31%',
        alignItems: 'center',
        padding: SIZES.padding,
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        margin: '1%',
    },
    selectedCategoryButton: {
        backgroundColor: COLORS.primary,
    },
    categoryText: {
        marginTop: SIZES.base,
        fontSize: SIZES.font * 0.8,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    selectedCategoryText: {
        color: COLORS.white,
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.padding,
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
    },
    dateText: {
        marginLeft: SIZES.base,
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.black,
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        marginTop: SIZES.padding * 2,
        marginBottom: SIZES.padding,
    },
    submitButtonText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        textAlign: 'center',
    },
    iosDatePicker: {
        width: '100%',
        backgroundColor: COLORS.white,
        marginTop: SIZES.base,
    },
});

export default TransactionModal; 