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

const besinListesi = [
  { ad: 'Ayran', kalori: '114 cal / 300 Cc', olcumBirimi: 'Cc', olcumAciklama: '1,5 su bardağı = 300 ml' },
  { ad: 'Süt (tam yağlı)', kalori: '150 cal / 250 ml', olcumBirimi: 'ml', olcumAciklama: '1 su bardağı = 250 ml' },
  { ad: 'Yoğurt', kalori: '80 cal / 150 gr', olcumBirimi: 'gr', olcumAciklama: '1 kase = 150 gr' },
  { ad: 'Yumurta', kalori: '155 cal / 100 gr', olcumBirimi: 'adet', olcumAciklama: '1 adet = ~60 gr' },
  { ad: 'Ekmek (beyaz)', kalori: '265 cal / 100 gr', olcumBirimi: 'gr', olcumAciklama: '1 dilim = ~30 gr' },
  { ad: 'Pilav', kalori: '130 cal / 100 gr', olcumBirimi: 'gr', olcumAciklama: '1 porsiyon = ~150 gr' },
  { ad: 'Tavuk göğsü', kalori: '165 cal / 100 gr', olcumBirimi: 'gr', olcumAciklama: '1 porsiyon = ~120 gr' },
  { ad: 'Elma', kalori: '52 cal / 100 gr', olcumBirimi: 'gr', olcumAciklama: '1 adet = ~180 gr' },
  { ad: 'Muz', kalori: '89 cal / 100 gr', olcumBirimi: 'gr', olcumAciklama: '1 adet = ~120 gr' },
  { ad: 'Salata', kalori: '20 cal / 100 gr', olcumBirimi: 'gr', olcumAciklama: '1 porsiyon = ~200 gr' },
];

const ogunler = ['Sabah', 'Öğle', 'Akşam', 'Ara Öğün'];
const haftalar = Array.from({ length: 40 }, (_, i) => i + 1);

export default function BeslenmeEklemeScreen() {
  const [gebelikHaftasi, setGebelikHaftasi] = useState(null);
  const [haftaModal, setHaftaModal] = useState(false);
  const [secilenOgun, setSecilenOgun] = useState('Sabah');
  const [eklenenBesinler, setEklenenBesinler] = useState([]);
  const [besinModal, setBesinModal] = useState(false);
  const [secilenBesin, setSecilenBesin] = useState(null);
  const [miktar, setMiktar] = useState('');

  const toplamKalori = eklenenBesinler.reduce((toplam, b) => toplam + b.hesaplananKalori, 0);

  const besinSec = (besin) => {
    setSecilenBesin(besin);
    setMiktar('');
  };

  const listeyeKaydet = () => {
    if (!secilenBesin) {
      Alert.alert('Uyarı', 'Lütfen bir besin seçiniz.');
      return;
    }
    if (!miktar) {
      Alert.alert('Uyarı', 'Lütfen besin miktarını giriniz.');
      return;
    }

    const calStr = secilenBesin.kalori.split(' cal')[0];
    const baseCalorie = parseFloat(calStr);
    const birimStr = secilenBesin.kalori.split('/ ')[1];
    const baseAmount = parseFloat(birimStr);
    const hesaplanan = (baseCalorie / baseAmount) * parseFloat(miktar);

    const yeniBesin = {
      id: Date.now(),
      ad: secilenBesin.ad,
      miktar: miktar,
      birim: secilenBesin.olcumBirimi,
      hesaplananKalori: Math.round(hesaplanan * 100) / 100,
      ogunu: secilenOgun,
    };

    setEklenenBesinler([...eklenenBesinler, yeniBesin]);
    setSecilenBesin(null);
    setMiktar('');
    setBesinModal(false);
  };

  const besinSil = (id) => {
    setEklenenBesinler(eklenenBesinler.filter((b) => b.id !== id));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.content}>
        {/* Gebelik Haftası Seçimi */}
        <Text style={styles.label}>Gebelik Haftanızı Seçiniz:</Text>
        <TouchableOpacity style={styles.dropdownBtn} onPress={() => setHaftaModal(true)}>
          <Text style={styles.dropdownText}>
            {gebelikHaftasi ? `${gebelikHaftasi}. Hafta` : 'Hafta seçiniz...'}
          </Text>
          <Text style={styles.dropdownOk}>▼</Text>
        </TouchableOpacity>

        {/* Öğün Seçimi */}
        <Text style={styles.label}>Öğünümü Seçiniz:</Text>
        <View style={styles.chipRow}>
          {ogunler.map((o) => (
            <TouchableOpacity
              key={o}
              style={[styles.chip, secilenOgun === o && styles.chipActive]}
              onPress={() => setSecilenOgun(o)}
            >
              <Text style={[styles.chipText, secilenOgun === o && styles.chipTextActive]}>{o}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Besin Seçimine Git */}
        <TouchableOpacity style={styles.besinSecBtn} onPress={() => setBesinModal(true)}>
          <Text style={styles.besinSecBtnText}>Besin Seçimine Git  →</Text>
        </TouchableOpacity>

        {/* Toplam Kalori */}
        <View style={styles.kaloriBar}>
          <Text style={styles.kaloriText}>
            Besinlerden Alınan Toplam Kalori: <Text style={styles.kaloriBold}>{toplamKalori.toFixed(2)} cal</Text>
          </Text>
        </View>

        {/* Eklenen Besinler */}
        {eklenenBesinler.length === 0 ? (
          <Text style={styles.bosText}>Henüz besin eklenmemiş.</Text>
        ) : (
          eklenenBesinler.map((besin) => (
            <View key={besin.id} style={styles.besinCard}>
              <View style={styles.besinCardHeader}>
                <Text style={styles.besinAd}>{besin.ad}</Text>
                <TouchableOpacity onPress={() => besinSil(besin.id)}>
                  <Text style={styles.silText}>🗑️</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.besinDetay}>Miktar: {besin.miktar} {besin.birim}</Text>
              <Text style={styles.besinDetay}>Kalori: {besin.hesaplananKalori} cal</Text>
              <Text style={styles.besinDetay}>Öğün: {besin.ogunu}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Hafta Seçim Modalı */}
      <Modal visible={haftaModal} animationType="fade" transparent>
        <View style={styles.haftaModalOverlay}>
          <View style={styles.haftaModalContent}>
            <Text style={styles.haftaModalTitle}>Gebelik Haftası Seçiniz</Text>
            <ScrollView style={styles.haftaListe}>
              {haftalar.map((h) => (
                <TouchableOpacity
                  key={h}
                  style={[styles.haftaItem, gebelikHaftasi === h && styles.haftaItemSecili]}
                  onPress={() => { setGebelikHaftasi(h); setHaftaModal(false); }}
                >
                  <Text style={[styles.haftaItemText, gebelikHaftasi === h && styles.haftaItemTextSecili]}>
                    {h}. Hafta
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Besin Seçim Modalı */}
      <Modal visible={besinModal} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.modalScroll} keyboardShouldPersistTaps="handled">
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setBesinModal(false)}>
                  <Text style={styles.geriBtn}>←</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Besin Ekleme</Text>
                <View style={{ width: 30 }} />
              </View>

              {/* Besin Listesi */}
              {!secilenBesin ? (
                <>
                  <Text style={styles.inputLabel}>Besin seçiniz:</Text>
                  {besinListesi.map((besin) => (
                    <TouchableOpacity
                      key={besin.ad}
                      style={styles.besinItem}
                      onPress={() => besinSec(besin)}
                    >
                      <Text style={styles.besinItemText}>{besin.ad}</Text>
                    </TouchableOpacity>
                  ))}
                </>
              ) : (
                <>
                  {/* Seçilen Besin Detayı */}
                  <View style={styles.besinDetayCard}>
                    <View style={styles.detayRow}>
                      <Text style={styles.detayLabel}>Besin Adı:</Text>
                      <Text style={styles.detayValue}>{secilenBesin.ad}</Text>
                    </View>
                    <View style={styles.detayRow}>
                      <Text style={styles.detayLabel}>Kalorisi:</Text>
                      <Text style={styles.detayValue}>{secilenBesin.kalori}</Text>
                    </View>
                    <View style={styles.detayRow}>
                      <Text style={styles.detayLabel}>Ölçüm Birimi:</Text>
                      <Text style={styles.detayValue}>{secilenBesin.olcumBirimi}</Text>
                    </View>
                    <View style={styles.detayRow}>
                      <Text style={styles.detayLabel}>Ölçüm Açıklaması:</Text>
                      <Text style={styles.detayValue}>{secilenBesin.olcumAciklama}</Text>
                    </View>
                  </View>

                  {/* Miktar Girişi */}
                  <Text style={styles.inputLabel}>Besin miktarını giriniz({secilenBesin.olcumBirimi}):</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder={`Miktar (${secilenBesin.olcumBirimi})`}
                    value={miktar}
                    onChangeText={setMiktar}
                  />

                  {/* Kaydet Butonu */}
                  <TouchableOpacity style={styles.kaydetBtn} onPress={listeyeKaydet}>
                    <Text style={styles.kaydetBtnText}>Listeye Kaydet</Text>
                  </TouchableOpacity>

                  {/* Farklı Besin Seç */}
                  <TouchableOpacity style={styles.degistirBtn} onPress={() => setSecilenBesin(null)}>
                    <Text style={styles.degistirBtnText}>Farklı Besin Seç</Text>
                  </TouchableOpacity>
                </>
              )}
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
  scrollArea: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  chipActive: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  chipText: {
    fontSize: 13,
    color: colors.white,
  },
  chipTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  besinSecBtn: {
    backgroundColor: colors.warning,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  besinSecBtnText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  kaloriBar: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  kaloriText: {
    fontSize: 14,
    color: colors.text,
  },
  kaloriBold: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  bosText: {
    color: colors.white,
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
  },
  besinCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  besinCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  besinAd: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  silText: {
    fontSize: 18,
  },
  besinDetay: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 2,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  geriBtn: {
    fontSize: 24,
    color: colors.white,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 8,
    marginTop: 10,
  },
  besinItem: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 14,
    marginBottom: 6,
  },
  besinItemText: {
    fontSize: 15,
    color: colors.text,
  },
  besinDetayCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  detayRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detayLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    width: 130,
  },
  detayValue: {
    fontSize: 13,
    color: colors.text,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    backgroundColor: colors.white,
    marginBottom: 14,
  },
  kaydetBtn: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  kaydetBtnText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  degistirBtn: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  degistirBtnText: {
    color: colors.white,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  // Dropdown
  dropdownBtn: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dropdownText: {
    fontSize: 15,
    color: colors.text,
  },
  dropdownOk: {
    fontSize: 12,
    color: colors.gray,
  },
  // Hafta Modal
  haftaModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  haftaModalContent: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 20,
    maxHeight: 400,
  },
  haftaModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  haftaListe: {
    maxHeight: 320,
  },
  haftaItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    alignItems: 'center',
  },
  haftaItemSecili: {
    backgroundColor: '#FFF0F0',
  },
  haftaItemText: {
    fontSize: 16,
    color: colors.text,
  },
  haftaItemTextSecili: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
