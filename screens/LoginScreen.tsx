import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to home screen after successful login
      navigation.navigate('Home' as never);
    }, 1500);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp' as never);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword' as never);
  };

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 'email' ? 'phone' : 'email');
    setError('');
  };

  // Generate a background pattern URL using the Image Generation API
  const backgroundPatternUrl = 'https://api.a0.dev/assets/image?text=Subtle%20light%20blue%20and%20green%20wave%20pattern%20background%20with%20very%20low%20opacity&aspect=9:16';

  return (
    <ImageBackground 
      source={{ uri: backgroundPatternUrl }} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Image
                  source={{ uri: 'https://api.a0.dev/assets/image?text=Simple%20stylized%20brain%20icon%20with%20soft%20blue%20colors%20on%20white%20background&aspect=1:1' }}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>
                  Sign in to continue tracking your health
                </Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.loginMethodToggle}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      loginMethod === 'phone' && styles.activeToggleButton,
                    ]}
                    onPress={() => setLoginMethod('phone')}
                  >
                    <Text
                      style={[
                        styles.toggleButtonText,
                        loginMethod === 'phone' && styles.activeToggleButtonText,
                      ]}
                    >
                      Phone
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      loginMethod === 'email' && styles.activeToggleButton,
                    ]}
                    onPress={() => setLoginMethod('email')}
                  >
                    <Text
                      style={[
                        styles.toggleButtonText,
                        loginMethod === 'email' && styles.activeToggleButtonText,
                      ]}
                    >
                      Email
                    </Text>
                  </TouchableOpacity>
                </View>

                {loginMethod === 'phone' ? (
                  <TextInput
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    fullWidth
                    leftIcon={<Feather name="phone" size={20} color={COLORS.textLight} />}
                  />
                ) : (
                  <TextInput
                    label="Email"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    fullWidth
                    leftIcon={<Feather name="mail" size={20} color={COLORS.textLight} />}
                  />
                )}

                <TextInput
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  fullWidth
                  leftIcon={<Feather name="lock" size={20} color={COLORS.textLight} />}
                />

                <TouchableOpacity
                  style={styles.forgotPasswordContainer}
                  onPress={handleForgotPassword}
                >
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <Button
                  title="Login"
                  onPress={handleLogin}
                  loading={isLoading}
                  fullWidth
                  size="large"
                />

                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={handleSignUp}>
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: SPACING.large,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xlarge,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: SPACING.medium,
  },
  title: {
    fontSize: FONT_SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.large,
    ...SHADOWS.medium,
  },
  loginMethodToggle: {
    flexDirection: 'row',
    marginBottom: SPACING.large,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.medium,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: SPACING.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeToggleButton: {
    backgroundColor: COLORS.primary,
  },
  toggleButtonText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '500',
    color: COLORS.textLight,
  },
  activeToggleButtonText: {
    color: COLORS.white,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.large,
  },
  forgotPasswordText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.primary,
    fontWeight: '500',
  },
  errorText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.error,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.large,
  },
  signUpText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
  },
  signUpButtonText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;