import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { JOIN_EVENT } from '../graphql/queries';
import { useMutation } from '@apollo/client';

type RouteParams = {
  event: {
    id: string;
    name: string;
    location: string;
    startTime: string;
    attendees: Array<{ id: string; name: string; email: string }>;
  };
};

const EventDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { event } = route.params as RouteParams;
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [joinEvent, { loading }] = useMutation(JOIN_EVENT);

  const handleJoin = async () => {
    if (!selectedUserId) return;
    try {
      await joinEvent({ variables: { eventId: event.id }, context: { headers: { 'x-user-id': selectedUserId } } });
      navigation.goBack();
    } catch (e) {
      // no-op for demo
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.sub}>{event.location}</Text>
        <Text style={styles.meta}>Starts at {new Date(event.startTime).toLocaleString()}</Text>

        <Text style={styles.sectionTitle}>Attendees</Text>
        <View style={styles.list}>
          {event.attendees.map((user) => {
            const selected = selectedUserId === user.id;
            return (
              <TouchableOpacity key={user.id} style={[styles.row, selected && styles.rowSelected]} onPress={() => setSelectedUserId(user.id)}>
                <Text style={styles.check}>{selected ? '✓' : ' '}</Text>
                <Text style={styles.rowText}>{user.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity disabled={!selectedUserId || loading} style={[styles.joinBtn, (!selectedUserId || loading) && styles.joinBtnDisabled]} onPress={handleJoin}>
          <Text style={styles.joinText}>{loading ? 'Joining...' : 'Join Event'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  content: { padding: 20 },
  title: { fontSize: 32, fontWeight: '900', color: '#0f172a', marginBottom: 6 },
  sub: { fontSize: 16, color: '#374151', marginBottom: 6 },
  meta: { fontSize: 14, color: '#6b7280', marginBottom: 20 },
  sectionTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12, color: '#111827' },
  list: { backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#eef1f5', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#eef1f5' },
  rowSelected: { backgroundColor: '#f1f5f9' },
  check: { width: 24, fontSize: 18, color: '#0ea5e9' },
  rowText: { fontSize: 16, color: '#111827' },
  joinBtn: { marginTop: 24, backgroundColor: '#e5e7eb', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  joinBtnDisabled: { opacity: 0.6 },
  joinText: { color: '#111827', fontWeight: '800', fontSize: 18 },
});

export default EventDetailScreen;


