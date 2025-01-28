import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';

interface FilterOptions {
    startDate: Date | null;
    endDate: Date | null;
    minAmount: string;
    maxAmount: string;
    categories: string[];
    type: 'all' | 'income' | 'expense';
    showDatePicker: boolean;
    datePickerType: 'start' | 'end';
}

const AdvancedSearchScreen = () => {
    const [filters, setFilters] = useState<FilterOptions>({
        startDate: null,
        endDate: null,
        minAmount: '',
        maxAmount: '',
        categories: [],
        type: 'all',
        showDatePicker: false,
        datePickerType: 'start',
    });

    const [savedFilters, setSavedFilters] = useState<{ name: string; options: Partial<FilterOptions> }[]>([
        {
            name: 'Son Ay Giderleri',
            options: {
                startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                endDate: new Date(),
                type: 'expense',
            }
        }
    ]);

    const categories = [
        { id: '1', name: 'Market', icon: 'cart' },
        { id: '2', name: 'Ulaşım', icon: 'bus' },
        { id: '3', name: 'Eğlence', icon: 'game-controller' },
    ];

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setFilters(prev => ({
            ...prev,
            showDatePicker: false,
            [prev.datePickerType === 'start' ? 'startDate' : 'endDate']: selectedDate || prev[prev.datePickerType === 'start' ? 'startDate' : 'endDate'],
        }));
    };

    const toggleCategory = (categoryId: string) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(categoryId)
                ? prev.categories.filter(id => id !== categoryId)
                : [...prev.categories, categoryId],
        }));
    };

    const handleSearch = () => {
        // TODO: Implement search logic
        console.log('Search with filters:', filters);
    };

    const handleSaveFilter = () => {
        const newFilter = {
            name: `Filtre ${savedFilters.length + 1}`,
            options: {
                startDate: filters.startDate,
                endDate: filters.endDate,
                minAmount: filters.minAmount,
                maxAmount: filters.maxAmount,
                categories: filters.categories,
                type: filters.type,
            }
        };
        setSavedFilters([...savedFilters, newFilter]);
    };

    const handleApplySavedFilter = (filter: typeof savedFilters[0]) => {
        setFilters(prev => ({
            ...prev,
            ...filter.options,
        }));
    };

    return (
        <ScrollView style={styles.container}>
            {/* Saved Filters */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Kayıtlı Filtreler</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {savedFilters.map((filter, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.savedFilter}
                            onPress={() => handleApplySavedFilter(filter)}
                        >
                            <Text style={styles.savedFilterText}>{filter.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Date Range */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tarih Aralığı</Text>
                <View style={styles.dateContainer}>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setFilters(prev => ({
                            ...prev,
                            showDatePicker: true,
                            datePickerType: 'start'
                        }))}
                    >
                        <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.dateText}>
                            {filters.startDate ? filters.startDate.toLocaleDateString('tr-TR') : 'Başlangıç'}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.dateSeperator}>-</Text>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setFilters(prev => ({
                            ...prev,
                            showDatePicker: true,
                            datePickerType: 'end'
                        }))}
                    >
                        <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.dateText}>
                            {filters.endDate ? filters.endDate.toLocaleDateString('tr-TR') : 'Bitiş'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {filters.showDatePicker && (
                <DateTimePicker
                    value={filters[filters.datePickerType === 'start' ? 'startDate' : 'endDate'] || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {/* Amount Range */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tutar Aralığı</Text>
                <View style={styles.amountContainer}>
                    <TextInput
                        style={styles.amountInput}
                        placeholder="Min"
                        keyboardType="numeric"
                        value={filters.minAmount}
                        onChangeText={text => setFilters(prev => ({ ...prev, minAmount: text }))}
                    />
                    <Text style={styles.amountSeperator}>-</Text>
                    <TextInput
                        style={styles.amountInput}
                        placeholder="Max"
                        keyboardType="numeric"
                        value={filters.maxAmount}
                        onChangeText={text => setFilters(prev => ({ ...prev, maxAmount: text }))}
                    />
                </View>
            </View>

            {/* Categories */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Kategoriler</Text>
                <View style={styles.categoriesContainer}>
                    {categories.map(category => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryChip,
                                filters.categories.includes(category.id) && styles.selectedCategoryChip
                            ]}
                            onPress={() => toggleCategory(category.id)}
                        >
                            <Ionicons 
                                name={category.icon as any} 
                                size={20} 
                                color={filters.categories.includes(category.id) ? COLORS.white : COLORS.primary} 
                            />
                            <Text style={[
                                styles.categoryChipText,
                                filters.categories.includes(category.id) && styles.selectedCategoryChipText
                            ]}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Transaction Type */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>İşlem Tipi</Text>
                <View style={styles.typeContainer}>
                    <TouchableOpacity
                        style={[styles.typeButton, filters.type === 'all' && styles.selectedTypeButton]}
                        onPress={() => setFilters(prev => ({ ...prev, type: 'all' }))}
                    >
                        <Text style={[styles.typeText, filters.type === 'all' && styles.selectedTypeText]}>
                            Tümü
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.typeButton, filters.type === 'income' && styles.selectedTypeButton]}
                        onPress={() => setFilters(prev => ({ ...prev, type: 'income' }))}
                    >
                        <Text style={[styles.typeText, filters.type === 'income' && styles.selectedTypeText]}>
                            Gelir
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.typeButton, filters.type === 'expense' && styles.selectedTypeButton]}
                        onPress={() => setFilters(prev => ({ ...prev, type: 'expense' }))}
                    >
                        <Text style={[styles.typeText, filters.type === 'expense' && styles.selectedTypeText]}>
                            Gider
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
                <TouchableOpacity 
                    style={[styles.button, styles.saveButton]}
                    onPress={handleSaveFilter}
                >
                    <Ionicons name="bookmark-outline" size={24} color={COLORS.white} />
                    <Text style={styles.buttonText}>Filtreyi Kaydet</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.searchButton]}
                    onPress={handleSearch}
                >
                    <Ionicons name="search" size={24} color={COLORS.white} />
                    <Text style={styles.buttonText}>Ara</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    section: {
        padding: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
    savedFilter: {
        backgroundColor: COLORS.lightGray,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.base,
        borderRadius: SIZES.radius,
        marginRight: SIZES.base,
    },
    savedFilterText: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dateButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
    },
    dateText: {
        marginLeft: SIZES.base,
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.black,
    },
    dateSeperator: {
        marginHorizontal: SIZES.base,
        fontSize: SIZES.large,
        color: COLORS.gray,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountInput: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
    },
    amountSeperator: {
        marginHorizontal: SIZES.padding,
        fontSize: SIZES.large,
        color: COLORS.gray,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.base,
        borderRadius: SIZES.radius,
        marginRight: SIZES.base,
        marginBottom: SIZES.base,
    },
    selectedCategoryChip: {
        backgroundColor: COLORS.primary,
    },
    categoryChipText: {
        marginLeft: SIZES.base,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    selectedCategoryChipText: {
        color: COLORS.white,
    },
    typeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    typeButton: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        marginHorizontal: SIZES.base,
    },
    selectedTypeButton: {
        backgroundColor: COLORS.primary,
    },
    typeText: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    selectedTypeText: {
        color: COLORS.white,
    },
    actionButtons: {
        flexDirection: 'row',
        padding: SIZES.padding,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        marginHorizontal: SIZES.base,
    },
    saveButton: {
        backgroundColor: COLORS.secondary,
    },
    searchButton: {
        backgroundColor: COLORS.primary,
    },
    buttonText: {
        marginLeft: SIZES.base,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.white,
    },
});

export default AdvancedSearchScreen; 