import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';

interface SeizureEntry {
  id: number;
  type: string;
  date: Date;
  duration: number; // seconds
  description: string;
  videoUri?: string;
}

const SeizureDiaryScreen = () => {
  const [entries, setEntries] = useState<SeizureEntry[]>([
    { id: 1, type: 'Mild', date: new Date(), duration: 120, description: 'Mild tremor lasting 2 minutes', videoUri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 2, type: 'Severe', date: new Date(Date.now() - 86400000), duration: 300, description: 'Severe convulsions', videoUri: undefined },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<SeizureEntry>>({ type: 'Mild', date: new Date(), duration: 0, description: '', videoUri: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddEntry = () => {
    if (!newEntry.type || !newEntry.date || !newEntry.duration) {
      Alert.alert('Incomplete', 'Please fill all required fields');
      return;
    }
    const entry: SeizureEntry = {
      id: Date.now(),
      type: newEntry.type as string,
      date: newEntry.date as Date,
      duration: newEntry.duration as number,
      description: newEntry.description || '',
      videoUri: newEntry.videoUri,
    };
    setEntries([entry, ...entries]);
    setShowModal(false);
    // reset form
    setNewEntry({ type: 'Mild', date: new Date(), duration: 0, description: '', videoUri: '' });
  };

  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setNewEntry({ ...newEntry, date: selectedDate });
    }
  };

  const renderEntryCard = (entry: SeizureEntry) => (
    <View key={entry.id} style={styles.entryCard}>
      <View style={styles.entryHeader}>
        <View style={styles.entryHeaderLeft}>
          <Feather name="calendar" size={20} color={COLORS.primary} />
          <Text style={styles.entryDate}>{entry.date.toDateString()}</Text>
        </View>
        <Text style={styles.entryType}>{entry.type}</Text>
      </View>
      <Text style={styles.entryDetail}>Duration: {Math.floor(entry.duration / 60)}m {entry.duration % 60}s</Text>
      {entry.description !== '' && <Text style={styles.entryDescription}>{entry.description}</Text>}
      {entry.videoUri && (
        <TouchableOpacity style={styles.videoButton} onPress={() => Alert.alert('Play Video', 'Would play video: ' + entry.videoUri)}>
          <Feather name="video" size={20} color={COLORS.primary} />
          <Text style={styles.videoText}>View Video</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {entries.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="file-text" size={40} color={COLORS.textLight} />
            <Text style={styles.emptyText}>No seizure records yet</Text>
          </View>
        )}
        {entries.map(renderEntryCard)}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowModal(true)}
        activeOpacity={0.8}
      >
        <Feather name="plus" size={32} color={COLORS.white} />
      </TouchableOpacity>

      {/* Add new entry modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Seizure Entry</Text>
            {/* Type */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Type</Text>
              <View style={styles.dropdown}>
                {['Mild', 'Moderate', 'Severe'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.dropdownOption, newEntry.type === option && styles.dropdownOptionActive]}
                    onPress={() => setNewEntry({ ...newEntry, type: option })}
                  >
                    <Text style={styles.dropdownOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Date & Time */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Date & Time</Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Feather name="calendar" size={20} color={COLORS.primary} />
                <Text style={styles.datePickerText}>{newEntry.date?.toLocaleString()}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={newEntry.date || new Date()}
                  mode="datetime"
                  onChange={onChangeDate}
                />
              )}
            </View>
            {/* Duration */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Duration (seconds)</Text>
              <TextInput
                keyboardType="numeric"
                value={newEntry.duration?.toString() || ''}
                onChangeText={(t) => setNewEntry({ ...newEntry, duration: parseInt(t) || 0 })}
                placeholder="e.g. 120"
                style={styles.durationInput}
              />
            </View>
            {/* Description */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Description (optional)</Text>
              <TextInput
                value={newEntry.description}
                onChangeText={(t) => setNewEntry({ ...newEntry, description: t })}
                placeholder="Describe the episode"
                style={styles.descriptionInput}
                multiline
              />
            </View>
            {/* Video Attachment */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Attach Video (optional)</Text>
              <Button
                title={newEntry.videoUri ? 'Change Video' : 'Attach Video'}
                variant="outline"
                onPress={async () => {
                  const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Videos });
                  if (!res.cancelled) setNewEntry({ ...newEntry, videoUri: res.uri });
                }}
              />
            </View>
            <View style={styles.modalButtons}>
              <Button title="Cancel" variant="outline" style={styles.modalButton} onPress={() => setShowModal(false)} />
              <Button title="Save" variant="primary" style={styles.modalButton} onPress={handleAddEntry} />
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
  container: {
    padding: SPACING.medium,
  },
  entryCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    ...SHADOWS.small,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.small,
  },
  entryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDate: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    marginLeft: SPACING.small,
  },
  entryType: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.primary,
    fontWeight: '600',
  },
  entryDetail: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text,
    marginBottom: SPACING.xsmall,
  },
  entryDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: SPACING.xxlarge,
  },
  emptyText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    marginTop: SPACING.small,
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.xxlarge,
    right: SPACING.xxlarge,
    width: 70,
    height: 70,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.large,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.large,
    width: '90%',
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: SPACING.medium,
  },
  fieldLabel: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text,
    marginBottom: SPACING.xsmall,
  },
  dropdown: {
    flexDirection: 'row',
  },
  dropdownOption: {
    padding: SPACING.small,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.medium,
    marginRight: SPACING.small,
  },
  dropdownOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dropdownOptionText: {
    color: COLORS.text,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.small,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.medium,
  },
  datePickerText: {
    marginLeft: SPACING.small,
    color: COLORS.text,
  },
  durationInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.small,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.small,
    height: 60,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.medium,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: SPACING.xsmall,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.small,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.medium,
  },
  videoText: {
    marginLeft: SPACING.small,
    color: COLORS.text,
  },
});

export default SeizureDiaryScreen;