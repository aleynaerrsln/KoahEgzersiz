import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';

const saatSecenekleri = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00', '23:00',
];

const defaultIlaclar = [
  { id: 1, ad: 'Ventolin İnhaler', doz: '2 puf', saat: '08:00', gunler: 'Her gün', alindi: false },
  { id: 2, ad: 'Spiriva', doz: '1 kapsül', saat: '09:00', gunler: 'Her gün', alindi: true },
  { id: 3, ad: 'Metformin', doz: '500 mg', saat: '13:00', gunler: 'Her gün', alindi: false },
];

export default function IlacHatirlaticiScreen() {
  const [ilaclar, setIlaclar] = useState(defaultIlaclar);

  useEffect(() => {
    AsyncStorage.getItem('ilaclar').then((saved) => {
      if (saved) setIlaclar(JSON.parse(saved));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('ilaclar', JSON.stringify(ilaclar));
  }, [ilaclar]);

  const [eklemeModal, setEklemeModal] = useState(false);
  const [saatModal, setSaatModal] = useState(false);
  const [yeniIlac, setYeniIlac] = useState({
    ad: '',
    doz: '',
    saat: '08:00',
    gunler: 'Her gün',
  });

  const gunSecenekleri = ['Her gün', 'Hafta içi', 'Hafta sonu', '2 günde bir'];

  const ilacEkle = () => {
    if (!yeniIlac.ad || !yeniIlac.doz) {
      Alert.alert('Uyarı', 'İlaç adı ve dozunu giriniz.');
      return;
    }

    const yeni = {
      id: Date.now(),
      ad: yeniIlac.ad,
      doz: yeniIlac.doz,
      saat: yeniIlac.saat,
      gunler: yeniIlac.gunler,
      alindi: false,
    };

    setIlaclar([...ilaclar, yeni]);
    setEklemeModal(false);
    setYeniIlac({ ad: '', doz: '', saat: '08:00', gunler: 'Her gün' });
  };

  const alindiIsaretle = (id) => {
    setIlaclar(ilaclar.map((i) =>
      i.id === id ? { ...i, alindi: !i.alindi } : i
    ));
  };

  const ilacSil = (id) => {
    Alert.alert('Silme Onayı', 'Bu ilacı silmek istediğinize emin misiniz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Sil', style: 'destructive', onPress: () => setIlaclar(ilaclar.filter((i) => i.id !== id)) },
    ]);
  };

  const alinanSayisi = ilaclar.filter((i) => i.alindi).length;
  const toplamSayisi = ilaclar.length;

  // Saate göre sırala
  const siraliIlaclar = [...ilaclar].sort((a, b) => a.saat.localeCompare(b.saat));

  return (
    <View style={styles.container}>
      {/* Özet Bar */}
      <View style={styles.ozetBar}>
        <View style={styles.ozetSol}>
          <Text style={styles.ozetBaslik}>Bugünkü İlaçlar</Text>
          <Text style={styles.ozetAlt}>{alinanSayisi}/{toplamSayisi} alındı</Text>
        </View>
        <TouchableOpacity style={styles.ekleBtn} onPress={() => setEklemeModal(true)}>
          <Text style={styles.ekleBtnText}>+ İlaç Ekle</Text>
        </TouchableOpacity>
      </View>

      {/* İlerleme */}
      <View style={styles.ilerlemeContainer}>
        <View style={styles.ilerlemeBar}>
          <View style={[styles.ilerlemeDolu, { width: toplamSayisi > 0 ? `${(alinanSayisi / toplamSayisi) * 100}%` : '0%' }]} />
        </View>
      </View>

      {/* İlaç Listesi */}
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {siraliIlaclar.length === 0 ? (
          <Text style={styles.bosText}>Henüz ilaç eklenmemiş.</Text>
        ) : (
          siraliIlaclar.map((ilac) => (
            <View key={ilac.id} style={[styles.card, ilac.alindi && styles.cardAlindi]}>
              <TouchableOpacity
                style={styles.cardSol}
                onPress={() => alindiIsaretle(ilac.id)}
              >
                <View style={[styles.checkbox, ilac.alindi && styles.checkboxSecili]}>
                  {ilac.alindi && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>

              <View style={styles.cardOrta}>
                <Text style={[styles.ilacAd, ilac.alindi && styles.ilacAdAlindi]}>{ilac.ad}</Text>
                <Text style={styles.ilacDoz}>{ilac.doz}</Text>
                <View style={styles.ilacAltRow}>
                  <Text style={styles.ilacSaat}>⏰ {ilac.saat}</Text>
                  <Text style={styles.ilacGun}>📅 {ilac.gunler}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.silBtn} onPress={() => ilacSil(ilac.id)}>
                <Text style={styles.silBtnText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Ekleme Modalı */}
      <Modal visible={eklemeModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalScroll} keyboardShouldPersistTaps="handled">
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Yeni İlaç Ekle</Text>

              <Text style={styles.inputLabel}>İlaç Adı:</Text>
              <TextInput
                style={styles.input}
                placeholder="Örn: Ventolin İnhaler"
                value={yeniIlac.ad}
                onChangeText={(t) => setYeniIlac({ ...yeniIlac, ad: t })}
              />

              <Text style={styles.inputLabel}>Doz:</Text>
              <TextInput
                style={styles.input}
                placeholder="Örn: 2 puf, 500 mg"
                value={yeniIlac.doz}
                onChangeText={(t) => setYeniIlac({ ...yeniIlac, doz: t })}
              />

              <Text style={styles.inputLabel}>Saat:</Text>
              <TouchableOpacity style={styles.saatSecBtn} onPress={() => setSaatModal(true)}>
                <Text style={styles.saatSecText}>{yeniIlac.saat}</Text>
                <Text style={styles.saatSecOk}>▼</Text>
              </TouchableOpacity>

              <Text style={styles.inputLabel}>Tekrar:</Text>
              <View style={styles.chipRow}>
                {gunSecenekleri.map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[styles.chip, yeniIlac.gunler === g && styles.chipActive]}
                    onPress={() => setYeniIlac({ ...yeniIlac, gunler: g })}
                  >
                    <Text style={[styles.chipText, yeniIlac.gunler === g && styles.chipTextActive]}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.iptalBtn} onPress={() => setEklemeModal(false)}>
                  <Text style={styles.iptalBtnText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.kaydetBtn} onPress={ilacEkle}>
                  <Text style={styles.kaydetBtnText}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Saat Seçim Modalı */}
      <Modal visible={saatModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.saatModalContent}>
            <Text style={styles.modalTitle}>Saat Seçiniz</Text>
            <ScrollView style={styles.saatListe}>
              {saatSecenekleri.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.saatItem, yeniIlac.saat === s && styles.saatItemSecili]}
                  onPress={() => { setYeniIlac({ ...yeniIlac, saat: s }); setSaatModal(false); }}
                >
                  <Text style={[styles.saatItemText, yeniIlac.saat === s && styles.saatItemTextSecili]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  ozetBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  ozetSol: {},
  ozetBaslik: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  ozetAlt: {
    fontSize: 13,
    color: colors.primaryLight,
    marginTop: 2,
  },
  ekleBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  ekleBtnText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  ilerlemeContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  ilerlemeBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  ilerlemeDolu: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 3,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  bosText: {
    color: colors.white,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardAlindi: {
    opacity: 0.7,
    backgroundColor: '#F0FFF0',
  },
  cardSol: {
    marginRight: 12,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSecili: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkmark: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardOrta: {
    flex: 1,
  },
  ilacAd: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  ilacAdAlindi: {
    textDecorationLine: 'line-through',
    color: colors.gray,
  },
  ilacDoz: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  ilacAltRow: {
    flexDirection: 'row',
    gap: 12,
  },
  ilacSaat: {
    fontSize: 12,
    color: colors.textLight,
  },
  ilacGun: {
    fontSize: 12,
    color: colors.textLight,
  },
  silBtn: {
    padding: 6,
  },
  silBtnText: {
    fontSize: 18,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalScroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
  },
  saatSecBtn: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saatSecText: {
    fontSize: 15,
    color: colors.text,
  },
  saatSecOk: {
    fontSize: 12,
    color: colors.gray,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: '#FAFAFA',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: colors.text,
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  iptalBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray,
    marginRight: 8,
    alignItems: 'center',
  },
  iptalBtnText: {
    color: colors.gray,
    fontWeight: '600',
  },
  kaydetBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginLeft: 8,
    alignItems: 'center',
  },
  kaydetBtnText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  // Saat Modal
  saatModalContent: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 20,
    maxHeight: 400,
  },
  saatListe: {
    maxHeight: 300,
  },
  saatItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    alignItems: 'center',
  },
  saatItemSecili: {
    backgroundColor: '#FFF0F0',
  },
  saatItemText: {
    fontSize: 16,
    color: colors.text,
  },
  saatItemTextSecili: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
