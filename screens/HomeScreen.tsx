import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import Button from '../components/Button';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showSOSModal, setShowSOSModal] = useState(false);
  
  // Sample data for recent seizures
  const recentSeizures = [
    { id: 1, date: '2023-07-18', time: '14:30', duration: '45 seconds', severity: 'Mild' },
    { id: 2, date: '2023-07-15', time: '09:15', duration: '2 minutes', severity: 'Moderate' },
    { id: 3, date: '2023-07-10', time: '22:45', duration: '1 minute', severity: 'Mild' },
  ];

  // Generate a brain wave pattern URL using the Image Generation API
  const brainWavePatternUrl = 'https://api.a0.dev/assets/image?text=Simple%20brain%20wave%20pattern%20with%20light%20blue%20lines%20on%20white%20background&aspect=3:1';
  
  // Generate a subtle background pattern URL
  const backgroundPatternUrl = 'https://api.a0.dev/assets/image?text=Subtle%20light%20blue%20and%20green%20wave%20pattern%20background%20with%20very%20low%20opacity&aspect=9:16';

  useEffect(() => {
    // Fade in animation for the app title
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderSeizureCard = (seizure) => (
    <TouchableOpacity 
      key={seizure.id} 
      style={styles.seizureCard}
      activeOpacity={0.7}
    >
      <View style={styles.seizureCardHeader}>
        <Text style={styles.seizureCardDate}>{seizure.date}</Text>
        <Text style={styles.seizureCardTime}>{seizure.time}</Text>
      </View>
      <View style={styles.seizureCardDetails}>
        <View style={styles.seizureCardDetail}>
          <Feather name="clock" size={16} color={COLORS.textLight} />
          <Text style={styles.seizureCardDetailText}>{seizure.duration}</Text>
        </View>
        <View style={styles.seizureCardDetail}>
          <Feather name="activity" size={16} color={COLORS.textLight} />
          <Text style={styles.seizureCardDetailText}>{seizure.severity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleSOSPress = () => {
    setShowSOSModal(true);
  };

  const handleSOSConfirm = () => {
    setShowSOSModal(false);
    // Here you could trigger backend alert then navigate to SOS hub
    Alert.alert(
      "Emergency Alert Sent",
      "Your emergency contacts have been notified of your location.",
      [
        {
          text: "Go to SOS Page",
          onPress: () => navigation.navigate('SOS' as never),
        },
        { text: "OK" },
      ]
    );
  };

  const handleSOSCancel = () => {
    setShowSOSModal(false);
  };

  const featureCards = [
    {
      id: 1,
      title: 'Seizure Diary',
      icon: 'book',
      color: COLORS.seizureDiary,
      onPress: () => navigation.navigate('SeizureDiary'),
    },
    {
      id: 2,
      title: 'Medication Reminder',
      icon: 'clock',
      color: COLORS.medicationReminder,
      onPress: () => navigation.navigate('MedicationReminder'),
    },
    {
      id: 3,
      title: 'Doctor Connect',
      icon: 'user',
      color: COLORS.doctorConnect,
      onPress: () => navigation.navigate('DoctorConnect'),
    },
    {
      id: 4,
      title: 'How to Use App',
      icon: 'help-circle',
      color: COLORS.howToUse,
      onPress: () => navigation.navigate('HowToUse'),
    },
  ];

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
          
          <Animated.Text style={[styles.appTitle, { opacity: fadeAnim }]}>
            Seizure Tracker
          </Animated.Text>
          
          <TouchableOpacity style={styles.profileButton}>
            <Feather name="user" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Hello, John</Text>
          <Text style={styles.subGreeting}>How are you feeling today?</Text>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.featureCardsContainer}>
            {featureCards.map((card) => (
              <TouchableOpacity 
                key={card.id}
                style={styles.featureCard}
                activeOpacity={0.8}
                onPress={card.onPress}
              >
                <View style={[styles.featureCardIcon, { backgroundColor: card.color }]}>
                  <Feather name={card.icon} size={32} color={COLORS.white} />
                </View>
                <Text style={styles.featureCardTitle}>{card.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryCardHeader}>
              <Text style={styles.summaryCardTitle}>Monthly Summary</Text>
              <TouchableOpacity>
                <Text style={styles.summaryCardAction}>View Details</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.summaryContent}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>3</Text>
                <Text style={styles.summaryLabel}>Seizures</Text>
              </View>
              
              <View style={styles.summaryDivider} />
              
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>2</Text>
                <Text style={styles.summaryLabel}>Mild</Text>
              </View>
              
              <View style={styles.summaryDivider} />
              
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>1</Text>
                <Text style={styles.summaryLabel}>Moderate</Text>
              </View>
            </View>
            
            <Image 
              source={{ uri: brainWavePatternUrl }}
              style={styles.brainWavePattern}
              resizeMode="cover"
            />
          </View>

          <View style={styles.recentSeizuresSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Seizures</Text>
              <TouchableOpacity>
                <Text style={styles.sectionAction}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {recentSeizures.map(renderSeizureCard)}
            
            {recentSeizures.length === 0 && (
              <View style={styles.emptyState}>
                <Feather name="calendar" size={40} color={COLORS.textLight} />
                <Text style={styles.emptyStateText}>No seizures recorded yet</Text>
                <Button 
                  title="Record First Seizure" 
                  onPress={() => {}} 
                  variant="primary"
                  size="small"
                  style={styles.emptyStateButton}
                />
              </View>
            )}
          </View>

          <View style={styles.medicationSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Medication Reminder</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MedicationReminder')}>
                <Text style={styles.sectionAction}>Manage</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.medicationCard}>
              <View style={styles.medicationCardContent}>
                <View style={styles.medicationIconContainer}>
                  <Feather name="clock" size={24} color={COLORS.white} />
                </View>
                <View style={styles.medicationDetails}>
                  <Text style={styles.medicationName}>Evening Medication</Text>
                  <Text style={styles.medicationTime}>8:00 PM</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.medicationTakenButton}>
                <Text style={styles.medicationTakenButtonText}>Mark as Taken</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        
        <TouchableOpacity 
          style={styles.sosButton}
          activeOpacity={0.8}
          onPress={handleSOSPress}
        >
          <Feather name="alert-triangle" size={32} color={COLORS.white} />
          <Text style={styles.sosButtonText}>SOS</Text>
        </TouchableOpacity>
      </View>

      {/* SOS Confirmation Modal */}
      <Modal
        visible={showSOSModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Feather name="alert-triangle" size={40} color={COLORS.emergency} />
              <Text style={styles.modalTitle}>Emergency Alert</Text>
            </View>
            
            <Text style={styles.modalText}>
              Are you sure you want to send an emergency alert to your contacts?
            </Text>
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={handleSOSCancel}
                variant="outline"
                style={styles.modalButton}
              />
              <Button
                title="Send Alert"
                onPress={handleSOSConfirm}
                variant="primary"
                style={[styles.modalButton, styles.confirmButton]}
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
    marginBottom: SPACING.medium,
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
  appTitle: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  greetingContainer: {
    marginBottom: SPACING.large,
  },
  greeting: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subGreeting: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    marginTop: SPACING.xsmall,
  },
  scrollContent: {
    paddingBottom: SPACING.xlarge,
  },
  featureCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.large,
  },
  featureCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  featureCardIcon: {
    width: 70,
    height: 70,
    borderRadius: BORDER_RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.medium,
    ...SHADOWS.small,
  },
  featureCardTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.large,
  },
  quickActionButton: {
    alignItems: 'center',
    width: '30%',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.small,
    ...SHADOWS.small,
  },
  quickActionText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.medium,
    marginBottom: SPACING.large,
    ...SHADOWS.small,
  },
  summaryCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  summaryCardTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  summaryCardAction: {
    fontSize: FONT_SIZES.small,
    color: COLORS.primary,
    fontWeight: '500',
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.medium,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: FONT_SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  summaryLabel: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    marginTop: SPACING.xsmall,
  },
  summaryDivider: {
    width: 1,
    height: '80%',
    backgroundColor: COLORS.border,
    alignSelf: 'center',
  },
  brainWavePattern: {
    width: '100%',
    height: 60,
    borderRadius: BORDER_RADIUS.medium,
  },
  recentSeizuresSection: {
    marginBottom: SPACING.large,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  sectionAction: {
    fontSize: FONT_SIZES.small,
    color: COLORS.primary,
    fontWeight: '500',
  },
  seizureCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    ...SHADOWS.small,
  },
  seizureCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.small,
  },
  seizureCardDate: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
  seizureCardTime: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
  },
  seizureCardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seizureCardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seizureCardDetailText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    marginLeft: SPACING.xsmall,
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
  medicationSection: {
    marginBottom: SPACING.large,
  },
  medicationCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.medium,
    ...SHADOWS.small,
  },
  medicationCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  medicationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.medium,
  },
  medicationDetails: {
    flex: 1,
  },
  medicationName: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
  medicationTime: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    marginTop: SPACING.xsmall,
  },
  medicationTakenButton: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.small,
    alignItems: 'center',
  },
  medicationTakenButtonText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.primary,
    fontWeight: '500',
  },
  sosButton: {
    position: 'absolute',
    bottom: SPACING.large,
    right: SPACING.large,
    width: 70,
    height: 70,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.emergency,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.large,
  },
  sosButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.small,
    fontWeight: 'bold',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.large,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.large,
    width: '90%',
    maxWidth: 400,
    ...SHADOWS.large,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.emergency,
    marginTop: SPACING.small,
  },
  modalText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    textAlign: 'center',
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
  confirmButton: {
    backgroundColor: COLORS.emergency,
  },
});

export default HomeScreen;