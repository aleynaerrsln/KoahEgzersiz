import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import colors from '../constants/colors';

const anketSorulari = [
  {
    id: 1,
    soru: 'Bugün kendinizi genel olarak nasıl hissediyorsunuz?',
    secenekler: [
      { text: 'Çok enerjik ve iyi', puan: 4 },
      { text: 'İyi hissediyorum', puan: 3 },
      { text: 'Biraz yorgunum', puan: 2 },
      { text: 'Kendimi kötü hissediyorum', puan: 1 },
    ],
  },
  {
    id: 2,
    soru: 'Bugün yeterli su içtiniz mi?',
    secenekler: [
      { text: 'Evet, 8 bardaktan fazla', puan: 4 },
      { text: '5-8 bardak içtim', puan: 3 },
      { text: '2-4 bardak içtim', puan: 2 },
      { text: 'Çok az içtim', puan: 1 },
    ],
  },
  {
    id: 3,
    soru: 'Bugün fiziksel aktivite yaptınız mı?',
    secenekler: [
      { text: 'Evet, 30 dakikadan fazla', puan: 4 },
      { text: '15-30 dakika yaptım', puan: 3 },
      { text: 'Kısa bir yürüyüş yaptım', puan: 2 },
      { text: 'Hayır, yapamadım', puan: 1 },
    ],
  },
  {
    id: 4,
    soru: 'Bugünkü beslenmeniz nasıldı?',
    secenekler: [
      { text: 'Dengeli ve düzenli yedim', puan: 4 },
      { text: 'Genel olarak iyi beslemdim', puan: 3 },
      { text: 'Öğün atladım', puan: 2 },
      { text: 'Düzensiz ve sağlıksız beslemdim', puan: 1 },
    ],
  },
  {
    id: 5,
    soru: 'Gece uyku kaliteniz nasıldı?',
    secenekler: [
      { text: 'Çok iyi uyudum (7-9 saat)', puan: 4 },
      { text: 'İyi uyudum (5-7 saat)', puan: 3 },
      { text: 'Sık sık uyandım', puan: 2 },
      { text: 'Neredeyse hiç uyuyamadım', puan: 1 },
    ],
  },
  {
    id: 6,
    soru: 'Vitamin ve takviyelerinizi aldınız mı?',
    secenekler: [
      { text: 'Evet, hepsini düzenli aldım', puan: 4 },
      { text: 'Bir kısmını aldım', puan: 3 },
      { text: 'Sadece birini aldım', puan: 2 },
      { text: 'Hayır, almadım', puan: 1 },
    ],
  },
  {
    id: 7,
    soru: 'Bugün stres seviyeniz nasıldı?',
    secenekler: [
      { text: 'Çok sakin ve huzurlu', puan: 4 },
      { text: 'Genel olarak rahat', puan: 3 },
      { text: 'Biraz stresli', puan: 2 },
      { text: 'Çok stresli ve gergin', puan: 1 },
    ],
  },
  {
    id: 8,
    soru: 'Bebeğinizin hareketlerini hissettiniz mi?',
    secenekler: [
      { text: 'Evet, düzenli ve aktif', puan: 4 },
      { text: 'Evet, birkaç kez hissettim', puan: 3 },
      { text: 'Çok az hissettim', puan: 2 },
      { text: 'Henüz hissetmedim / Erken dönem', puan: 0 },
    ],
  },
];

function getSonuc(toplamPuan) {
  const maxPuan = anketSorulari.length * 4;
  const yuzde = Math.round((toplamPuan / maxPuan) * 100);

  if (yuzde >= 85) {
    return {
      emoji: '🌟',
      baslik: 'Harika Gidiyorsunuz!',
      renk: '#27AE60',
      mesaj: 'Bugün kendinize çok iyi baktınız! Beslenme, egzersiz ve genel sağlığınız mükemmel görünüyor. Bu düzeni korumaya devam edin. Sağlıklı bir gebelik süreci geçiriyorsunuz.',
      tavsiyeler: [
        'Bu güzel rutininizi sürdürmeye devam edin',
        'Günlük yürüyüşlerinizi aksatmayın',
        'Bol su içmeye devam edin',
      ],
      puan: yuzde,
    };
  } else if (yuzde >= 65) {
    return {
      emoji: '😊',
      baslik: 'İyi Gidiyorsunuz!',
      renk: '#3498DB',
      mesaj: 'Genel olarak iyi bir gün geçirmişsiniz. Küçük iyileştirmelerle daha da iyi olabilirsiniz. Kendinize biraz daha zaman ayırmayı deneyin.',
      tavsiyeler: [
        'Öğün atlamamaya dikkat edin',
        'Günde en az 8 bardak su içmeyi hedefleyin',
        'Kısa nefes egzersizleri yaparak rahatlayın',
      ],
      puan: yuzde,
    };
  } else if (yuzde >= 45) {
    return {
      emoji: '💛',
      baslik: 'Biraz Daha Dikkat Edelim',
      renk: '#F39C12',
      mesaj: 'Bugün bazı alanlarda eksiklikler var. Özellikle beslenme, uyku ve fiziksel aktiviteye daha fazla önem vermeniz önerilir. Kendinizi zorlamayın ama küçük adımlarla ilerlemeye çalışın.',
      tavsiyeler: [
        'Yarın sabah hafif bir yürüyüşle güne başlayın',
        'Vitamin ve takviyelerinizi almayı unutmayın',
        'Uyumadan önce rahatlatıcı bir çay için',
        'Stresi azaltmak için nefes egzersizi deneyin',
      ],
      puan: yuzde,
    };
  } else {
    return {
      emoji: '🤗',
      baslik: 'Kendinize Daha İyi Bakmalısınız',
      renk: '#E74C3C',
      mesaj: 'Bugün zorlu bir gün geçirmiş olabilirsiniz. Kendinize ve bebeğinize daha iyi bakmanız çok önemli. Eğer sürekli kötü hissediyorsanız doktorunuza danışmanızı öneririz.',
      tavsiyeler: [
        'Düzenli beslenmeye öncelik verin',
        'Bol su içmeyi ihmal etmeyin',
        'Hafif bir yürüyüş bile faydalı olacaktır',
        'Uyku düzeninizi iyileştirmeye çalışın',
        'Kendinizi çok zorlarsanız dinlenin',
      ],
      puan: yuzde,
    };
  }
}

export default function AnketScreen() {
  const [cevaplar, setCevaplar] = useState({});
  const [gonderildi, setGonderildi] = useState(false);
  const [sonucModal, setSonucModal] = useState(false);
  const [sonucData, setSonucData] = useState(null);

  const cevapSec = (soruId, secenekIndex) => {
    setCevaplar({ ...cevaplar, [soruId]: secenekIndex });
  };

  const anketGonder = () => {
    if (Object.keys(cevaplar).length < anketSorulari.length) {
      setSonucModal(true);
      return;
    }

    let toplamPuan = 0;
    anketSorulari.forEach((soru) => {
      const secilen = cevaplar[soru.id];
      if (secilen !== undefined) {
        toplamPuan += soru.secenekler[secilen].puan;
      }
    });

    setSonucData(getSonuc(toplamPuan));
    setGonderildi(true);
  };

  const sifirla = () => {
    setCevaplar({});
    setGonderildi(false);
    setSonucData(null);
  };

  if (gonderildi && sonucData) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.sonucContent}>
        {/* Sonuç kartı */}
        <View style={styles.sonucCard}>
          <Text style={styles.sonucEmoji}>{sonucData.emoji}</Text>
          <Text style={styles.sonucBaslik}>{sonucData.baslik}</Text>

          {/* Puan göstergesi */}
          <View style={styles.puanContainer}>
            <View style={styles.puanBarBg}>
              <View style={[styles.puanBarFill, { width: `${sonucData.puan}%`, backgroundColor: sonucData.renk }]} />
            </View>
            <Text style={[styles.puanText, { color: sonucData.renk }]}>%{sonucData.puan}</Text>
          </View>

          <Text style={styles.sonucMesaj}>{sonucData.mesaj}</Text>
        </View>

        {/* Tavsiyeler */}
        <View style={styles.tavsiyeCard}>
          <Text style={styles.tavsiyeBaslik}>Tavsiyeler</Text>
          {sonucData.tavsiyeler.map((tavsiye, index) => (
            <View key={index} style={styles.tavsiyeRow}>
              <View style={[styles.tavsiyeDot, { backgroundColor: sonucData.renk }]} />
              <Text style={styles.tavsiyeText}>{tavsiye}</Text>
            </View>
          ))}
        </View>

        {/* Butonlar */}
        <TouchableOpacity style={styles.tekrarBtn} onPress={sifirla}>
          <Text style={styles.tekrarBtnText}>Yeni Anket Doldur</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const tamamlanan = Object.keys(cevaplar).length;
  const toplam = anketSorulari.length;
  const yuzde = Math.round((tamamlanan / toplam) * 100);

  return (
    <View style={styles.container}>
      {/* İlerleme Barı */}
      <View style={styles.ilerlemeContainer}>
        <View style={styles.ilerlemeBar}>
          <View style={[styles.ilerlemeDolu, { width: `${yuzde}%` }]} />
        </View>
        <Text style={styles.ilerlemeText}>{tamamlanan}/{toplam} soru cevaplandı</Text>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {anketSorulari.map((item, index) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.soruNumara}>Soru {index + 1}</Text>
            <Text style={styles.soruText}>{item.soru}</Text>

            <View style={styles.secenekler}>
              {item.secenekler.map((secenek, secIndex) => (
                <TouchableOpacity
                  key={secIndex}
                  style={[
                    styles.secenek,
                    cevaplar[item.id] === secIndex && styles.secenekSecili,
                  ]}
                  onPress={() => cevapSec(item.id, secIndex)}
                >
                  <View style={[styles.radio, cevaplar[item.id] === secIndex && styles.radioSecili]}>
                    {cevaplar[item.id] === secIndex && <View style={styles.radioIc} />}
                  </View>
                  <Text style={[styles.secenekText, cevaplar[item.id] === secIndex && styles.secenekTextSecili]}>
                    {secenek.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.gonderBtn} onPress={anketGonder}>
          <Text style={styles.gonderBtnText}>Sonuçları Gör</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Eksik cevap uyarısı */}
      <Modal visible={sonucModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>⚠️</Text>
            <Text style={styles.modalBaslik}>Eksik Cevap</Text>
            <Text style={styles.modalMesaj}>
              Lütfen tüm soruları cevaplayınız. ({tamamlanan}/{toplam} cevaplandı)
            </Text>
            <TouchableOpacity style={styles.modalBtn} onPress={() => setSonucModal(false)}>
              <Text style={styles.modalBtnText}>Tamam</Text>
            </TouchableOpacity>
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
  ilerlemeContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  ilerlemeBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  ilerlemeDolu: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  ilerlemeText: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'right',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  soruNumara: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  soruText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 14,
    lineHeight: 22,
  },
  secenekler: {
    gap: 8,
  },
  secenek: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: '#FAFAFA',
  },
  secenekSecili: {
    borderColor: colors.primary,
    backgroundColor: '#FFF0F0',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSecili: {
    borderColor: colors.primary,
  },
  radioIc: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  secenekText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  secenekTextSecili: {
    color: colors.primary,
    fontWeight: '600',
  },
  gonderBtn: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  gonderBtnText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 17,
  },
  // Sonuç ekranı
  sonucContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sonucCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  sonucEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  sonucBaslik: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  puanContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  puanBarBg: {
    flex: 1,
    height: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  puanBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  puanText: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 50,
    textAlign: 'right',
  },
  sonucMesaj: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
  // Tavsiyeler
  tavsiyeCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  tavsiyeBaslik: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 14,
  },
  tavsiyeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tavsiyeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  tavsiyeText: {
    flex: 1,
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  tekrarBtn: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  tekrarBtnText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
  },
  modalEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  modalBaslik: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  modalMesaj: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalBtnText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
