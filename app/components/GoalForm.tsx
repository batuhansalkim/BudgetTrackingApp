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

interface GoalFormProps {
    onSubmit: (data: {
        title: string;
        targetAmount: string;
        currentAmount: string;
        deadline: Date;
        icon: string;
        description: string;
    }) => void;
    onCancel: () => void;
    initialData?: {
        title: string;
        targetAmount: string;
        currentAmount: string;
        deadline: Date;
        icon: string;
        description: string;
    };
}

const icons = [
    { name: 'car-outline', label: 'Araba' },
    { name: 'home-outline', label: 'Ev' },
    { name: 'airplane-outline', label: 'Seyahat' },
    { name: 'school-outline', label: 'Eğitim' },
    { name: 'phone-portrait-outline', label: 'Elektronik' },
    { name: 'gift-outline', label: 'Diğer' },
];

export default function GoalForm({ onSubmit, onCancel, initialData }: GoalFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [targetAmount, setTargetAmount] = useState(initialData?.targetAmount || '');
    const [currentAmount, setCurrentAmount] = useState(initialData?.currentAmount || '');
    const [deadline, setDeadline] = useState(initialData?.deadline || new Date());
    const [icon, setIcon] = useState(initialData?.icon || 'gift-outline');
    const [description, setDescription] = useState(initialData?.description || '');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showIcons, setShowIcons] = useState(false);

    const handleSubmit = () => {
        if (!title || !targetAmount || !currentAmount) {
            // Show error
            return;
        }
        onSubmit({
            title,
            targetAmount,
            currentAmount,
            deadline,
            icon,
            description,
        });
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView style={styles.scrollView}>
                {/* Icon Selection */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Hedef İkonu</Text>
                    <TouchableOpacity 
                        style={styles.iconSelector}
                        onPress={() => setShowIcons(!showIcons)}
                    >
                        <Ionicons name={icon} size={24} color={COLORS.primary} />
                        <Ionicons 
                            name={showIcons ? 'chevron-up' : 'chevron-down'} 
                            size={20} 
                            color={COLORS.gray}
                        />
                    </TouchableOpacity>
                    {showIcons && (
                        <View style={styles.iconGrid}>
                            {icons.map((item) => (
                                <TouchableOpacity
                                    key={item.name}
                                    style={[
                                        styles.iconItem,
                                        icon === item.name && styles.selectedIconItem
                                    ]}
                                    onPress={() => {
                                        setIcon(item.name);
                                        setShowIcons(false);
                                    }}
                                >
                                    <Ionicons 
                                        name={item.name} 
                                        size={24} 
                                        color={icon === item.name ? COLORS.white : COLORS.primary} 
                                    />
                                    <Text style={[
                                        styles.iconLabel,
                                        icon === item.name && styles.selectedIconLabel
                                    ]}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Title Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Hedef Adı</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Hedef adını girin"
                        placeholderTextColor={COLORS.gray}
                    />
                </View>

                {/* Target Amount Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Hedef Tutar</Text>
                    <TextInput
                        style={styles.input}
                        value={targetAmount}
                        onChangeText={setTargetAmount}
                        keyboardType="numeric"
                        placeholder="0.00"
                        placeholderTextColor={COLORS.gray}
                    />
                </View>

                {/* Current Amount Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mevcut Birikim</Text>
                    <TextInput
                        style={styles.input}
                        value={currentAmount}
                        onChangeText={setCurrentAmount}
                        keyboardType="numeric"
                        placeholder="0.00"
                        placeholderTextColor={COLORS.gray}
                    />
                </View>

                {/* Deadline Selection */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Hedef Tarihi</Text>
                    <TouchableOpacity 
                        style={styles.input}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={styles.inputText}>
                            {deadline.toLocaleDateString('tr-TR')}
                        </Text>
                        <Ionicons name="calendar-outline" size={20} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>

                {/* Description Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Açıklama</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Hedef açıklaması ekleyin..."
                        placeholderTextColor={COLORS.gray}
                        multiline
                        numberOfLines={3}
                    />
                </View>

                {showDatePicker && (
                    <DateTimePicker
                        value={deadline}
                        mode="date"
                        display="default"
                        minimumDate={new Date()}
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                setDeadline(selectedDate);
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
    iconSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.padding,
    },
    iconGrid: {
        position: 'absolute',
        top: 80,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    iconItem: {
        width: '33.33%',
        padding: SIZES.padding,
        alignItems: 'center',
        borderRadius: SIZES.radius,
    },
    selectedIconItem: {
        backgroundColor: COLORS.primary,
    },
    iconLabel: {
        marginTop: SIZES.base,
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
    },
    selectedIconLabel: {
        color: COLORS.white,
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