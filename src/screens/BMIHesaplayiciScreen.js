import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import colors from '../constants/colors';

const bmiKategorileri = [
  { min: 0, max: 18.5, ad: 'Zayıf', renk: '#3498DB', emoji: '🔵' },
  { min: 18.5, max: 25, ad: 'Normal', renk: '#27AE60', emoji: '🟢' },
  { min: 25, max: 30, ad: 'Fazla Kilolu', renk: '#F39C12', emoji: '🟠' },
  { min: 30, max: 100, ad: 'Obez', renk: '#E74C3C', emoji: '🔴' },
];

const koahTavsiyeler = [
  {
    kategori: 'Zayıf',
    tavsiye: 'KOAH hastalarında düşük kilo, solunum kaslarının zayıflamasına neden olabilir. Protein ve kalori alımınızı artırmanız önerilir. Diyetisyeninize danışın.',
  },
  {
    kategori: 'Normal',
    tavsiye: 'İdeal kilonuzdasınız! Bu kiloyu korumak solunum fonksiyonlarınız için çok önemlidir. Dengeli beslenmeye ve düzenli egzersize devam edin.',
  },
  {
    kategori: 'Fazla Kilolu',
    tavsiye: 'Fazla kilo, diyaframa baskı yaparak nefes almayı zorlaştırabilir. Dengeli beslenme ve hafif egzersizlerle kilo kontrolü sağlamanız önerilir.',
  },
  {
    kategori: 'Obez',
    tavsiye: 'Obezite, KOAH semptomlarını ciddi şekilde kötüleştirebilir. Acil olarak diyetisyen ve doktorunuzla görüşerek kilo verme programı oluşturmanız önerilir.',
  },
];

export default function BMIHesaplayiciScreen() {
  const [boy, setBoy] = useState('');
  const [kilo, setKilo] = useState('');
  const [sonuc, setSonuc] = useState(null);

  const hesapla = () => {
    const boyM = parseFloat(boy) / 100;
    const kiloKg = parseFloat(kilo);

    if (!boyM || !kiloKg || boyM <= 0 || kiloKg <= 0) {
      return;
    }

    const bmi = kiloKg / (boyM * boyM);
    const kategori = bmiKategorileri.find((k) => bmi >= k.min && bmi < k.max) || bmiKategorileri[3];
    const tavsiye = koahTavsiyeler.find((t) => t.kategori === kategori.ad);

    setSonuc({
      bmi: bmi.toFixed(1),
      kategori,
      tavsiye: tavsiye?.tavsiye || '',
    });
  };

  const sifirla = () => {
    setBoy('');
    setKilo('');
    setSonuc(null);
  };

  // BMI barındaki pozisyon hesapla (10-40 arası)
  const getBarPosition = () => {
    if (!sonuc) return 0;
    const bmi = parseFloat(sonuc.bmi);
    const clampedBmi = Math.min(Math.max(bmi, 10), 40);
    return ((clampedBmi - 10) / 30) * 100;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Giriş Kartı */}
        <View style={styles.girisCard}>
          <Text style={styles.girisBaslik}>Değerlerinizi Girin</Text>

          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Boy (cm)</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="170"
                  placeholderTextColor="#CCC"
                  value={boy}
                  onChangeText={setBoy}
                  maxLength={3}
                />
                <Text style={styles.inputUnit}>cm</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Kilo (kg)</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="70"
                  placeholderTextColor="#CCC"
                  value={kilo}
                  onChangeText={setKilo}
                  maxLength={3}
                />
                <Text style={styles.inputUnit}>kg</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.hesaplaBtn} onPress={hesapla} activeOpacity={0.8}>
            <Text style={styles.hesaplaBtnText}>HESAPLA</Text>
          </TouchableOpacity>
        </View>

        {/* Sonuç Kartı */}
        {sonuc && (
          <View style={styles.sonucCard}>
            <Text style={styles.sonucBaslik}>Sonucunuz</Text>

            {/* BMI Değeri */}
            <View style={styles.bmiDegerContainer}>
              <Text style={styles.bmiEmoji}>{sonuc.kategori.emoji}</Text>
              <Text style={[styles.bmiDeger, { color: sonuc.kategori.renk }]}>
                {sonuc.bmi}
              </Text>
              <Text style={[styles.bmiKategori, { color: sonuc.kategori.renk }]}>
                {sonuc.kategori.ad}
              </Text>
            </View>

            {/* BMI Barı */}
            <View style={styles.bmiBarContainer}>
              <View style={styles.bmiBar}>
                <View style={[styles.bmiSegment, { flex: 18.5, backgroundColor: '#3498DB' }]} />
                <View style={[styles.bmiSegment, { flex: 6.5, backgroundColor: '#27AE60' }]} />
                <View style={[styles.bmiSegment, { flex: 5, backgroundColor: '#F39C12' }]} />
                <View style={[styles.bmiSegment, { flex: 10, backgroundColor: '#E74C3C' }]} />
              </View>
              {/* İndikatör */}
              <View style={[styles.indicator, { left: `${getBarPosition()}%` }]}>
                <View style={styles.indicatorTriangle} />
              </View>
              <View style={styles.bmiLabels}>
                <Text style={styles.bmiLabel}>10</Text>
                <Text style={styles.bmiLabel}>18.5</Text>
                <Text style={styles.bmiLabel}>25</Text>
                <Text style={styles.bmiLabel}>30</Text>
                <Text style={styles.bmiLabel}>40</Text>
              </View>
            </View>

            {/* Kategori Açıklamaları */}
            <View style={styles.kategoriList}>
              {bmiKategorileri.map((k) => (
                <View
                  key={k.ad}
                  style={[
                    styles.kategoriItem,
                    sonuc.kategori.ad === k.ad && styles.kategoriItemActive,
                  ]}
                >
                  <View style={[styles.kategoriDot, { backgroundColor: k.renk }]} />
                  <Text style={styles.kategoriText}>
                    {k.ad}: {k.min} - {k.max === 100 ? '40+' : k.max}
                  </Text>
                </View>
              ))}
            </View>

            {/* KOAH Tavsiye */}
            <View style={[styles.tavsiyeCard, { borderLeftColor: sonuc.kategori.renk }]}>
              <Text style={styles.tavsiyeBaslik}>KOAH ve Kilo Yönetimi</Text>
              <Text style={styles.tavsiyeText}>{sonuc.tavsiye}</Text>
            </View>

            {/* Sıfırla */}
            <TouchableOpacity style={styles.sifirlaBtn} onPress={sifirla}>
              <Text style={styles.sifirlaBtnText}>Yeniden Hesapla</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bilgi Kartı */}
        {!sonuc && (
          <View style={styles.bilgiCard}>
            <Text style={styles.bilgiBaslik}>BMI Nedir?</Text>
            <Text style={styles.bilgiText}>
              Vücut Kitle İndeksi (BMI), boy ve kilonuza göre vücut ağırlığınızın sağlıklı bir aralıkta
              olup olmadığını gösteren bir ölçüdür.
            </Text>
            <Text style={styles.bilgiFormul}>BMI = Kilo (kg) / Boy² (m)</Text>
            <Text style={styles.bilgiText}>
              KOAH hastalarında ideal kiloda olmak, solunum fonksiyonlarını doğrudan etkiler.
              Hem fazla kilo hem de düşük kilo KOAH semptomlarını kötüleştirebilir.
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
  girisCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  girisBaslik: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.lightGray,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    paddingRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    padding: 14,
    textAlign: 'center',
  },
  inputUnit: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '600',
  },
  hesaplaBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  hesaplaBtnText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  sonucCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  sonucBaslik: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  bmiDegerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  bmiEmoji: {
    fontSize: 30,
    marginBottom: 4,
  },
  bmiDeger: {
    fontSize: 52,
    fontWeight: 'bold',
  },
  bmiKategori: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 2,
  },
  bmiBarContainer: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  bmiBar: {
    flexDirection: 'row',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  bmiSegment: {
    height: '100%',
  },
  indicator: {
    position: 'absolute',
    top: 14,
    marginLeft: -6,
  },
  indicatorTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.text,
  },
  bmiLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  bmiLabel: {
    fontSize: 10,
    color: colors.gray,
  },
  kategoriList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  kategoriItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
  },
  kategoriItemActive: {
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  kategoriDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  kategoriText: {
    fontSize: 11,
    color: colors.textLight,
  },
  tavsiyeCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    marginBottom: 16,
  },
  tavsiyeBaslik: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  tavsiyeText: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 20,
  },
  sifirlaBtn: {
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  sifirlaBtnText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  bilgiCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  bilgiBaslik: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  bilgiText: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 22,
    marginBottom: 10,
  },
  bilgiFormul: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    backgroundColor: '#FFF5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
});
