import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import colors from '../constants/colors';

const UYARI_MESAJI =
  'Lütfen 4-5 kesme şeker veya 150-200 ml meyve suyu alınız. Ardından ek bir ara öğün alınız. 15 dakika sonra kan şekerinize bakınız. Normal sınırlara dönene kadar tekrarlayınız ve diyabet eğitimcinizden danışmanlık alınız.';

export default function KanSekeriIzlemScreen() {
  const [kayitlar, setKayitlar] = useState([
    {
      id: 1,
      ogunu: 'Sabah',
      aclikDurumu: 'Açlık',
      tarih: '05-03-2023',
      saat: '16:58:00',
      kanSekeri: 60,
      insulinDozu: '',
    },
  ]);

  const [eklemeModal, setEklemeModal] = useState(false);
  const [uyariModal, setUyariModal] = useState(false);
  const [uyariMesaj, setUyariMesaj] = useState('');
  const [uyariBaslik, setUyariBaslik] = useState('');
  const [yeniKayit, setYeniKayit] = useState({
    ogunu: 'Sabah',
    aclikDurumu: 'Açlık',
    kanSekeri: '',
    insulinDozu: '',
  });

  const bugun = new Date();
  const tarihStr = `${String(bugun.getDate()).padStart(2, '0')}-${String(bugun.getMonth() + 1).padStart(2, '0')}-${bugun.getFullYear()}`;

  const ogunSecenekleri = ['Sabah', 'Öğle', 'Akşam', 'Gece'];
  const aclikSecenekleri = ['Açlık', 'Tokluk'];

  const uyariGoster = (baslik, mesaj) => {
    setUyariBaslik(baslik);
    setUyariMesaj(mesaj);
    setUyariModal(true);
  };

  const kayitEkle = () => {
    if (!yeniKayit.kanSekeri) {
      uyariGoster('Uyarı', 'Kan şekeri değerini giriniz.');
      return;
    }

    const saat = `${String(bugun.getHours()).padStart(2, '0')}:${String(bugun.getMinutes()).padStart(2, '0')}:00`;
    const kanSekeriDegeri = parseInt(yeniKayit.kanSekeri);

    const yeni = {
      id: Date.now(),
      ogunu: yeniKayit.ogunu,
      aclikDurumu: yeniKayit.aclikDurumu,
      tarih: tarihStr,
      saat: saat,
      kanSekeri: kanSekeriDegeri,
      insulinDozu: yeniKayit.insulinDozu,
    };

    setKayitlar([yeni, ...kayitlar]);
    setEklemeModal(false);
    setYeniKayit({ ogunu: 'Sabah', aclikDurumu: 'Açlık', kanSekeri: '', insulinDozu: '' });

    if (kanSekeriDegeri < 70) {
      uyariGoster('UYARI', UYARI_MESAJI);
    }
  };

  const kayitSil = (id) => {
    Alert.alert('Silme Onayı', 'Bu kaydı silmek istediğinize emin misiniz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Sil', style: 'destructive', onPress: () => setKayitlar(kayitlar.filter((k) => k.id !== id)) },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Üst Bar */}
      <View style={styles.topBar}>
        <Text style={styles.tarihText}>📅 {tarihStr}</Text>
        <TouchableOpacity style={styles.ekleBtn} onPress={() => setEklemeModal(true)}>
          <Text style={styles.ekleBtnText}>Ekle</Text>
        </TouchableOpacity>
      </View>

      {/* Kayıtlar Listesi */}
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {kayitlar.length === 0 ? (
          <Text style={styles.bosText}>Henüz kayıt eklenmemiş.</Text>
        ) : (
          kayitlar.map((kayit) => (
            <View key={kayit.id} style={styles.card}>
              <View style={styles.cardRow}>
                <Text style={styles.label}>Öğünü:</Text>
                <Text style={styles.value}>{kayit.ogunu}</Text>
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.infoBtn}
                    onPress={() => {
                      if (kayit.kanSekeri < 70) {
                        uyariGoster('UYARI', UYARI_MESAJI);
                      } else {
                        uyariGoster('Bilgi', 'Kan şekeri değeriniz normal aralıktadır.');
                      }
                    }}
                  >
                    <Text style={styles.infoBtnText}>i</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.silBtn} onPress={() => kayitSil(kayit.id)}>
                    <Text style={styles.silBtnText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.label}>Açlık Durumu:</Text>
                <Text style={styles.value}>{kayit.aclikDurumu}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.label}>Tarih:</Text>
                <Text style={styles.value}>{kayit.tarih}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.label}>Saat:</Text>
                <Text style={styles.value}>{kayit.saat}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.label}>Kan Şekeri Değeri:</Text>
                <Text style={[styles.value, kayit.kanSekeri < 70 && { color: colors.danger, fontWeight: 'bold' }]}>
                  {kayit.kanSekeri}
                </Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.label}>İnsülin Dozu:</Text>
                <Text style={styles.value}>{kayit.insulinDozu || '-'}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Custom Uyarı Modalı */}
      <Modal visible={uyariModal} animationType="fade" transparent>
        <View style={styles.uyariOverlay}>
          <View style={styles.uyariCard}>
            <Text style={styles.uyariBaslik}>{uyariBaslik}</Text>
            <Text style={styles.uyariMesaj}>{uyariMesaj}</Text>
            <TouchableOpacity
              style={styles.uyariOkBtn}
              onPress={() => setUyariModal(false)}
            >
              <Text style={styles.uyariOkText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Ekleme Modalı */}
      <Modal visible={eklemeModal} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.modalScroll}
            keyboardShouldPersistTaps="handled"
          >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Kan Şekeri Kaydı Ekle</Text>

            <Text style={styles.inputLabel}>Öğünü:</Text>
            <View style={styles.chipRow}>
              {ogunSecenekleri.map((o) => (
                <TouchableOpacity
                  key={o}
                  style={[styles.chip, yeniKayit.ogunu === o && styles.chipActive]}
                  onPress={() => setYeniKayit({ ...yeniKayit, ogunu: o })}
                >
                  <Text style={[styles.chipText, yeniKayit.ogunu === o && styles.chipTextActive]}>{o}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Açlık Durumu:</Text>
            <View style={styles.chipRow}>
              {aclikSecenekleri.map((a) => (
                <TouchableOpacity
                  key={a}
                  style={[styles.chip, yeniKayit.aclikDurumu === a && styles.chipActive]}
                  onPress={() => setYeniKayit({ ...yeniKayit, aclikDurumu: a })}
                >
                  <Text style={[styles.chipText, yeniKayit.aclikDurumu === a && styles.chipTextActive]}>{a}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Kan Şekeri Değeri:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Örn: 95"
              value={yeniKayit.kanSekeri}
              onChangeText={(t) => setYeniKayit({ ...yeniKayit, kanSekeri: t })}
            />

            <Text style={styles.inputLabel}>İnsülin Dozu:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Örn: 10"
              value={yeniKayit.insulinDozu}
              onChangeText={(t) => setYeniKayit({ ...yeniKayit, insulinDozu: t })}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.iptalBtn} onPress={() => setEklemeModal(false)}>
                <Text style={styles.iptalBtnText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.kaydetBtn} onPress={kayitEkle}>
                <Text style={styles.kaydetBtnText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  tarihText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  ekleBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  ekleBtnText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
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
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    width: 140,
  },
  value: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: -2,
  },
  infoBtn: {
    backgroundColor: colors.primary,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  infoBtnText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  silBtn: {
    backgroundColor: colors.danger,
    width: 26,
    height: 26,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  silBtnText: {
    fontSize: 14,
  },
  // Uyarı Modalı
  uyariOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: 16,
    paddingBottom: 40,
  },
  uyariCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  uyariBaslik: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 14,
  },
  uyariMesaj: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 20,
  },
  uyariOkBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  uyariOkText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.primary,
  },
  // Ekleme Modalı
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
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
});
