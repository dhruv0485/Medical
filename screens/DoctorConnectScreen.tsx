import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
  time: string;
}

interface Doctor {
  id: string;
  name: string;
}

const DoctorConnectScreen = () => {
  const doctors: Doctor[] = [
    { id: '1', name: 'Dr. Jane Smith' },
    { id: '2', name: 'Dr. John Doe' },
  ];
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.doctorBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  // If no doctor selected, show list
  if (!selectedDoctor) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.selectTitle}>Select a Doctor</Text>
        <ScrollView contentContainerStyle={styles.container}>
          {doctors.map((doc) => (
            <TouchableOpacity key={doc.id} style={styles.doctorCard} onPress={() => setSelectedDoctor(doc)}>
              <Feather name="user" size={32} color={COLORS.primary} />
              <Text style={styles.doctorName}>{doc.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Chat view
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => setSelectedDoctor(null)}>
          <Feather name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Feather name="user" size={28} color={COLORS.primary} />
          <View style={styles.headerText}>
            <Text style={styles.headerName}>{selectedDoctor.name}</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContainer}
        />
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.iconButton} onPress={() => {/* voice to text */}}>
            <Feather name="mic" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message"
          />
          <TouchableOpacity style={styles.iconButton} onPress={() => {/* attach file */}}>
            <Feather name="paperclip" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Feather name="send" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  selectTitle: { fontSize: FONT_SIZES.large, fontWeight: '600', color: COLORS.text, textAlign: 'center', marginTop: SPACING.large },
  doctorCard: { flexDirection: 'row', alignItems: 'center', padding: SPACING.medium, backgroundColor: COLORS.white, margin: SPACING.small, borderRadius: BORDER_RADIUS.medium, ...SHADOWS.small },
  doctorName: { marginLeft: SPACING.medium, fontSize: FONT_SIZES.medium, color: COLORS.text },
  chatHeader: { flexDirection: 'row', alignItems: 'center', padding: SPACING.medium, backgroundColor: COLORS.white, ...SHADOWS.small },
  headerInfo: { flexDirection: 'row', alignItems: 'center', marginLeft: SPACING.small },
  headerText: { marginLeft: SPACING.small },
  headerName: { fontSize: FONT_SIZES.large, color: COLORS.text, fontWeight: '600' },
  headerStatus: { fontSize: FONT_SIZES.small, color: COLORS.textLight },
  inputBar: {
    flexDirection: 'row',
    padding: SPACING.small,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.medium,
    paddingHorizontal: SPACING.small,
    marginRight: SPACING.small,
    height: 44,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  iconButton: { padding: SPACING.small },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.small,
    marginBottom: SPACING.small,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
  },
  doctorBubble: {
    backgroundColor: COLORS.secondary,
    alignSelf: 'flex-start',
  },
  messageText: { color: COLORS.white, fontSize: FONT_SIZES.medium },
  messageTime: {
    fontSize: FONT_SIZES.xsmall,
    color: COLORS.white,
    alignSelf: 'flex-end',
    marginTop: 2,
  },
});

export default DoctorConnectScreen;