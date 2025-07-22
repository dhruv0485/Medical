import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Feather } from '@expo/vector-icons';

const seizureData = [3, 5, 2, 4, 1];
const medicationData = { onTime: 80, late: 15, missed: 5 };

const ReportsScreen = () => {
  const [view, setView] = useState<'monthly' | 'weekly' | 'daily'>('monthly');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Reports & Analytics</Text>

        {/* View Switcher */}
        <View style={styles.viewSwitcher}>
          {['daily', 'weekly', 'monthly'].map((v) => (
            <TouchableOpacity
              key={v}
              style={[
                styles.viewButton,
                view === v && styles.viewButtonActive,
              ]}
              onPress={() => setView(v as any)}
            >
              <Text
                style={[
                  styles.viewButtonText,
                  view === v && styles.viewButtonTextActive,
                ]}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Seizure Frequency Chart Placeholder */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Seizure Frequency ({view})</Text>
          <View style={styles.barChart}>
            {seizureData.map((value, idx) => (
              <View key={idx} style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: value * 20,
                      backgroundColor: COLORS.primary,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Medication Adherence Pie Placeholder */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Medication Adherence</Text>
          <View style={styles.piePlaceholder}>
            <Text style={styles.pieText}>On-time {medicationData.onTime}%</Text>
            <Text style={styles.pieText}>Late {medicationData.late}%</Text>
            <Text style={styles.pieText}>Missed {medicationData.missed}%</Text>
          </View>
        </View>

        {/* Calendar placeholder */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>2025 Calendar Overview</Text>
          <View style={styles.calendarPlaceholder}>
            <Text style={styles.calendarText}>📅 Calendar coming soon</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.medium,
  },
  title: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.large,
  },
  viewSwitcher: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.medium,
  },
  viewButton: {
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.small,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.background,
    marginHorizontal: SPACING.small,
  },
  viewButtonActive: {
    backgroundColor: COLORS.primary,
  },
  viewButtonText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text,
  },
  viewButtonTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.medium,
    marginBottom: SPACING.large,
    ...SHADOWS.small,
  },
  cardTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.medium,
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: BORDER_RADIUS.small,
  },
  barLabel: {
    marginTop: SPACING.xsmall,
    fontSize: FONT_SIZES.xsmall,
    color: COLORS.text,
  },
  piePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.large,
  },
  pieText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text,
    marginVertical: SPACING.xsmall,
  },
  calendarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.large,
  },
  calendarText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
  },
});

export default ReportsScreen;