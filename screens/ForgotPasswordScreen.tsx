import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = () => {
    // Basic validation
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate password reset process
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login' as never);
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
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Feather name="arrow-left" size={24} color={COLORS.text} />
              </TouchableOpacity>
              
              <View style={styles.headerContainer}>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subtitle}>
                  Enter your phone number to receive a password reset code
                </Text>
              </View>

              <View style={styles.formContainer}>
                {!success ? (
                  <>
                    <TextInput
                      label="Phone Number"
                      placeholder="Enter your phone number"
                      keyboardType="phone-pad"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      fullWidth
                      leftIcon={<Feather name="phone" size={20} color={COLORS.textLight} />}
                    />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <Button
                      title="Reset Password"
                      onPress={handleResetPassword}
                      loading={isLoading}
                      fullWidth
                      size="large"
                    />
                  </>
                ) : (
                  <View style={styles.successContainer}>
                    <View style={styles.successIconContainer}>
                      <Feather name="check-circle" size={60} color={COLORS.success} />
                    </View>
                    <Text style={styles.successTitle}>Success!</Text>
                    <Text style={styles.successMessage}>
                      A password reset code has been sent to your phone number. Please check your messages.
                    </Text>
                    <Button
                      title="Back to Login"
                      onPress={handleBackToLogin}
                      variant="primary"
                      fullWidth
                      style={styles.backToLoginButton}
                    />
                  </View>
                )}

                {!success && (
                  <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Remember your password? </Text>
                    <TouchableOpacity onPress={handleBackToLogin}>
                      <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                  </View>
                )}
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.medium,
    ...SHADOWS.small,
  },
  headerContainer: {
    marginBottom: SPACING.xlarge,
  },
  title: {
    fontSize: FONT_SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.small,
  },
  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.large,
    ...SHADOWS.medium,
  },
  errorText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.error,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.large,
  },
  loginText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
  },
  loginButtonText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.primary,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    padding: SPACING.medium,
  },
  successIconContainer: {
    marginBottom: SPACING.large,
  },
  successTitle: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.medium,
  },
  successMessage: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.xlarge,
  },
  backToLoginButton: {
    marginTop: SPACING.medium,
  },
});

export default ForgotPasswordScreen;