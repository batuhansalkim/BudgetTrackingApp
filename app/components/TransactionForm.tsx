import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

type TransactionType = 'income' | 'expense';

interface TransactionFormProps {
    onSubmit: (data: {
        type: TransactionType;
        amount: string;
        category: string;
        description: string;
        date: Date;
    }) => void;
    onCancel: () => void;
    initialData?: {
        type: TransactionType;
        amount: string;
        category: string;
        description: string;
        date: Date;
    };
}

const categories = {
    income: ['Maaş', 'Yatırım', 'Freelance', 'Diğer'],
    expense: ['Market', 'Ulaşım', 'Faturalar', 'Yemek', 'Alışveriş', 'Diğer'],
};

export default function TransactionForm({ onSubmit, onCancel, initialData }: TransactionFormProps) {
    const [type, setType] = useState<TransactionType>(initialData?.type || 'expense');
    const [amount, setAmount] = useState(initialData?.amount || '');
    const [category, setCategory] = useState(initialData?.category || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [date, setDate] = useState(initialData?.date || new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    const handleSubmit = () => {
        if (!amount || !category) {
            // Show error
            return;
        }
        onSubmit({
            type,
            amount,
            category,
            description,
            date,
        });
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView style={styles.scrollView}>
                {/* Type Selection */}
                <View style={styles.typeContainer}>
                    <TouchableOpacity 
                        style={[
                            styles.typeButton,
                            type === 'expense' && styles.activeTypeButton
                        ]}
                        onPress={() => setType('expense')}
                    >
                        <Text style={[
                            styles.typeText,
                            type === 'expense' && styles.activeTypeText
                        ]}>Gider</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[
                            styles.typeButton,
                            type === 'income' && styles.activeTypeButton
                        ]}
                        onPress={() => setType('income')}
                    >
                        <Text style={[
                            styles.typeText,
                            type === 'income' && styles.activeTypeText
                        ]}>Gelir</Text>
                    </TouchableOpacity>
                </View>

                {/* Amount Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Miktar</Text>
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        placeholder="0.00"
                        placeholderTextColor={COLORS.gray}
                    />
                </View>

                {/* Category Selection */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Kategori</Text>
                    <TouchableOpacity 
                        style={styles.input}
                        onPress={() => setShowCategories(!showCategories)}
                    >
                        <Text style={styles.inputText}>
                            {category || 'Kategori Seçin'}
                        </Text>
                        <Ionicons 
                            name={showCategories ? 'chevron-up' : 'chevron-down'} 
                            size={20} 
                            color={COLORS.gray}
                        />
                    </TouchableOpacity>
                    {showCategories && (
                        <View style={styles.categoriesList}>
                            {categories[type].map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    style={styles.categoryItem}
                                    onPress={() => {
                                        setCategory(cat);
                                        setShowCategories(false);
                                    }}
                                >
                                    <Text style={styles.categoryText}>{cat}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Description Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Açıklama</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Açıklama ekleyin..."
                        placeholderTextColor={COLORS.gray}
                        multiline
                        numberOfLines={3}
                    />
                </View>

                {/* Date Selection */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tarih</Text>
                    <TouchableOpacity 
                        style={styles.input}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={styles.inputText}>
                            {date.toLocaleDateString('tr-TR')}
                        </Text>
                        <Ionicons name="calendar-outline" size={20} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>

                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                setDate(selectedDate);
                            }
                        }}
                    />
                )}
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.cancelButton]} 
                    onPress={onCancel}
                >
                    <Text style={styles.buttonText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.submitButton]} 
                    onPress={handleSubmit}
                >
                    <Text style={[styles.buttonText, styles.submitButtonText]}>
                        {initialData ? 'Güncelle' : 'Ekle'}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scrollView: {
        flex: 1,
        padding: SIZES.padding,
    },
    typeContainer: {
        flexDirection: 'row',
        marginBottom: SIZES.padding * 2,
    },
    typeButton: {
        flex: 1,
        paddingVertical: SIZES.padding,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: COLORS.lightGray,
    },
    activeTypeButton: {
        borderBottomColor: COLORS.primary,
    },
    typeText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.large,
        color: COLORS.gray,
    },
    activeTypeText: {
        color: COLORS.primary,
    },
    inputContainer: {
        marginBottom: SIZES.padding * 1.5,
    },
    label: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginBottom: SIZES.base,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        fontFamily: FONTS.regular,
        fontSize: SIZES.large,
        color: COLORS.black,
    },
    inputText: {
        flex: 1,
        fontFamily: FONTS.regular,
        fontSize: SIZES.large,
        color: COLORS.black,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: SIZES.padding,
    },
    categoriesList: {
        position: 'absolute',
        top: 80,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 1000,
    },
    categoryItem: {
        paddingVertical: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    categoryText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.large,
        color: COLORS.black,
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: SIZES.padding,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
    },
    button: {
        flex: 1,
        height: 50,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: SIZES.base,
    },
    cancelButton: {
        backgroundColor: COLORS.lightGray,
    },
    submitButton: {
        backgroundColor: COLORS.primary,
    },
    buttonText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.large,
        color: COLORS.gray,
    },
    submitButtonText: {
        color: COLORS.white,
    },
}); 