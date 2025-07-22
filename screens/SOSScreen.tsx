import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Feather } from '@expo/vector-icons';

const emergencyContacts = [
  { name: 'Dad', phone: '+1-222-555-0101' },
  { name: 'Mom', phone: '+1-222-555-0102' },
  { name: 'Family Doctor', phone: '+1-222-555-0103' },
];

const hospitals = [
  { name: 'Rural Clinic', distance: '2 km', phone: '+1-222-555-0200' },
  { name: 'City Hospital', distance: '15 km', phone: '+1-222-555-0300' },
];

const SOSScreen = () => {
  const callNumber = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Emergency SOS</Text>

        {/* Live ambulance tracking placeholder */}
        <View style={styles.cardUrgent}>
          <Text style={styles.cardTitle}>Ambulance Tracking</Text>
          <Text style={styles.cardSubtitle}>ETA: 15 mins</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>🗺️ Map loading...</Text>
          </View>
        </View>

        {/* Emergency contacts */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Emergency Contacts</Text>
          {emergencyContacts.map((c, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.listItem}
              onPress={() => callNumber(c.phone)}
            >
              <Feather name="phone" size={20} color={COLORS.primary} />
              <Text style={styles.listText}>{c.name} ({c.phone})</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nearby hospitals */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nearby Hospitals</Text>
          {hospitals.map((h, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.listItem}
              onPress={() => callNumber(h.phone)}
            >
              <Feather name="map-pin" size={20} color={COLORS.primary} />
              <Text style={styles.listText}>{h.name} • {h.distance}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.medium },
  title: { fontSize: FONT_SIZES.xlarge, fontWeight: 'bold', color: COLORS.emergency, marginBottom: SPACING.large },
  cardUrgent: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.large, padding: SPACING.medium, marginBottom: SPACING.large, borderWidth: 2, borderColor: COLORS.emergency, ...SHADOWS.small },
  card: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.large, padding: SPACING.medium, marginBottom: SPACING.large, ...SHADOWS.small },
  cardTitle: { fontSize: FONT_SIZES.large, fontWeight: 'bold', color: COLORS.text, marginBottom: SPACING.small },
  cardSubtitle: { fontSize: FONT_SIZES.small, color: COLORS.textLight, marginBottom: SPACING.medium },
  mapPlaceholder: { backgroundColor: COLORS.background, borderRadius: BORDER_RADIUS.medium, height: 150, alignItems: 'center', justifyContent: 'center' },
  mapText: { color: COLORS.textLight },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.small },
  listText: { marginLeft: SPACING.medium, fontSize: FONT_SIZES.medium, color: COLORS.text },
});

export default SOSScreen;