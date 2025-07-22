import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Feather } from '@expo/vector-icons';
import Button from '../components/Button';

const initialProfile = {
  name: 'John Doe',
  phone: '+1-555-222-1111',
  age: '29',
  medicalHistory: 'Epilepsy',
};

const initialCaretakers = [
  { id: 1, name: 'Jane Doe', relation: 'Sister', phone: '+1-555-333-4444' },
];

const ProfileScreen = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editingProfile, setEditingProfile] = useState(false);
  const [caretakers, setCaretakers] = useState(initialCaretakers);
  const [newCaretaker, setNewCaretaker] = useState({ name: '', relation: '', phone: '' });

  const handleSaveProfile = () => {
    setEditingProfile(false);
  };

  const addCaretaker = () => {
    if (newCaretaker.name) {
      setCaretakers([...caretakers, { ...newCaretaker, id: Date.now() }]);
      setNewCaretaker({ name: '', relation: '', phone: '' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>

        {/* Patient details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Patient Details</Text>
          {editingProfile ? (
            <View>
              {Object.entries(profile).map(([key, value]) => (
                <View key={key} style={styles.inputRow}>
                  <Text style={styles.label}>{key}</Text>
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(text) => setProfile({ ...profile, [key]: text })}
                  />
                </View>
              ))}
              <Button title="Save" onPress={handleSaveProfile} style={{ marginTop: SPACING.medium }} />
            </View>
          ) : (
            <View>
              <Text style={styles.infoText}>Name: {profile.name}</Text>
              <Text style={styles.infoText}>Phone: {profile.phone}</Text>
              <Text style={styles.infoText}>Age: {profile.age}</Text>
              <Text style={styles.infoText}>History: {profile.medicalHistory}</Text>
              <Button title="Edit" onPress={() => setEditingProfile(true)} variant="outline" style={{ marginTop: SPACING.medium }} />
            </View>
          )}
        </View>

        {/* Caretakers */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Caretakers</Text>
          {caretakers.map((c) => (
            <View key={c.id} style={styles.listItem}>
              <Feather name="user" size={20} color={COLORS.primary} />
              <Text style={styles.listText}>{c.name} • {c.relation} • {c.phone}</Text>
            </View>
          ))}

          {/* Add new caretaker */}
          <TouchableOpacity style={styles.addCaretakerToggle} onPress={() => setNewCaretaker({ ...newCaretaker, show: !newCaretaker.show })}>
            <Feather name="plus-circle" size={20} color={COLORS.primary} />
            <Text style={[styles.listText, { color: COLORS.primary, marginLeft: SPACING.xsmall }]}>Add Caretaker</Text>
          </TouchableOpacity>

          {newCaretaker.show && (
            <View style={{ marginTop: SPACING.medium }}>
              {['name', 'relation', 'phone'].map((field) => (
                <TextInput
                  key={field}
                  style={styles.input}
                  placeholder={field}
                  value={newCaretaker[field]}
                  onChangeText={(text) => setNewCaretaker({ ...newCaretaker, [field]: text })}
                />
              ))}
              <Button title="Save" onPress={addCaretaker} style={{ marginTop: SPACING.medium }} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.medium },
  title: { fontSize: FONT_SIZES.xlarge, fontWeight: 'bold', color: COLORS.text, marginBottom: SPACING.large },
  card: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.large, padding: SPACING.medium, marginBottom: SPACING.large, ...SHADOWS.small },
  cardTitle: { fontSize: FONT_SIZES.large, fontWeight: 'bold', color: COLORS.text, marginBottom: SPACING.medium },
  infoText: { fontSize: FONT_SIZES.medium, color: COLORS.text, marginBottom: SPACING.xsmall },
  label: { fontSize: FONT_SIZES.small, color: COLORS.text },
  inputRow: { marginBottom: SPACING.small },
  input: { backgroundColor: COLORS.background, borderRadius: BORDER_RADIUS.medium, padding: SPACING.small, marginTop: SPACING.xsmall },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.small },
  listText: { marginLeft: SPACING.medium, fontSize: FONT_SIZES.medium, color: COLORS.text },
  addCaretakerToggle: { flexDirection: 'row', alignItems: 'center', marginTop: SPACING.medium },
});

export default ProfileScreen;