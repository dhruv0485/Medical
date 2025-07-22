import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import Button from '../components/Button';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const MedicationReminderScreen = () => {
  const navigation = useNavigation();
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Sample data for medications
  const medications = [
    { 
      id: 1, 
      name: 'Levetiracetam', 
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: 'July 1, 2025 - December 31, 2025',
      reason: 'Control seizures',
      time: ['8:00 AM', '8:00 PM'],
      taken: [true, false],
    },
    { 
      id: 2, 
      name: 'Lamotrigine', 
      dosage: '200mg',
      frequency: 'Once daily',
      duration: 'July 1, 2025 - Ongoing',
      reason: 'Prevent seizures',
      time: ['10:00 AM'],
      taken: [true],
    },
    { 
      id: 3, 
      name: 'Vitamin D3', 
      dosage: '1000 IU',
      frequency: 'Once daily',
      duration: 'July 1, 2025 - Ongoing',
      reason: 'Supplement',
      time: ['8:00 AM'],
      taken: [false],
    },
  ];

  // Generate a subtle background pattern URL
  const backgroundPatternUrl = 'https://api.a0.dev/assets/image?text=Subtle%20light%20blue%20and%20green%20wave%20pattern%20background%20with%20very%20low%20opacity&aspect=9:16';

  const handleAddMedication = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const toggleTaken = (medicationId, index) => {
    // In a real app, this would update the state
    console.log(`Toggling medication ${medicationId}, dose ${index}`);
  };

  const renderMedicationCard = (medication) => (
    <View key={medication.id} style={styles.medicationCard}>
      <View style={styles.medicationCardHeader}>
        <View style={[styles.medicationIconContainer, { backgroundColor: COLORS.medicationReminder }]}>
          <Feather name="package" size={24} color={COLORS.white} />
        </View>
        <View style={styles.medicationHeaderContent}>
          <Text style={styles.medicationName}>{medication.name}</Text>
          <Text style={styles.medicationDosage}>{medication.dosage} • {medication.frequency}</Text>
        </View>
        <TouchableOpacity style={styles.medicationMoreButton}>
          <Feather name="more-vertical" size={20} color={COLORS.textLight} />
        </TouchableOpacity>
      </View>

      <View style={styles.medicationCardDivider} />

      <View style={styles.medicationDetails}>
        <View style={styles.medicationDetailRow}>
          <Feather name="calendar" size={16} color={COLORS.textLight} />
          <Text style={styles.medicationDetailText}>{medication.duration}</Text>
        </View>
        <View style={styles.medicationDetailRow}>
          <Feather name="info" size={16} color={COLORS.textLight} />
          <Text style={styles.medicationDetailText}>{medication.reason}</Text>
        </View>
      </View>

      <View style={styles.medicationCardDivider} />

      <View style={styles.medicationSchedule}>
        <Text style={styles.medicationScheduleTitle}>Today's Schedule</Text>
        
        {medication.time.map((time, index) => (
          <View key={index} style={styles.medicationScheduleItem}>
            <View style={styles.medicationScheduleTime}>
              <Feather name="clock" size={16} color={COLORS.textLight} />
              <Text style={styles.medicationScheduleTimeText}>{time}</Text>
            </View>
            <View style={styles.medicationTakenContainer}>
              <Text style={styles.medicationTakenText}>
                {medication.taken[index] ? 'Taken' : 'Not taken'}
              </Text>
              <Switch
                value={medication.taken[index]}
                onValueChange={() => toggleTaken(medication.id, index)}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image 
        source={{ uri: backgroundPatternUrl }}
        style={styles.backgroundPattern}
        resizeMode="cover"
      />
      
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Feather name="menu" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          
          <Text style={styles.screenTitle}>Medication Reminder</Text>
          
          <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
            <Feather name="plus" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.infoCard}>
            <View style={styles.infoCardIcon}>
              <Feather name="info" size={24} color={COLORS.white} />
            </View>
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardTitle}>Medication Reminders</Text>
              <Text style={styles.infoCardText}>
                Track your medications and set reminders to never miss a dose.
                Mark each dose as taken when you've taken your medication.
              </Text>
            </View>
          </View>

          <View style={styles.medicationsContainer}>
            <Text style={styles.sectionTitle}>Your Medications</Text>
            
            {medications.length > 0 ? (
              medications.map(renderMedicationCard)
            ) : (
              <View style={styles.emptyState}>
                <Feather name="package" size={40} color={COLORS.textLight} />
                <Text style={styles.emptyStateText}>No medications added yet</Text>
                <Button 
                  title="Add Medication" 
                  onPress={handleAddMedication} 
                  variant="primary"
                  size="small"
                  style={styles.emptyStateButton}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Add Medication Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Medication</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <Feather name="x" size={24} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalText}>
              This is where you would add a form to input medication details.
              For simplicity, we're just showing a placeholder.
            </Text>
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={handleCloseModal}
                variant="outline"
                style={styles.modalButton}
              />
              <Button
                title="Save Medication"
                onPress={handleCloseModal}
                variant="primary"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
  },
  container: {
    flex: 1,
    padding: SPACING.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.large,
    paddingVertical: SPACING.small,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  screenTitle: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  scrollContent: {
    paddingBottom: SPACING.xlarge,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.medium,
    marginBottom: SPACING.large,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  infoCardIcon: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.medicationReminder,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.medium,
  },
  infoCardContent: {
    flex: 1,
  },
  infoCardTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xsmall,
  },
  infoCardText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  medicationsContainer: {
    marginBottom: SPACING.large,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.medium,
  },
  medicationCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    ...SHADOWS.small,
  },
  medicationCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  medicationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.medium,
  },
  medicationHeaderContent: {
    flex: 1,
  },
  medicationName: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  medicationDosage: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    marginTop: 2,
  },
  medicationMoreButton: {
    padding: SPACING.small,
  },
  medicationCardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.small,
  },
  medicationDetails: {
    marginBottom: SPACING.small,
  },
  medicationDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  medicationDetailText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    marginLeft: SPACING.small,
  },
  medicationSchedule: {
    marginTop: SPACING.small,
  },
  medicationScheduleTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.small,
  },
  medicationScheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  medicationScheduleTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicationScheduleTimeText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    marginLeft: SPACING.small,
  },
  medicationTakenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicationTakenText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    marginRight: SPACING.small,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xlarge,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.medium,
    ...SHADOWS.small,
  },
  emptyStateText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    marginTop: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  emptyStateButton: {
    marginTop: SPACING.small,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: BORDER_RADIUS.large,
    borderTopRightRadius: BORDER_RADIUS.large,
    padding: SPACING.large,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.large,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  modalText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    marginBottom: SPACING.large,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: SPACING.xsmall,
  },
});

export default MedicationReminderScreen;