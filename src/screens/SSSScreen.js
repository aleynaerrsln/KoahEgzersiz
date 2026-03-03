import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';

const sorular = [
  {
    id: 1,
    soru: 'Gebelikte kan şekeri takibi neden önemlidir?',
    cevap: 'Gebelik diyabeti (gestasyonel diyabet) anne ve bebek sağlığını ciddi şekilde etkileyebilir. Düzenli kan şekeri takibi, olası komplikasyonları erken tespit etmenizi sağlar. Açlık kan şekeri 95 mg/dL altında, tokluk kan şekeri ise 1. saat 140, 2. saat 120 mg/dL altında olmalıdır.',
  },
  {
    id: 2,
    soru: 'Gebelikte hangi egzersizler yapılabilir?',
    cevap: 'Gebelikte yürüyüş, yüzme, prenatal yoga ve hafif germe egzersizleri güvenle yapılabilir. Haftada en az 150 dakika orta yoğunlukta fiziksel aktivite önerilir. Ağır kaldırma, sırt üstü uzanarak yapılan egzersizler ve temas sporlarından kaçınılmalıdır. Egzersize başlamadan önce mutlaka doktorunuza danışın.',
  },
  {
    id: 3,
    soru: 'Gebelikte nasıl beslenmeliyim?',
    cevap: 'Gebelikte dengeli ve çeşitli beslenme çok önemlidir. Folik asit, demir, kalsiyum ve D vitamini ihtiyacı artar. Günde 3 ana öğün ve 2-3 ara öğün tüketilmeli, bol su içilmelidir. Çiğ et, çiğ süt ürünleri ve işlenmemiş yiyeceklerden kaçınılmalıdır.',
  },
  {
    id: 4,
    soru: 'Gebelikte ne kadar kilo almalıyım?',
    cevap: 'Kilo alımı gebelik öncesi BMI değerine göre değişir. Normal kilolu kadınlarda (BMI 18.5-24.9) toplam 11-16 kg, fazla kilolularda (BMI 25-29.9) 7-11 kg, obez kadınlarda (BMI 30+) 5-9 kg kilo alımı önerilir. Ani ve aşırı kilo alımı preeklampsi gibi komplikasyonların habercisi olabilir.',
  },
  {
    id: 5,
    soru: 'Nefes egzersizleri gebelikte faydalı mıdır?',
    cevap: 'Evet, nefes egzersizleri gebelikte çok faydalıdır. Stresi azaltır, uyku kalitesini artırır ve doğuma hazırlık sürecinde büyük rol oynar. Derin nefes alma, diyafram solunumu ve 4-7-8 tekniği gibi yöntemler günlük olarak uygulanabilir.',
  },
  {
    id: 6,
    soru: 'Gebelikte hangi ilaçları kullanabilirim?',
    cevap: 'Gebelikte ilaç kullanımı konusunda mutlaka doktorunuza danışmalısınız. Folik asit, demir ve prenatal vitaminler genellikle önerilir. Reçetesiz ağrı kesici, soğuk algınlığı ilaçları ve bitkisel ürünler bile doktor onayı olmadan kullanılmamalıdır.',
  },
  {
    id: 7,
    soru: 'Doktora ne zaman acil başvurmalıyım?',
    cevap: 'Vajinal kanama, şiddetli karın ağrısı, şiddetli baş ağrısı, görme bozuklukları, yüz/el/ayaklarda ani şişme, ateş (38°C üzeri), bebeğin hareketlerinde belirgin azalma veya su gelmesi durumlarında derhal doktorunuza veya acil servise başvurmalısınız.',
  },
  {
    id: 8,
    soru: 'Bu uygulamadaki verilerimi nasıl kullanabilirim?',
    cevap: 'Uygulamada kaydettiğiniz kan şekeri, beslenme, fiziksel aktivite ve ilaç bilgilerini doktor kontrollerinizde paylaşabilirsiniz. Bu veriler doktorunuzun sizi daha iyi takip etmesine ve tedavi planını kişiselleştirmesine yardımcı olur.',
  },
];

export default function SSSScreen() {
  const [acikSoru, setAcikSoru] = useState(null);

  const toggleSoru = (id) => {
    setAcikSoru(acikSoru === id ? null : id);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.subtitle}>Merak ettiğiniz soruların cevapları</Text>

      {sorular.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => toggleSoru(item.id)}
          activeOpacity={0.8}
        >
          <View style={styles.soruRow}>
            <View style={styles.soruNumara}>
              <Text style={styles.numaraText}>{item.id}</Text>
            </View>
            <Text style={styles.soruText}>{item.soru}</Text>
            <Text style={styles.okIcon}>{acikSoru === item.id ? '▲' : '▼'}</Text>
          </View>

          {acikSoru === item.id && (
            <View style={styles.cevapContainer}>
              <View style={styles.cevapDivider} />
              <Text style={styles.cevapText}>{item.cevap}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
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
  subtitle: {
    fontSize: 14,
    color: colors.primaryLight,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  soruRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soruNumara: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numaraText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  soruText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  okIcon: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 8,
  },
  cevapContainer: {
    marginTop: 12,
  },
  cevapDivider: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginBottom: 12,
  },
  cevapText: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 22,
  },
});
