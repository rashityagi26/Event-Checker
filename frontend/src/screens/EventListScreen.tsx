import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useAuthenticatedQuery } from '../hooks/useAuthenticatedQuery';
import { GET_EVENTS } from '../graphql/queries';
import { useNavigation } from '@react-navigation/native';

type Event = {
  id: string;
  name: string;
  location: string;
  startTime: string;
  attendees: Array<{ id: string; name: string; email: string }>;
};

type EventsData = {
  events: Event[];
};

const EventListScreen = () => {
  const navigation = useNavigation<any>();
  const { data, loading, error, refetch } = useAuthenticatedQuery<EventsData>(GET_EVENTS, { fetchPolicy: 'cache-and-network' });

  const events = data?.events ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Event Check-In</Text>
        <Text style={styles.sectionTitle}>List of Events</Text>

        {loading && (
          <View style={styles.center}> 
            <ActivityIndicator />
          </View>
        )}
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>Failed to load events</Text>
            <TouchableOpacity onPress={() => refetch()} style={styles.retryBtn}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.card}
            onPress={() => navigation.navigate('EventDetail', { event })}
          >
            <Text style={styles.cardTitle}>{event.name}</Text>
            <Text style={styles.cardSub}>{event.location}</Text>
            <Text style={styles.cardMeta}>Starts at {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  content: { padding: 20, paddingBottom: 24 },
  title: { fontSize: 34, fontWeight: '900', marginBottom: 18, color: '#0f172a' },
  sectionTitle: { fontSize: 24, fontWeight: '800', marginBottom: 14, color: '#111827' },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eef1f5',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardTitle: { fontSize: 22, fontWeight: '800', marginBottom: 6, color: '#111827' },
  cardSub: { fontSize: 16, color: '#374151', marginBottom: 6 },
  cardMeta: { fontSize: 14, color: '#6b7280' },
  center: { paddingVertical: 24, alignItems: 'center' },
  errorBox: { backgroundColor: '#fde8e8', padding: 12, borderRadius: 10, borderLeftWidth: 4, borderLeftColor: '#ef4444', marginBottom: 12 },
  errorText: { color: '#991b1b', marginBottom: 8 },
  retryBtn: { backgroundColor: '#ef4444', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, alignSelf: 'flex-start' },
  retryText: { color: 'white', fontWeight: '600' },
});

export default EventListScreen;


