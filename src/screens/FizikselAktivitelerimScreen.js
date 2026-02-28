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

export default function FizikselAktivitelerimScreen() {
  const [aktiviteler, setAktiviteler] = useState([
    {
      id: 1,
      tur: 'yürüyüş',
      sure: '30',
      durum: 'Yapıldı',
      tarihSaat: '23-08-2022 08:25',
    },
    {
      id: 2,
      tur: 'yürüyüş',
      sure: '20',
      durum: 'Yapıldı',
      tarihSaat: '05-03-2023 14:17',
    },
  ]);

  const [eklemeModal, setEklemeModal] = useState(false);
  const [yeniAktivite, setYeniAktivite] = useState({
    tur: 'yürüyüş',
    sure: '',
    durum: 'Yapıldı',
  });

  const aktiviteTurleri = ['yürüyüş', 'koşu', 'bisiklet', 'yüzme', 'egzersiz'];
  const durumlar = ['Yapıldı', 'Yapılmadı'];

  const bugun = new Date();
  const tarihSaatStr = `${String(bugun.getDate()).padStart(2, '0')}-${String(bugun.getMonth() + 1).padStart(2, '0')}-${bugun.getFullYear()} ${String(bugun.getHours()).padStart(2, '0')}:${String(bugun.getMinutes()).padStart(2, '0')}`;

  const aktiviteEkle = () => {
    if (!yeniAktivite.sure) {
      Alert.alert('Uyarı', 'Aktivite süresini giriniz.');
      return;
    }

    const yeni = {
      id: Date.now(),
      tur: yeniAktivite.tur,
      sure: yeniAktivite.sure,
      durum: yeniAktivite.durum,
      tarihSaat: tarihSaatStr,
    };

    setAktiviteler([yeni, ...aktiviteler]);
    setEklemeModal(false);
    setYeniAktivite({ tur: 'yürüyüş', sure: '', durum: 'Yapıldı' });
  };

  const aktiviteSil = (id) => {
    Alert.alert('Silme Onayı', 'Bu aktiviteyi silmek istediğinize emin misiniz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Sil', style: 'destructive', onPress: () => setAktiviteler(aktiviteler.filter((a) => a.id !== id)) },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Üst Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.ekleBtn} onPress={() => setEklemeModal(true)}>
          <Text style={styles.ekleBtnText}>Ekle</Text>
        </TouchableOpacity>
      </View>

      {/* Aktivite Listesi */}
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {aktiviteler.length === 0 ? (
          <Text style={styles.bosText}>Henüz aktivite eklenmemiş.</Text>
        ) : (
          aktiviteler.map((aktivite, index) => (
            <View key={aktivite.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{index + 1}. Gün Aktivitesi</Text>
                <TouchableOpacity style={styles.silBtn} onPress={() => aktiviteSil(aktivite.id)}>
                  <Text style={styles.silBtnText}>🗑️</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.divider} />

              <View style={styles.cardRow}>
                <Text style={styles.label}>Aktivite Türü:</Text>
                <Text style={styles.value}>{aktivite.tur}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.label}>Aktivite Süresi:</Text>
                <Text style={styles.value}>{aktivite.sure}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.label}>Aktivite Durumu:</Text>
                <Text style={[styles.value, { color: aktivite.durum === 'Yapıldı' ? colors.success : colors.danger }]}>
                  {aktivite.durum}
                </Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.label}>Aktivite Tarih-saat:</Text>
                <Text style={styles.value}>{aktivite.tarihSaat}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Ekleme Modalı */}
      <Modal visible={eklemeModal} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.modalScroll} keyboardShouldPersistTaps="handled">
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Fiziksel Aktivite Ekle</Text>

              {/* Aktivite Türü */}
              <Text style={styles.inputLabel}>Aktivite Türü:</Text>
              <View style={styles.chipRow}>
                {aktiviteTurleri.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.chip, yeniAktivite.tur === t && styles.chipActive]}
                    onPress={() => setYeniAktivite({ ...yeniAktivite, tur: t })}
                  >
                    <Text style={[styles.chipText, yeniAktivite.tur === t && styles.chipTextActive]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Süre */}
              <Text style={styles.inputLabel}>Aktivite Süresi (dk):</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Örn: 30"
                value={yeniAktivite.sure}
                onChangeText={(t) => setYeniAktivite({ ...yeniAktivite, sure: t })}
              />

              {/* Durum */}
              <Text style={styles.inputLabel}>Aktivite Durumu:</Text>
              <View style={styles.chipRow}>
                {durumlar.map((d) => (
                  <TouchableOpacity
                    key={d}
                    style={[styles.chip, yeniAktivite.durum === d && styles.chipActive]}
                    onPress={() => setYeniAktivite({ ...yeniAktivite, durum: d })}
                  >
                    <Text style={[styles.chipText, yeniAktivite.durum === d && styles.chipTextActive]}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Butonlar */}
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.iptalBtn} onPress={() => setEklemeModal(false)}>
                  <Text style={styles.iptalBtnText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.kaydetBtn} onPress={aktiviteEkle}>
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
    alignItems: 'center',
    padding: 16,
  },
  ekleBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  ekleBtnText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
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
    borderWidth: 2,
    borderColor: colors.success,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    width: 150,
  },
  value: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  silBtn: {
    backgroundColor: colors.danger,
    width: 30,
    height: 30,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  silBtnText: {
    fontSize: 16,
  },
  // Modal
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
