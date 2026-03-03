import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function GirisScreen({ navigation }) {
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [sifre, setSifre] = useState('');
  const [sifreGizli, setSifreGizli] = useState(true);

  const girisYap = async () => {
    if (!kullaniciAdi.trim() || !sifre.trim()) {
      Alert.alert('Uyarı', 'Kullanıcı adı ve şifre giriniz.');
      return;
    }

    try {
      const kayitliKullanici = await AsyncStorage.getItem('kayitliKullanici');
      if (kayitliKullanici) {
        const kullanici = JSON.parse(kayitliKullanici);
        if (kullanici.kullaniciAdi === kullaniciAdi && kullanici.sifre === sifre) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Anasayfa', params: { kullaniciAdi: kullanici.adSoyad || kullaniciAdi } }],
          });
          return;
        } else {
          Alert.alert('Hata', 'Kullanıcı adı veya şifre yanlış.');
          return;
        }
      } else {
        Alert.alert('Hata', 'Kayıtlı kullanıcı bulunamadı. Lütfen önce kayıt olunuz.');
      }
    } catch (e) {
      Alert.alert('Hata', 'Bir sorun oluştu.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Dekoratif arka plan */}
        <View style={styles.bgCircle1} />
        <View style={styles.bgCircle2} />
        <View style={styles.bgCircle3} />

        {/* Üst boşluk + ikon */}
        <View style={styles.headerArea}>
          <View style={styles.iconRingOuter}>
            <View style={styles.iconRingInner}>
              <Text style={styles.headerEmoji}>🫄</Text>
            </View>
          </View>
          <Text style={styles.appName}>Gebelik Sağlık Takip</Text>
          <Text style={styles.appDesc}>Sağlıklı Anne, Sağlıklı Bebek</Text>
        </View>

        {/* Form alanı */}
        <View style={styles.formArea}>
          <Text style={styles.formTitle}>Hoş Geldiniz</Text>
          <Text style={styles.formSubtitle}>Hesabınıza giriş yapın</Text>

          {/* Kullanıcı Adı */}
          <View style={styles.inputBox}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              value={kullaniciAdi}
              onChangeText={setKullaniciAdi}
              placeholder="Kullanıcı Adı"
              placeholderTextColor="rgba(255,255,255,0.5)"
              autoCapitalize="none"
            />
          </View>

          {/* Şifre */}
          <View style={styles.inputBox}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={sifre}
              onChangeText={setSifre}
              placeholder="Şifre"
              placeholderTextColor="rgba(255,255,255,0.5)"
              secureTextEntry={sifreGizli}
            />
            <TouchableOpacity
              style={styles.gozBtn}
              onPress={() => setSifreGizli(!sifreGizli)}
            >
              <Text style={styles.gozIcon}>{sifreGizli ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>

          {/* Giriş Butonu */}
          <TouchableOpacity style={styles.girisBtn} onPress={girisYap} activeOpacity={0.85}>
            <Text style={styles.girisBtnText}>GİRİŞ YAP</Text>
          </TouchableOpacity>

          {/* Ayırıcı */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>veya</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Kayıt Ol */}
          <TouchableOpacity
            style={styles.kayitBtn}
            onPress={() => navigation.navigate('KayitOl')}
            activeOpacity={0.85}
          >
            <Text style={styles.kayitBtnText}>YENİ HESAP OLUŞTUR</Text>
          </TouchableOpacity>
        </View>

        {/* Alt yazı */}
        <View style={styles.bottomArea}>
          <View style={styles.bottomLine} />
          <Text style={styles.bottomText}>Gebelik Sağlık Takip ve Egzersiz Uygulaması</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  // Dekoratif arka plan daireleri
  bgCircle1: {
    position: 'absolute',
    top: -60,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  bgCircle2: {
    position: 'absolute',
    top: 200,
    left: -70,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  bgCircle3: {
    position: 'absolute',
    bottom: 100,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  // Üst ikon alanı
  headerArea: {
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 30,
  },
  iconRingOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconRingInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  headerEmoji: {
    fontSize: 45,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  appDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    fontStyle: 'italic',
  },
  // Form alanı
  formArea: {
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 28,
  },
  // Input kutuları - saydam
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    paddingVertical: 14,
  },
  gozBtn: {
    padding: 8,
    marginLeft: 4,
  },
  gozIcon: {
    fontSize: 18,
  },
  // Giriş butonu - krem/beyaz
  girisBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  girisBtnText: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  // Ayırıcı
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    marginHorizontal: 14,
  },
  // Kayıt ol butonu - saydam
  kayitBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  kayitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  // Alt yazı
  bottomArea: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 30,
    paddingBottom: 10,
  },
  bottomLine: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 1,
    marginBottom: 10,
  },
  bottomText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
  },
});
