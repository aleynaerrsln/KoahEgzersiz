import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';

const menuItems = [
  { id: 'formlar', title: 'Formlar', emoji: '📋', screen: 'Formlar' },
  { id: 'egitimler', title: 'Eğitimler', emoji: '🩺', screen: 'Egitimler' },
  { id: 'gunlukHedefler', title: 'Günlük Hedefler', emoji: '🥗', screen: 'GunlukHedefler', fullWidth: true },
  { id: 'sss', title: 'SSS', emoji: '❓', screen: 'SSS' },
  { id: 'bildirimler', title: 'Bildirimler', emoji: '🔔', screen: 'Bildirimler' },
  { id: 'anket', title: 'Anket', emoji: '🏃', screen: 'Anket' },
  { id: 'whatsapp', title: 'Whatsapp Acil', emoji: '📅', screen: 'Whatsapp' },
];

export default function AnasayfaScreen({ navigation }) {
  const handlePress = (screen) => {
    try {
      navigation.navigate(screen);
    } catch (e) {
      // Sayfa henüz eklenmemiş
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeEmoji}>😊</Text>
        <Text style={styles.welcomeText}>
          Sayın Kullanıcı,{'\n'}uygulamaya{'\n'}hoşgeldiniz.
        </Text>
      </View>

      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuCard, item.fullWidth && styles.menuCardFull]}
            onPress={() => handlePress(item.screen)}
            activeOpacity={0.7}
          >
            <Text style={styles.menuEmoji}>{item.emoji}</Text>
            <Text style={styles.menuText}>{item.title}</Text>
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
    paddingBottom: 30,
  },
  welcomeCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  welcomeEmoji: {
    fontSize: 55,
    marginRight: 16,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  menuCardFull: {
    width: '100%',
  },
  menuEmoji: {
    fontSize: 55,
    marginBottom: 8,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});
