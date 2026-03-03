import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import colors from '../constants/colors';

const teknikler = [
  {
    id: 'buzukDudak',
    ad: 'Büzük Dudak',
    aciklama: 'Burnunuzdan yavaşça nefes alın, dudaklarınızı büzerek ağızdan yavaşça nefes verin.',
    nefesAl: 3000,
    tut: 1000,
    nefesVer: 6000,
    icon: '👄',
  },
  {
    id: 'diyafram',
    ad: 'Diyafram',
    aciklama: 'Elinizi karnınıza koyun. Nefes alırken karnınız şişmeli, verirken içeri çekilmelidir.',
    nefesAl: 4000,
    tut: 2000,
    nefesVer: 6000,
    icon: '🫁',
  },
  {
    id: 'teknik478',
    ad: '4-7-8',
    aciklama: '4 saniye nefes alın, 7 saniye tutun, 8 saniye yavaşça verin. Rahatlama tekniği.',
    nefesAl: 4000,
    tut: 7000,
    nefesVer: 8000,
    icon: '🧘',
  },
];

const fazRenkleri = {
  nefesAl: '#27AE60',
  tut: '#F39C12',
  nefesVer: '#3498DB',
  bekleme: 'rgba(255,255,255,0.4)',
};

const fazGlowRenkleri = {
  nefesAl: 'rgba(39,174,96,0.25)',
  tut: 'rgba(243,156,18,0.25)',
  nefesVer: 'rgba(52,152,219,0.25)',
  bekleme: 'rgba(255,255,255,0.08)',
};

const fazMetinleri = {
  nefesAl: 'NEFES AL',
  tut: 'TUT',
  nefesVer: 'NEFES VER',
  bekleme: 'HAZIR',
};

const fazAltMetinleri = {
  nefesAl: 'Burnunuzdan yavaşça...',
  tut: 'Nefesinizi tutun...',
  nefesVer: 'Ağızdan yavaşça...',
  bekleme: 'Başlamak için dokunun',
};

export default function NefesEgzersiziScreen() {
  const [seciliTeknik, setSeciliTeknik] = useState(0);
  const [aktif, setAktif] = useState(false);
  const [faz, setFaz] = useState('bekleme');
  const [tur, setTur] = useState(0);
  const [toplamSure, setToplamSure] = useState(0);
  const [fazSure, setFazSure] = useState(0);

  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const isRunning = useRef(false);
  const holdTimeoutRef = useRef(null);
  const fazIntervalRef = useRef(null);

  // Toplam süre sayacı
  useEffect(() => {
    let interval;
    if (aktif) {
      interval = setInterval(() => setToplamSure((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [aktif]);

  // Faz geri sayım
  useEffect(() => {
    if (fazIntervalRef.current) clearInterval(fazIntervalRef.current);
    if (faz !== 'bekleme' && aktif) {
      const teknik = teknikler[seciliTeknik];
      let totalMs;
      if (faz === 'nefesAl') totalMs = teknik.nefesAl;
      else if (faz === 'tut') totalMs = teknik.tut;
      else totalMs = teknik.nefesVer;

      let remaining = Math.ceil(totalMs / 1000);
      setFazSure(remaining);

      fazIntervalRef.current = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) clearInterval(fazIntervalRef.current);
        setFazSure(Math.max(0, remaining));
      }, 1000);
    }
    return () => {
      if (fazIntervalRef.current) clearInterval(fazIntervalRef.current);
    };
  }, [faz, aktif]);

  // Bekleme pulse animasyonu
  useEffect(() => {
    let pulseLoop;
    if (!aktif) {
      pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.start();
    } else {
      pulseAnim.setValue(1);
    }
    return () => {
      if (pulseLoop) pulseLoop.stop();
    };
  }, [aktif]);

  // Cleanup
  useEffect(() => {
    return () => {
      isRunning.current = false;
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
      if (fazIntervalRef.current) clearInterval(fazIntervalRef.current);
    };
  }, []);

  const runCycle = (teknikIdx) => {
    if (!isRunning.current) return;
    const teknik = teknikler[teknikIdx];

    // Nefes Al
    setFaz('nefesAl');
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: teknik.nefesAl,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0.9,
        duration: teknik.nefesAl,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished || !isRunning.current) return;

      // Tut
      setFaz('tut');
      holdTimeoutRef.current = setTimeout(() => {
        if (!isRunning.current) return;

        // Nefes Ver
        setFaz('nefesVer');
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.5,
            duration: teknik.nefesVer,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.3,
            duration: teknik.nefesVer,
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          if (!finished || !isRunning.current) return;
          setTur((t) => t + 1);
          runCycle(teknikIdx);
        });
      }, teknik.tut);
    });
  };

  const baslat = () => {
    isRunning.current = true;
    setAktif(true);
    setTur(0);
    setToplamSure(0);
    scaleAnim.setValue(0.5);
    glowAnim.setValue(0.3);
    runCycle(seciliTeknik);
  };

  const durdur = () => {
    isRunning.current = false;
    if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
    setAktif(false);
    setFaz('bekleme');
    setFazSure(0);
    scaleAnim.stopAnimation();
    glowAnim.stopAnimation();
    Animated.timing(scaleAnim, {
      toValue: 0.5,
      duration: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(glowAnim, {
      toValue: 0.3,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const formatSure = (sn) => {
    const dk = Math.floor(sn / 60);
    const s = sn % 60;
    return `${dk.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const teknik = teknikler[seciliTeknik];

  return (
    <View style={styles.container}>
      {/* Teknik Seçimi */}
      <View style={styles.teknikRow}>
        {teknikler.map((t, idx) => (
          <TouchableOpacity
            key={t.id}
            style={[styles.teknikChip, seciliTeknik === idx && styles.teknikChipActive]}
            onPress={() => { if (!aktif) setSeciliTeknik(idx); }}
            disabled={aktif}
          >
            <Text style={styles.teknikIcon}>{t.icon}</Text>
            <Text style={[styles.teknikText, seciliTeknik === idx && styles.teknikTextActive]}>
              {t.ad}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Açıklama */}
      <View style={styles.aciklamaContainer}>
        <Text style={styles.aciklama}>{teknik.aciklama}</Text>
      </View>

      {/* Animasyonlu Nefes Dairesi */}
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.circleWrapper,
            {
              transform: [{ scale: aktif ? scaleAnim : Animated.multiply(scaleAnim, pulseAnim) }],
            },
          ]}
        >
          <View style={[styles.glowCircle, { backgroundColor: fazGlowRenkleri[faz] }]} />
          <Animated.View style={[styles.mainCircle, { borderColor: fazRenkleri[faz], opacity: glowAnim }]}>
            <Text style={[styles.fazText, { color: fazRenkleri[faz] }]}>
              {fazMetinleri[faz]}
            </Text>
            {faz !== 'bekleme' ? (
              <Text style={[styles.fazSure, { color: fazRenkleri[faz] }]}>{fazSure} sn</Text>
            ) : null}
          </Animated.View>
        </Animated.View>
      </View>

      {/* Alt Metin */}
      <Text style={styles.altMetin}>{fazAltMetinleri[faz]}</Text>

      {/* Bilgi Kutuları */}
      <View style={styles.bilgiRow}>
        <View style={styles.bilgiKutu}>
          <Text style={styles.bilgiDeger}>{tur}</Text>
          <Text style={styles.bilgiEtiket}>Tur</Text>
        </View>
        <View style={styles.bilgiAyirici} />
        <View style={styles.bilgiKutu}>
          <Text style={styles.bilgiDeger}>{formatSure(toplamSure)}</Text>
          <Text style={styles.bilgiEtiket}>Süre</Text>
        </View>
      </View>

      {/* Kontrol Butonu */}
      <TouchableOpacity
        style={[styles.kontrolBtn, aktif && styles.kontrolBtnDurdur]}
        onPress={aktif ? durdur : baslat}
        activeOpacity={0.8}
      >
        <Text style={styles.kontrolBtnText}>
          {aktif ? '⏹  DURDUR' : '▶  BAŞLAT'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  teknikRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 16,
    gap: 8,
  },
  teknikChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 4,
  },
  teknikChipActive: {
    backgroundColor: colors.white,
  },
  teknikIcon: {
    fontSize: 16,
  },
  teknikText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },
  teknikTextActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  aciklamaContainer: {
    paddingHorizontal: 24,
    marginTop: 12,
  },
  aciklama: {
    fontSize: 13,
    color: colors.primaryLight,
    textAlign: 'center',
    lineHeight: 19,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 280,
    marginTop: 10,
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 260,
    height: 260,
  },
  glowCircle: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
  },
  mainCircle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  fazText: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  fazSure: {
    fontSize: 36,
    fontWeight: '300',
    marginTop: 4,
  },
  altMetin: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    fontStyle: 'italic',
  },
  bilgiRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 20,
    alignItems: 'center',
  },
  bilgiKutu: {
    alignItems: 'center',
    minWidth: 80,
  },
  bilgiAyirici: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 24,
  },
  bilgiDeger: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  bilgiEtiket: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  kontrolBtn: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  kontrolBtnDurdur: {
    backgroundColor: '#E74C3C',
  },
  kontrolBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 1,
  },
});
