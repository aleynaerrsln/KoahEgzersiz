import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../constants/colors';

const formItems = [
  {
    id: 'kanSekeri',
    title: 'Kan Şekeri İzlem',
    emoji: '🩸',
    screen: 'KanSekeriIzlem',
  },
  {
    id: 'fizikselAktivite',
    title: 'Fiziksel Aktivite',
    emoji: '🏋️',
    screen: 'FizikselAktivitelerim',
  },
  {
    id: 'beslenme',
    title: 'Beslenme\nDeğerlendirme',
    emoji: '🥗',
    screen: 'BeslenmeEkleme',
  },
];

export default function FormlarScreen({ navigation }) {
  const handlePress = (screen) => {
    try {
      navigation.navigate(screen);
    } catch (e) {
      // Sayfa henüz eklenmemiş
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.grid}>
        {formItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => handlePress(item.screen)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    padding: 16,
    paddingTop: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    minHeight: 140,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});
