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
} from 'react-native';
import colors from '../constants/colors';

export default function GirisScreen({ navigation }) {
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [sifre, setSifre] = useState('');
  const [sifreGizli, setSifreGizli] = useState(true);

  const girisYap = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Anasayfa', params: { kullaniciAdi: kullaniciAdi || 'Kullanıcı' } }],
    });
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
        {/* Üst Kısım - İllüstrasyon */}
        <View style={styles.ustKisim}>
          <Text style={styles.illustration}>🤰</Text>
        </View>

        {/* Alt Kısım - Form */}
        <View style={styles.formCard}>
          <Text style={styles.girisBaslik}>Giriş</Text>
          <View style={styles.baslikCizgi} />

          {/* Kullanıcı Adı */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>👤</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
              <TextInput
                style={styles.input}
                value={kullaniciAdi}
                onChangeText={setKullaniciAdi}
                placeholder="Kullanıcı adınızı giriniz"
                placeholderTextColor="#CCC"
              />
            </View>
          </View>

          {/* Şifre */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🔑</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Şifre</Text>
              <View style={styles.sifreRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={sifre}
                  onChangeText={setSifre}
                  placeholder="Şifrenizi giriniz"
                  placeholderTextColor="#CCC"
                  secureTextEntry={sifreGizli}
                />
                <TouchableOpacity
                  style={styles.gozBtn}
                  onPress={() => setSifreGizli(!sifreGizli)}
                >
                  <Text style={styles.gozIcon}>{sifreGizli ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Giriş Butonu */}
          <TouchableOpacity style={styles.girisBtn} onPress={girisYap} activeOpacity={0.8}>
            <Text style={styles.girisBtnText}>GİRİŞ</Text>
          </TouchableOpacity>
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
  },
  ustKisim: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 280,
    paddingTop: 40,
  },
  illustration: {
    fontSize: 120,
  },
  formCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 40,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  girisBaslik: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
  },
  baslikCizgi: {
    width: 50,
    height: 3,
    backgroundColor: colors.primary,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 22,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 13,
    color: colors.gray,
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    fontSize: 16,
    color: colors.text,
    paddingVertical: 8,
  },
  sifreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gozBtn: {
    padding: 8,
    marginLeft: 4,
  },
  gozIcon: {
    fontSize: 18,
  },
  girisBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  girisBtnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
