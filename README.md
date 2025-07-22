# Seizure Tracker App

A React Native Expo app for tracking seizures and managing medication reminders.

## Features

- 📱 Cross-platform (iOS, Android, Web)
- 📊 Seizure diary with video attachments
- 💊 Medication reminders
- 👨‍⚕️ Doctor communication
- 🚨 Emergency SOS functionality
- 📈 Reports and analytics
- 👤 User profile management

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Use the Expo Go app on your phone to scan the QR code, or press `i` for iOS simulator or `a` for Android emulator.

## Project Structure

```
├── App.tsx                 # Main app component with navigation
├── components/            # Reusable UI components
│   ├── Button.tsx
│   ├── TextInput.tsx
│   └── CustomDrawerContent.tsx
├── screens/              # App screens
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── SeizureDiaryScreen.tsx
│   └── ...
├── constants/            # App constants and theme
│   └── theme.ts
├── convex/              # Backend database schema
└── assets/              # Images and other assets
```

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Convex** - Backend database
- **TypeScript** - Type safety
- **Expo Vector Icons** - Icon library

## Development

### Running on Different Platforms

- **iOS**: `npm run ios`
- **Android**: `npm run android`
- **Web**: `npm run web`

### Building for Production

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.