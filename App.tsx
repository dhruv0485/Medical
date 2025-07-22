import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Toaster } from 'sonner-native';
import HomeScreen from "./screens/HomeScreen"
import SplashScreen from "./screens/SplashScreen"
import LoginScreen from "./screens/LoginScreen"
import SignUpScreen from "./screens/SignUpScreen"
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen"
import MedicationReminderScreen from "./screens/MedicationReminderScreen"
import SeizureDiaryScreen from "./screens/SeizureDiaryScreen"
import DoctorConnectScreen from "./screens/DoctorConnectScreen"
import HowToUseScreen from "./screens/HowToUseScreen"
import CustomDrawerContent from './components/CustomDrawerContent';
import { COLORS } from './constants/theme';
import ReportsScreen from "./screens/ReportsScreen";
import SOSScreen from "./screens/SOSScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator 
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: COLORS.text,
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -20,
        },
      }}
    >
      <Drawer.Screen name="Dashboard" component={HomeScreen} />
      <Drawer.Screen name="MedicationReminder" component={MedicationReminderScreen} options={{ title: 'Medication Reminder' }} />
      <Drawer.Screen name="SeizureDiary" component={SeizureDiaryScreen} options={{ title: 'Seizure Diary' }} />
      <Drawer.Screen name="DoctorConnect" component={DoctorConnectScreen} options={{ title: 'Doctor Connect' }} />
      <Drawer.Screen name="HowToUse" component={HowToUseScreen} options={{ title: 'How to Use App' }} />
      <Drawer.Screen name="Reports" component={ReportsScreen} options={{ title: 'Reports' }} />
      <Drawer.Screen name="SOS" component={SOSScreen} options={{ title: 'Emergency SOS' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Drawer.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator 
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Home" component={MainDrawer} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Toaster />
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none"
  }
});