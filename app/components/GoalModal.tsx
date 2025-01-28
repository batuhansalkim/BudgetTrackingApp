import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import GoalForm from './GoalForm';
import { COLORS } from '../constants/theme';

interface GoalModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: {
        title: string;
        targetAmount: string;
        currentAmount: string;
        deadline: Date;
        icon: string;
        description: string;
    }) => void;
    initialData?: {
        title: string;
        targetAmount: string;
        currentAmount: string;
        deadline: Date;
        icon: string;
        description: string;
    };
}

export default function GoalModal({ 
    visible, 
    onClose, 
    onSubmit,
    initialData 
}: GoalModalProps) {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <GoalForm
                        onSubmit={(data) => {
                            onSubmit(data);
                            onClose();
                        }}
                        onCancel={onClose}
                        initialData={initialData}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '90%',
        paddingTop: 20,
    },
}); 