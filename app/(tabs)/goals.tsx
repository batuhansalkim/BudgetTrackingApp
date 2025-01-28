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
import { LinearGradient } from 'expo-linear-gradient';
import GoalModal from '../components/GoalModal';

// Temporary type for goals
interface Goal {
    id: string;
    title: string;
    targetAmount: string;
    currentAmount: string;
    deadline: Date;
    icon: string;
    description: string;
}

export default function GoalsScreen() {
    const [showModal, setShowModal] = useState(false);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

    const handleAddGoal = (data: Omit<Goal, 'id'>) => {
        const newGoal = {
            ...data,
            id: Date.now().toString(), // Temporary ID generation
        };
        setGoals([newGoal, ...goals]);
    };

    const handleEditGoal = (data: Omit<Goal, 'id'>) => {
        if (selectedGoal) {
            const updatedGoals = goals.map(g => 
                g.id === selectedGoal.id ? { ...data, id: g.id } : g
            );
            setGoals(updatedGoals);
        }
    };

    const handleDeleteGoal = (id: string) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    const calculateProgress = (current: string, target: string) => {
        return (parseFloat(current) / parseFloat(target)) * 100;
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Hedefler</Text>
            </View>

            <ScrollView style={styles.content}>
                {/* Active Goals */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Aktif Hedefler</Text>
                    
                    {goals.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Ionicons name="flag-outline" size={48} color={COLORS.gray} />
                            <Text style={styles.emptyStateText}>Henüz hedef bulunmuyor</Text>
                            <Text style={styles.emptyStateSubText}>
                                İlk hedefini eklemek için aşağıdaki butona tıkla
                            </Text>
                        </View>
                    ) : (
                        goals.map((goal) => {
                            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
                            return (
                                <TouchableOpacity 
                                    key={goal.id}
                                    style={styles.goalCard}
                                    onPress={() => {
                                        setSelectedGoal(goal);
                                        setShowModal(true);
                                    }}
                                >
                                    <View style={styles.goalHeader}>
                                        <View style={styles.goalIcon}>
                                            <Ionicons name={goal.icon} size={24} color={COLORS.primary} />
                                        </View>
                                        <View style={styles.goalInfo}>
                                            <Text style={styles.goalTitle}>{goal.title}</Text>
                                            <Text style={styles.goalDate}>
                                                Bitiş: {goal.deadline.toLocaleDateString('tr-TR')}
                                            </Text>
                                        </View>
                                        <TouchableOpacity onPress={() => handleDeleteGoal(goal.id)}>
                                            <Ionicons name="trash-outline" size={20} color={COLORS.gray} />
                                        </TouchableOpacity>
                                    </View>
                                    
                                    <View style={styles.goalProgress}>
                                        <View style={styles.progressBar}>
                                            <LinearGradient
                                                colors={[COLORS.primary, COLORS.secondary]}
                                                style={[styles.progressFill, { width: `${progress}%` }]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                            />
                                        </View>
                                        <View style={styles.progressNumbers}>
                                            <Text style={styles.currentAmount}>
                                                ₺{parseFloat(goal.currentAmount).toLocaleString('tr-TR')}
                                            </Text>
                                            <Text style={styles.targetAmount}>
                                                ₺{parseFloat(goal.targetAmount).toLocaleString('tr-TR')}
                                            </Text>
                                        </View>
                                        <Text style={styles.progressText}>
                                            {progress.toFixed(1)}% tamamlandı
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    )}
                </View>
            </ScrollView>

            {/* Add Goal Button */}
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => {
                    setSelectedGoal(null);
                    setShowModal(true);
                }}
            >
                <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Ionicons name="add" size={30} color={COLORS.white} />
                </LinearGradient>
            </TouchableOpacity>

            {/* Goal Modal */}
            <GoalModal
                visible={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedGoal(null);
                }}
                onSubmit={(data) => {
                    if (selectedGoal) {
                        handleEditGoal(data);
                    } else {
                        handleAddGoal(data);
                    }
                }}
                initialData={selectedGoal || undefined}
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
        paddingBottom: SIZES.padding,
    },
    title: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.black,
    },
    content: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
    },
    section: {
        marginBottom: SIZES.padding * 2,
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
    emptyState: {
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
    goalCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginBottom: SIZES.padding,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    goalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    goalIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(46, 73, 251, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.base,
    },
    goalInfo: {
        flex: 1,
        marginLeft: SIZES.base,
    },
    goalTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
    },
    goalDate: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
    },
    goalProgress: {
        marginTop: SIZES.base,
    },
    progressBar: {
        height: 8,
        backgroundColor: COLORS.lightGray,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressNumbers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.base,
    },
    currentAmount: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    targetAmount: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
    },
    progressText: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        textAlign: 'center',
        marginTop: SIZES.base,
    },
    addButton: {
        position: 'absolute',
        bottom: SIZES.padding * 2,
        right: SIZES.padding,
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 