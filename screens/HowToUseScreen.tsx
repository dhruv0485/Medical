import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface Section {
  id: string;
  title: string;
  description: string;
  videoUri?: string;
  steps?: string[];
}

const sections: Section[] = [
  {
    id: 'diary',
    title: 'Seizure Diary',
    description: 'Track your seizures quickly and share with your doctor.',
    videoUri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    steps: ['Tap the diary card', 'View past entries', 'Add a new seizure event'],
  },
  {
    id: 'meds',
    title: 'Medication Reminder',
    description: 'Get gentle alerts to take your meds on time.',
    videoUri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    steps: ['Open reminders', 'Add medications', 'Mark doses as taken'],
  },
  {
    id: 'doctor',
    title: 'Doctor Connect',
    description: 'Chat securely with your doctor in real-time.',
    videoUri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    steps: ['Select a doctor', 'Send messages or attachments', 'Receive responses'],
  },
  {
    id: 'sos',
    title: 'SOS',
    description: 'Send an emergency alert with your location.',
    videoUri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    steps: ['Tap SOS button', 'Confirm alert', 'Help contacts notified'],
  },
];

const HowToUseScreen = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {sections.map((section) => (
          <View key={section.id} style={styles.card}>
            <TouchableOpacity style={styles.cardHeader} onPress={() => setOpenId(openId === section.id ? null : section.id)}>
              <Text style={styles.cardTitle}>{section.title}</Text>
              <Feather name={openId === section.id ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.primary} />
            </TouchableOpacity>
            {openId === section.id && (
              <View style={styles.cardBodyContainer}>
                <Text style={styles.cardBody}>{section.description}</Text>
                {section.steps.map((step, idx) => (
                  <View key={idx} style={styles.stepRow}>
                    <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{idx + 1}</Text></View>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
                <TouchableOpacity style={styles.demoButton} onPress={() => Alert.alert('Play Demo', 'Would play demo: ' + section.videoUri)}>
                  <Feather name="video" size={20} color={COLORS.primary} />
                  <Text style={styles.demoText}>Watch Demo</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: SPACING.medium },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.medium,
    marginBottom: SPACING.medium,
    ...SHADOWS.small,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.medium,
  },
  cardTitle: { fontSize: FONT_SIZES.large, color: COLORS.text, fontWeight: '600' },
  cardBodyContainer: {
    padding: SPACING.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  cardBody: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    marginBottom: SPACING.small,
  },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xsmall },
  stepNumber: { backgroundColor: COLORS.primary, width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.small },
  stepNumberText: { color: COLORS.white, fontSize: FONT_SIZES.small },
  stepText: { fontSize: FONT_SIZES.small, color: COLORS.text },
  demoButton: { flexDirection: 'row', alignItems: 'center', marginTop: SPACING.small },
  demoText: { marginLeft: SPACING.small, color: COLORS.primary },
});

export default HowToUseScreen;