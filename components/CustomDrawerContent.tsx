import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  
  // Generate app logo URL using the Image Generation API
  const appLogoUrl = 'https://api.a0.dev/assets/image?text=Simple%20stylized%20brain%20icon%20with%20soft%20blue%20colors%20on%20white%20background&aspect=1:1';

  // Custom drawer items with icons
  const customDrawerItems = [
    { 
      name: 'Dashboard', 
      icon: 'home',
      onPress: () => navigation.navigate('Dashboard'),
      description: 'Main app screen'
    },
    { 
      name: 'Seizure Diary', 
      icon: 'book',
      onPress: () => navigation.navigate('SeizureDiary'),
      description: 'Track your seizures'
    },
    { 
      name: 'Medication Reminder', 
      icon: 'clock',
      onPress: () => navigation.navigate('MedicationReminder'),
      description: 'Manage your medications'
    },
    { 
      name: 'Doctor Connect', 
      icon: 'user',
      onPress: () => navigation.navigate('DoctorConnect'),
      description: 'Connect with healthcare providers'
    },
    { 
      name: 'Reports', 
      icon: 'bar-chart-2',
      onPress: () => navigation.navigate('Reports'),
      description: 'View your health reports'
    },
    { 
      name: 'SOS', 
      icon: 'alert-circle',
      onPress: () => navigation.navigate('SOS'),
      description: 'Emergency assistance'
    },
    { 
      name: 'Profile', 
      icon: 'user',
      onPress: () => navigation.navigate('Profile'),
      description: 'Manage your profile'
    },
    { 
      name: 'Settings', 
      icon: 'settings',
      onPress: () => navigation.navigate('Dashboard'),
      description: 'App settings'
    },
    { 
      name: 'How to Use App', 
      icon: 'help-circle',
      onPress: () => navigation.navigate('HowToUse'),
      description: 'Learn how to use the app'
    },
  ];

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: appLogoUrl }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Seizure Tracker</Text>
          <Text style={styles.appDescription}>
            Your health companion
          </Text>
        </View>

        <View style={styles.divider} />

        <ScrollView style={styles.menuItemsContainer}>
          {customDrawerItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemIconContainer}>
                <Feather
                  name={item.icon}
                  size={24}
                  color={item.name === 'SOS' ? COLORS.emergency : COLORS.primary}
                />
              </View>
              <View style={styles.menuItemTextContainer}>
                <Text style={[
                  styles.menuItemText,
                  item.name === 'SOS' && styles.emergencyText
                ]}>
                  {item.name}
                </Text>
                <Text style={styles.menuItemDescription}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Feather name="log-out" size={20} color={COLORS.textLight} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  drawerContent: {
    flexGrow: 1,
  },
  header: {
    padding: SPACING.large,
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: SPACING.medium,
  },
  appName: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xsmall,
  },
  appDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  menuItemsContainer: {
    paddingHorizontal: SPACING.medium,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.medium,
    borderRadius: BORDER_RADIUS.medium,
    marginBottom: SPACING.small,
  },
  menuItemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.medium,
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: FONT_SIZES.xsmall,
    color: COLORS.textLight,
  },
  emergencyText: {
    color: COLORS.emergency,
    fontWeight: 'bold',
  },
  footer: {
    padding: SPACING.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.medium,
  },
  logoutText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    marginLeft: SPACING.medium,
  },
  versionText: {
    fontSize: FONT_SIZES.xsmall,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SPACING.small,
  },
});

export default CustomDrawerContent;