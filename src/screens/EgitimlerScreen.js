import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';

const varsayilanEgzersizler = [
  { id: 1, ad: 'Sol Kol Egzersizi', aciklama: 'Kolu yana doğru 10 kez kaldırın', sure: '5 dk', tamamlandi: false },
  { id: 2, ad: 'Sağ Kol Egzersizi', aciklama: 'Kolu yana doğru 10 kez kaldırın', sure: '5 dk', tamamlandi: false },
  { id: 3, ad: 'Kolları Öne Kaldırma', aciklama: 'Her iki kolu birlikte öne kaldırın', sure: '5 dk', tamamlandi: false },
  { id: 4, ad: 'Isınma Hareketleri', aciklama: 'Hafif tempo yerinde yürüyüş', sure: '10 dk', tamamlandi: false },
  { id: 5, ad: 'Nefes Egzersizi', aciklama: 'Derin nefes al-ver tekrarları', sure: '8 dk', tamamlandi: false },
  { id: 6, ad: 'Büzük Dudak Solunumu', aciklama: 'Burundan al, büzük dudakla ver', sure: '5 dk', tamamlandi: false },
  { id: 7, ad: 'Bacak Egzersizi', aciklama: 'Oturarak bacak kaldırma', sure: '8 dk', tamamlandi: false },
  { id: 8, ad: 'Oturarak Yürüyüş', aciklama: 'Sandalyede oturarak adım atma', sure: '10 dk', tamamlandi: false },
];

export default function EgitimlerScreen({ navigation }) {
  const [arama, setArama] = useState('');
  const [egzersizler, setEgzersizler] = useState(varsayilanEgzersizler);
  const [seciliTab, setSeciliTab] = useState('tumu');

  const toggleTamamla = (id) => {
    setEgzersizler(egzersizler.map((e) =>
      e.id === id ? { ...e, tamamlandi: !e.tamamlandi } : e
    ));
  };

  const tumunuSifirla = () => {
    setEgzersizler(egzersizler.map((e) => ({ ...e, tamamlandi: false })));
  };

  const filtrelenmis = egzersizler.filter((e) =>
    e.ad.toLowerCase().includes(arama.toLowerCase())
  );

  const tamamlananlar = filtrelenmis.filter((e) => e.tamamlandi);
  const bekleyenler = filtrelenmis.filter((e) => !e.tamamlandi);
  const tamamYuzde = Math.round((tamamlananlar.length / egzersizler.length) * 100);

  const gosterilecek =
    seciliTab === 'tamamlanan' ? tamamlananlar :
    seciliTab === 'bekleyen' ? bekleyenler : filtrelenmis;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KOAH Egzersiz</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* İlerleme kartı */}
      <View style={styles.ilerlemeCard}>
        <View style={styles.ilerlemeUst}>
          <View>
            <Text style={styles.ilerlemeBuyuk}>{tamamlananlar.length}/{egzersizler.length}</Text>
            <Text style={styles.ilerlemeKucuk}>egzersiz tamamlandı</Text>
          </View>
          <View style={styles.yuzdeContainer}>
            <Text style={styles.yuzdeText}>%{tamamYuzde}</Text>
          </View>
        </View>
        <View style={styles.ilerlemeBarBg}>
          <View style={[styles.ilerlemeBarFill, { width: `${tamamYuzde}%` }]} />
        </View>
        {tamamlananlar.length > 0 && (
          <TouchableOpacity style={styles.sifirlaBtn} onPress={tumunuSifirla}>
            <Text style={styles.sifirlaBtnText}>Tümünü Sıfırla</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Arama */}
      <View style={styles.aramaContainer}>
        <Text style={styles.aramaIcon}>🔍</Text>
        <TextInput
          style={styles.aramaInput}
          value={arama}
          onChangeText={setArama}
          placeholder="Egzersiz ara..."
          placeholderTextColor={colors.gray}
        />
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {[
          { key: 'tumu', label: 'Tümü', count: filtrelenmis.length },
          { key: 'bekleyen', label: 'Bekleyen', count: bekleyenler.length },
          { key: 'tamamlanan', label: 'Bitti', count: tamamlananlar.length },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, seciliTab === tab.key && styles.tabActive]}
            onPress={() => setSeciliTab(tab.key)}
          >
            <Text style={[styles.tabText, seciliTab === tab.key && styles.tabTextActive]}>
              {tab.label} ({tab.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Liste */}
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {gosterilecek.length === 0 ? (
          <View style={styles.bosContainer}>
            <Text style={styles.bosEmoji}>{seciliTab === 'tamamlanan' ? '🎯' : '✨'}</Text>
            <Text style={styles.bosText}>
              {seciliTab === 'tamamlanan'
                ? 'Henüz tamamlanan egzersiz yok'
                : seciliTab === 'bekleyen'
                ? 'Tüm egzersizler tamamlandı!'
                : 'Sonuç bulunamadı'}
            </Text>
          </View>
        ) : (
          gosterilecek.map((egzersiz) => (
            <TouchableOpacity
              key={egzersiz.id}
              style={[styles.egzersizCard, egzersiz.tamamlandi && styles.egzersizCardDone]}
              onPress={() => toggleTamamla(egzersiz.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkBox, egzersiz.tamamlandi && styles.checkBoxDone]}>
                {egzersiz.tamamlandi && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <View style={styles.egzersizInfo}>
                <Text style={[styles.egzersizAd, egzersiz.tamamlandi && styles.egzersizAdDone]}>
                  {egzersiz.ad}
                </Text>
                <Text style={styles.egzersizAciklama}>{egzersiz.aciklama}</Text>
              </View>
              <View style={styles.sureBadge}>
                <Text style={styles.sureText}>{egzersiz.sure}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  // İlerleme kartı
  ilerlemeCard: {
    marginHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  ilerlemeUst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ilerlemeBuyuk: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
  },
  ilerlemeKucuk: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  yuzdeContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  yuzdeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  ilerlemeBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  ilerlemeBarFill: {
    height: '100%',
    backgroundColor: '#27AE60',
    borderRadius: 4,
  },
  sifirlaBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  sifirlaBtnText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  // Arama
  aramaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  aramaIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  aramaInput: {
    flex: 1,
    fontSize: 15,
    color: colors.white,
    paddingVertical: 12,
  },
  // Tab bar
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.white,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },
  tabTextActive: {
    color: colors.primary,
  },
  // Liste
  list: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  // Egzersiz kartı
  egzersizCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  egzersizCardDone: {
    backgroundColor: '#F0FFF0',
    borderColor: '#C8E6C9',
  },
  checkBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkBoxDone: {
    backgroundColor: '#27AE60',
    borderColor: '#27AE60',
  },
  checkMark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  egzersizInfo: {
    flex: 1,
  },
  egzersizAd: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 3,
  },
  egzersizAdDone: {
    textDecorationLine: 'line-through',
    color: colors.gray,
  },
  egzersizAciklama: {
    fontSize: 12,
    color: colors.textLight,
  },
  sureBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 8,
  },
  sureText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '600',
  },
  // Boş durum
  bosContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  bosEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  bosText: {
    fontSize: 15,
    color: colors.gray,
    textAlign: 'center',
  },
});
