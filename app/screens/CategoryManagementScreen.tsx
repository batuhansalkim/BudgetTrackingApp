import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    budgetLimit?: number;
}

const CategoryManagementScreen = () => {
    const [categories, setCategories] = useState<Category[]>([
        { id: '1', name: 'Market', icon: 'cart', color: '#4CAF50', budgetLimit: 1000 },
        { id: '2', name: 'Ulaşım', icon: 'bus', color: '#2196F3', budgetLimit: 500 },
        { id: '3', name: 'Eğlence', icon: 'game-controller', color: '#9C27B0', budgetLimit: 300 },
    ]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [newCategory, setNewCategory] = useState({
        name: '',
        icon: 'apps',
        color: COLORS.primary,
        budgetLimit: '',
    });

    const handleAddCategory = () => {
        if (newCategory.name.trim()) {
            const category = {
                id: Date.now().toString(),
                name: newCategory.name,
                icon: newCategory.icon,
                color: newCategory.color,
                budgetLimit: Number(newCategory.budgetLimit) || undefined,
            };
            setCategories([...categories, category]);
            setNewCategory({ name: '', icon: 'apps', color: COLORS.primary, budgetLimit: '' });
            setShowAddModal(false);
        }
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setNewCategory({
            name: category.name,
            icon: category.icon,
            color: category.color,
            budgetLimit: category.budgetLimit?.toString() || '',
        });
        setShowAddModal(true);
    };

    const handleUpdateCategory = () => {
        if (editingCategory && newCategory.name.trim()) {
            const updatedCategories = categories.map(cat => 
                cat.id === editingCategory.id
                    ? {
                        ...cat,
                        name: newCategory.name,
                        icon: newCategory.icon,
                        color: newCategory.color,
                        budgetLimit: Number(newCategory.budgetLimit) || undefined,
                    }
                    : cat
            );
            setCategories(updatedCategories);
            setEditingCategory(null);
            setNewCategory({ name: '', icon: 'apps', color: COLORS.primary, budgetLimit: '' });
            setShowAddModal(false);
        }
    };

    const handleDeleteCategory = (id: string) => {
        setCategories(categories.filter(cat => cat.id !== id));
    };

    const renderCategoryItem = ({ item }: { item: Category }) => (
        <View style={styles.categoryItem}>
            <View style={styles.categoryInfo}>
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                    <Ionicons name={item.icon as any} size={24} color={COLORS.white} />
                </View>
                <View style={styles.categoryDetails}>
                    <Text style={styles.categoryName}>{item.name}</Text>
                    {item.budgetLimit && (
                        <Text style={styles.budgetLimit}>
                            Limit: {item.budgetLimit}₺
                        </Text>
                    )}
                </View>
            </View>
            <View style={styles.categoryActions}>
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleEditCategory(item)}
                >
                    <Ionicons name="pencil" size={20} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleDeleteCategory(item.id)}
                >
                    <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />

            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => {
                    setEditingCategory(null);
                    setNewCategory({ name: '', icon: 'apps', color: COLORS.primary, budgetLimit: '' });
                    setShowAddModal(true);
                }}
            >
                <Ionicons name="add" size={24} color={COLORS.white} />
                <Text style={styles.addButtonText}>Yeni Kategori</Text>
            </TouchableOpacity>

            <Modal
                visible={showAddModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori'}
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Kategori Adı"
                            value={newCategory.name}
                            onChangeText={text => setNewCategory({ ...newCategory, name: text })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Bütçe Limiti (Opsiyonel)"
                            keyboardType="numeric"
                            value={newCategory.budgetLimit}
                            onChangeText={text => setNewCategory({ ...newCategory, budgetLimit: text })}
                        />

                        <View style={styles.colorPicker}>
                            {['#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#F44336'].map(color => (
                                <TouchableOpacity
                                    key={color}
                                    style={[
                                        styles.colorOption,
                                        { backgroundColor: color },
                                        newCategory.color === color && styles.selectedColor
                                    ]}
                                    onPress={() => setNewCategory({ ...newCategory, color })}
                                />
                            ))}
                        </View>

                        <View style={styles.modalActions}>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowAddModal(false)}
                            >
                                <Text style={styles.buttonText}>İptal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={editingCategory ? handleUpdateCategory : handleAddCategory}
                            >
                                <Text style={styles.buttonText}>
                                    {editingCategory ? 'Güncelle' : 'Ekle'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    list: {
        padding: SIZES.padding,
    },
    categoryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        marginBottom: SIZES.base,
        elevation: 2,
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    categoryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.base,
    },
    categoryDetails: {
        flex: 1,
    },
    categoryName: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.black,
    },
    budgetLimit: {
        fontSize: SIZES.font * 0.8,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
    },
    categoryActions: {
        flexDirection: 'row',
    },
    actionButton: {
        padding: SIZES.base,
        marginLeft: SIZES.base,
    },
    addButton: {
        position: 'absolute',
        bottom: SIZES.padding * 2,
        right: SIZES.padding,
        left: SIZES.padding,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    addButtonText: {
        color: COLORS.white,
        marginLeft: SIZES.base,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding * 2,
        width: '90%',
    },
    modalTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginBottom: SIZES.padding,
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
    },
    colorPicker: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: SIZES.padding,
    },
    colorOption: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    selectedColor: {
        borderWidth: 2,
        borderColor: COLORS.black,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        marginHorizontal: SIZES.base,
    },
    cancelButton: {
        backgroundColor: COLORS.lightGray,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
    },
    buttonText: {
        color: COLORS.white,
        textAlign: 'center',
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
});

export default CategoryManagementScreen; 