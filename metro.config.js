const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure resolver for better compatibility
config.resolver.assetExts.push('css');

// Add resolver configuration for TurboModules
config.resolver.platforms = ['native', 'android', 'ios', 'web'];

// Configure transformer for better compatibility with SDK 53
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
};

module.exports = config;