import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useAuthStore } from '../store/authStore';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);

  // Hardcoded credentials for demo
  const validCredentials = [
    { email: 'john@example.com', password: 'password123', name: 'John Doe', id: 'user-1' },
    { email: 'jane@example.com', password: 'password123', name: 'Jane Smith', id: 'user-2' },
    { email: 'bob@example.com', password: 'password123', name: 'Bob Johnson', id: 'user-3' },
  ];

  const handleLogin = () => {
    const user = validCredentials.find(
      (cred) => cred.email === email && cred.password === password
    );

    if (user) {
      // Mock JWT token
      const mockToken = `mock-jwt-token-${user.id}`;
      
      login(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        mockToken
      );
    } else {
      Alert.alert('Error', 'Invalid credentials. Try john@example.com / password123');
    }
  };

  const handleQuickLogin = (userIndex: number) => {
    const user = validCredentials[userIndex];
    setEmail(user.email);
    setPassword(user.password);
    handleLogin();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Event Check-In</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dividerWrap}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.quickLogin}>
          <Text style={styles.quickLoginTitle}>Quick Login</Text>
          {validCredentials.map((user, index) => (
            <TouchableOpacity
              key={user.id}
              style={styles.quickLoginButton}
              onPress={() => handleQuickLogin(index)}
            >
              <Text style={styles.quickLoginButtonText}>
                Continue as {user.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.info}>
          <Text style={styles.infoText}>
            Demo Credentials:{'\n'}
            • john@example.com / password123{'\n'}
            • jane@example.com / password123{'\n'}
            • bob@example.com / password123
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { alignItems: 'flex-start', marginTop: 24, marginBottom: 16 },
  title: {
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 8,
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#374151',
  },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#eef1f5', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  form: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#111827',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerWrap: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 18, justifyContent: 'center' },
  divider: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
  dividerText: { color: '#6b7280', fontSize: 12, fontWeight: '600' },
  quickLogin: {
    marginBottom: 20,
  },
  quickLoginTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#111827',
  },
  quickLoginButton: {
    backgroundColor: '#e5e7eb',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
    alignItems: 'center',
  },
  quickLoginButtonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '500',
  },
  info: {
    backgroundColor: '#E8F4FD',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
});

export default LoginScreen;


