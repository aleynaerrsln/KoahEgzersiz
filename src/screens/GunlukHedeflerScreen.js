import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../constants/colors';

export default function GunlukHedeflerScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Başlık ve Görsel */}
      <View style={styles.headerCard}>
        <Text style={styles.headerEmoji}>🥗</Text>
        <Text style={styles.headerTitle}>Günlük Hedefler</Text>
      </View>

      {/* Kan Şekeri Hedefleri */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gebelikte Hedeflenen kan şekeri değerleri</Text>
        <Text style={styles.bodyText}>
          Açlık kan şekerlerinin ≤95mg/dl ve{'\n'}
          Tokluk kan şekerinin;{'\n'}
          {'   '}1. saatte ≤140mg/dl,{'\n'}
          {'   '}2. saatte ≤120mg/dl olması hedeflenir{'\n\n'}
          Gün içerisinde hiçbir ölçüm <Text style={styles.boldText}>60 mg/dl altında olmamalı</Text>{'\n\n'}
          HbA1c ≤%6,5 (tercihen ≤%6,0){'\n\n'}
          Haftada 3 gün sabah, öğle, akşam açlık kan şekerinize; yemeklerden 1 saat sonra tokluk kan şekerinize bakınız.{'\n\n'}
          Tokluk kan şekerlerine yemeğin ilk lokmasından 1 saat sonra bakılır !!!!
        </Text>
      </View>

      {/* Beslenme */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.danger }]}>BESLENME</Text>
        <Text style={styles.bodyText}>
          Gebelik boyunca almanız gereken ideal kilo alımı; 12,5-18 kg' dır.{'\n\n'}
          Bir gün boyunca almanız gereken kalori 2200 kcal
        </Text>
      </View>

      {/* Egzersiz */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.danger }]}>EGZERSİZ</Text>
        <Text style={styles.bodyText}>
          Hekimin gebeye egzersiz yapma konusunda bir sakıncası olmadığı takdirde gebelerin haftada en az 3 gün en az 20-30 dakikalık hafif – orta yoğunlukta düzenli egzersiz yapması önerilmektedir.{'\n\n'}
          Gebeler için düzenli yapılabilen ve en uygun egzersiz tempolu yürüyüştür.
        </Text>
      </View>

      {/* Açıklama */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.danger }]}>AÇIKLAMA</Text>
        <Text style={styles.bodyText}>
          Her gün mutlaka 2,5-3 litre su tüketmeye özen gösteriniz.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingBottom: 30,
  },
  headerCard: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingVertical: 24,
  },
  headerEmoji: {
    fontSize: 70,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
