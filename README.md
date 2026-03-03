# SaglikTakip - Gebelikte Saglik Takip Uygulamasi

**Ogrenci:** Aleyna Erarslan
**Okul Numarasi:** 231118098
**Universite:** Samsun Universitesi

---

## Proje Hakkinda

SaglikTakip, gebelik surecindeki annelerin saglik verilerini kolayca takip edebilmeleri icin gelistirilmis bir mobil saglik uygulamasidir. Uygulama, kullanicilarin kan sekeri, beslenme, fiziksel aktivite gibi saglik verilerini kaydetmesine, BMI hesaplamasi yapmasina, nefes egzersizleri uygulamasina ve gunluk saglik hedeflerini takip etmesine olanak tanir.

## Hedef Kullanici Kitlesi

- Gebelik surecindeki anneler
- Saglik verilerini duzenli takip etmek isteyen gebeler
- Doktorlariyla saglik verilerini paylasarak daha iyi takip edilmek isteyen hastalar

## Cozulmek Istenen Problem

Gebelik surecinde annelerin kan sekeri, kilo, beslenme ve fiziksel aktivite gibi bircok parametreyi duzenli takip etmesi gerekmektedir. Bu verilerin kagit uzerinde veya farkli uygulamalarda dagitik olarak tutulmasi hem zahmetli hem de takibi zorlastirmaktadir. SaglikTakip, tum bu verileri tek bir uygulamada toplayarak gebelik surecini daha kolay ve duzenli yonetmeyi amaclar.

## APK Indirme

[**Android APK Indir - EAS Build (Onerilen)**](https://github.com/aleynaerrsln/SaglikTakip/releases/tag/v1.0.0)

[**Android APK Indir - Android Studio (Debug)**](https://github.com/aleynaerrsln/SaglikTakip/releases/tag/v1.0.0-debug)

> APK dosyasini telefonunuza indirdikten sonra "Bilinmeyen kaynaklardan yukleme" iznini vererek kurabilirsiniz.

## Demo Video

[**Uygulama Tanitim Videosu (YouTube)**](https://youtube.com/shorts/I6ccyeAWyjk?si=3vtymYwezDu9mNP6)

## Uygulama Ozellikleri

| Ozellik | Aciklama |
|---------|----------|
| Giris & Kayit Ol | Kullanici girisi ve yeni hesap olusturma |
| Anasayfa | Zamana gore selamlama, gunun motivasyon mesaji, kategorize menu |
| Kan Sekeri Izlem | Kan sekeri degerlerini kaydetme ve takip etme |
| Fiziksel Aktivite | Gunluk aktivite ve egzersiz kaydi |
| Beslenme Degerlendirme | Ogun ve besin alimi takibi |
| BMI Hesaplayici | Vucud kitle indeksi hesaplama ve gebelik tavsiyeleri |
| Ilac Hatirlatici | Ilac kullanim hatirlatmalari |
| Nefes Egzersizi | Rehberli nefes egzersizleri |
| Gunluk Hedefler | Gunluk saglik hedefleri belirleme ve takip |
| Egitimler | Saglik egitim icerikleri |
| SSS | Sikca sorulan sorular |
| Anket | Saglik degerlendirme anketi |
| Bildirimler | Uygulama bildirimleri |

## Ekran Goruntuleri

Uygulama **Soft Rose** temasinda tasarlanmistir:
- Ana renk: `#E8577D` (Soft Rose)
- Arka plan: `#FDE8EC` (Toz Pembe)
- Vurgu renk: `#FFF5E6` (Krem)

## Kurulum & Calistirma

### Gereksinimler

- [Node.js](https://nodejs.org/) (v18 veya ustu)
- [npm](https://www.npmjs.com/) veya [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Android Studio (APK build icin)

### Adimlar

1. **Projeyi klonlayin:**
   ```bash
   git clone https://github.com/aleynaerrsln/SaglikTakip.git
   cd SaglikTakip
   ```

2. **Bagimliliklari yukleyin:**
   ```bash
   npm install
   ```

3. **Uygulamayi baslatin:**
   ```bash
   npx expo start
   ```

4. **Android APK build (opsiyonel):**
   ```bash
   npx expo prebuild --platform android
   ```
   Ardindan `android/` klasorunu Android Studio ile acip **Build > Generate App Bundles or APKs > Build APK(s)** secerek APK olusturabilirsiniz.

## Kullanilan Teknolojiler

| Teknoloji | Versiyon | Aciklama |
|-----------|----------|----------|
| React Native | 0.81.5 | Mobil uygulama gelistirme framework'u |
| Expo | SDK 54 | React Native gelistirme platformu |
| React | 19.1.0 | UI kutuphanesi |
| React Navigation | v7 | Ekranlar arasi gecis yonetimi |
| AsyncStorage | 2.2.0 | Yerel veri depolama |
| React Native Screens | 4.16.0 | Native ekran yonetimi |
| React Native Safe Area Context | 5.6.0 | Guvenli alan yonetimi |

## Proje Yapisi

```
SaglikTakip/
├── App.js                          # Ana uygulama ve navigasyon yapisi
├── app.json                        # Expo yapilandirmasi
├── package.json                    # Proje bagimliliklari
├── assets/                         # Gorseller ve ikonlar
│   ├── icon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
└── src/
    ├── constants/
    │   └── colors.js               # Tema renk paleti
    └── screens/
        ├── GirisScreen.js          # Giris ekrani
        ├── KayitOlScreen.js        # Kayit ekrani
        ├── AnasayfaScreen.js       # Ana sayfa
        ├── FormlarScreen.js        # Formlar listesi
        ├── KanSekeriIzlemScreen.js # Kan sekeri takibi
        ├── FizikselAktivitelerimScreen.js # Fiziksel aktivite
        ├── BeslenmeEklemeScreen.js # Beslenme takibi
        ├── BMIHesaplayiciScreen.js # BMI hesaplayici
        ├── IlacHatirlaticiScreen.js # Ilac hatirlatici
        ├── NefesEgzersiziScreen.js # Nefes egzersizi
        ├── GunlukHedeflerScreen.js # Gunluk hedefler
        ├── EgitimlerScreen.js      # Egitim icerikleri
        ├── SSSScreen.js            # Sikca sorulan sorular
        ├── AnketScreen.js          # Saglik anketi
        └── BildirimlerScreen.js    # Bildirimler
```

## Tasarim Ilhami

Uygulama, modern ve ferah bir tasarim anlayisiyla gelistirilmistir. Soft Rose renk paleti, gebelik temasina uygun sicak ve huzur verici bir deneyim sunmayi hedefler. Dekoratif arka plan daireleri, cam efektli kartlar ve kategorize edilmis menu yapisi ile kullanici dostu bir arayuz olusturulmustur.

---

**Samsun Universitesi - Mobil Programlama Dersi Odev Projesi**
