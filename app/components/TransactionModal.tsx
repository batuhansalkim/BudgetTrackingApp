import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import TransactionForm from './TransactionForm';
import { COLORS } from '../constants/theme';

interface TransactionModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: {
        type: 'income' | 'expense';
        amount: string;
        category: string;
        description: string;
        date: Date;
    }) => void;
    initialData?: {
        type: 'income' | 'expense';
        amount: string;
        category: string;
        description: string;
        date: Date;
    };
}

export default function TransactionModal({ 
    visible, 
    onClose, 
    onSubmit,
    initialData 
}: TransactionModalProps) {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TransactionForm
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