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
  { id: 'nefesEgzersizi', title: 'Nefes Egzersizi', emoji: '🌬️', screen: 'NefesEgzersizi' },
  { id: 'bmiHesaplayici', title: 'BMI Hesaplayıcı', emoji: '⚖️', screen: 'BMIHesaplayici' },
  { id: 'sss', title: 'SSS', emoji: '❓', screen: 'SSS' },
  { id: 'bildirimler', title: 'Bildirimler', emoji: '🔔', screen: 'Bildirimler' },
  { id: 'anket', title: 'Anket', emoji: '🏃', screen: 'Anket' },
  { id: 'ilacHatirlatici', title: 'İlaç Hatırlatıcı', emoji: '💊', screen: 'IlacHatirlatici' },
];

export default function AnasayfaScreen({ navigation, route }) {
  const kullaniciAdi = route.params?.kullaniciAdi || 'Kullanıcı';

  const handlePress = (screen) => {
    try {
      navigation.navigate(screen);
    } catch (e) {
      // Sayfa henüz eklenmemiş
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hoşgeldin kartı - cam efektli */}
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeGlow} />
        <Text style={styles.welcomeEmoji}>😊</Text>
        <Text style={styles.welcomeText}>
          Sayın {kullaniciAdi},{'\n'}uygulamaya{'\n'}hoşgeldiniz.
        </Text>
      </View>

      {/* Menü kartları - cam efektli */}
      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuCard, item.fullWidth && styles.menuCardFull]}
            onPress={() => handlePress(item.screen)}
            activeOpacity={0.7}
          >
            {/* Arka plan ışık efekti */}
            <View style={styles.cardGlow} />
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
  // Hoşgeldin kartı - cam beyaz
  welcomeCard: {
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  welcomeGlow: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(232,87,125,0.08)',
  },
  welcomeEmoji: {
    fontSize: 50,
    marginRight: 16,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  // Menü grid
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  // Menü kartı - cam beyaz
  menuCard: {
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  menuCardFull: {
    width: '100%',
  },
  // Kartın arkasındaki ışık efekti
  cardGlow: {
    position: 'absolute',
    top: -25,
    left: -25,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(232,87,125,0.08)',
  },
  menuEmoji: {
    fontSize: 50,
    marginBottom: 8,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});
