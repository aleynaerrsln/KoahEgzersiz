import { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Easing, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from './src/constants/colors';

import AnasayfaScreen from './src/screens/AnasayfaScreen';
import FormlarScreen from './src/screens/FormlarScreen';
import GunlukHedeflerScreen from './src/screens/GunlukHedeflerScreen';
import KanSekeriIzlemScreen from './src/screens/KanSekeriIzlemScreen';
import FizikselAktivitelerimScreen from './src/screens/FizikselAktivitelerimScreen';
import BeslenmeEklemeScreen from './src/screens/BeslenmeEklemeScreen';
import EgitimlerScreen from './src/screens/EgitimlerScreen';
import SSSScreen from './src/screens/SSSScreen';
import BildirimlerScreen from './src/screens/BildirimlerScreen';
import AnketScreen from './src/screens/AnketScreen';
import IlacHatirlaticiScreen from './src/screens/IlacHatirlaticiScreen';
import NefesEgzersiziScreen from './src/screens/NefesEgzersiziScreen';
import BMIHesaplayiciScreen from './src/screens/BMIHesaplayiciScreen';
import GirisScreen from './src/screens/GirisScreen';
import KayitOlScreen from './src/screens/KayitOlScreen';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

function FloatingParticle({ delay, startX, startY, size, emoji }) {
  const floatY = useRef(new Animated.Value(0)).current;
  const floatX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0.6,
        duration: 600,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(floatY, {
            toValue: -20,
            duration: 2000 + Math.random() * 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(floatY, {
            toValue: 20,
            duration: 2000 + Math.random() * 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(floatX, {
            toValue: 15,
            duration: 2500 + Math.random() * 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(floatX, {
            toValue: -15,
            duration: 2500 + Math.random() * 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: startX,
        top: startY,
        opacity,
        transform: [{ translateY: floatY }, { translateX: floatX }],
      }}
    >
      <Text style={{ fontSize: size }}>{emoji}</Text>
    </Animated.View>
  );
}

function SplashScreen({ onFinish }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mainScale = useRef(new Animated.Value(0.1)).current;
  const ring1 = useRef(new Animated.Value(0.5)).current;
  const ring2 = useRef(new Animated.Value(0.5)).current;
  const ring3 = useRef(new Animated.Value(0.5)).current;
  const ring1Opacity = useRef(new Animated.Value(0)).current;
  const ring2Opacity = useRef(new Animated.Value(0)).current;
  const ring3Opacity = useRef(new Animated.Value(0)).current;
  const heartbeat = useRef(new Animated.Value(1)).current;
  const titleSlide = useRef(new Animated.Value(50)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleSlide = useRef(new Animated.Value(30)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const bottomOpacity = useRef(new Animated.Value(0)).current;
  const dotScale1 = useRef(new Animated.Value(0)).current;
  const dotScale2 = useRef(new Animated.Value(0)).current;
  const dotScale3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Ana ikon giriş
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Ana ikon bounce
    Animated.spring(mainScale, {
      toValue: 1,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();

    // Halka animasyonları - sırayla açılma
    Animated.stagger(200, [
      Animated.parallel([
        Animated.spring(ring1, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }),
        Animated.timing(ring1Opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.spring(ring2, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }),
        Animated.timing(ring2Opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.spring(ring3, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }),
        Animated.timing(ring3Opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();

    // Kalp atışı animasyonu
    const heartbeatAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(heartbeat, {
          toValue: 1.15,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(heartbeat, {
          toValue: 1,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(heartbeat, {
          toValue: 1.1,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(heartbeat, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    setTimeout(() => heartbeatAnim.start(), 600);

    // Başlık animasyonu
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(titleSlide, {
          toValue: 0,
          duration: 700,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 400);

    // Alt başlık animasyonu
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(subtitleSlide, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 700);

    // Yükleniyor noktaları
    setTimeout(() => {
      Animated.timing(bottomOpacity, { toValue: 1, duration: 400, useNativeDriver: true }).start();
      Animated.loop(
        Animated.stagger(200, [
          Animated.sequence([
            Animated.timing(dotScale1, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(dotScale1, { toValue: 0.4, duration: 300, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(dotScale2, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(dotScale2, { toValue: 0.4, duration: 300, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(dotScale3, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(dotScale3, { toValue: 0.4, duration: 300, useNativeDriver: true }),
          ]),
        ])
      ).start();
    }, 1000);

    // Çıkış
    const exitTimer = setTimeout(() => {
      heartbeatAnim.stop();
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 600, easing: Easing.in(Easing.ease), useNativeDriver: true }),
        Animated.timing(mainScale, { toValue: 1.5, duration: 600, useNativeDriver: true }),
      ]).start(() => onFinish());
    }, 3200);

    return () => {
      clearTimeout(exitTimer);
      heartbeatAnim.stop();
    };
  }, []);

  const particles = [
    { delay: 300, startX: SCREEN_WIDTH * 0.1, startY: SCREEN_HEIGHT * 0.15, size: 22, emoji: '💕' },
    { delay: 500, startX: SCREEN_WIDTH * 0.75, startY: SCREEN_HEIGHT * 0.12, size: 18, emoji: '✨' },
    { delay: 700, startX: SCREEN_WIDTH * 0.05, startY: SCREEN_HEIGHT * 0.65, size: 20, emoji: '🌸' },
    { delay: 400, startX: SCREEN_WIDTH * 0.8, startY: SCREEN_HEIGHT * 0.6, size: 16, emoji: '💫' },
    { delay: 600, startX: SCREEN_WIDTH * 0.6, startY: SCREEN_HEIGHT * 0.2, size: 14, emoji: '🩷' },
    { delay: 800, startX: SCREEN_WIDTH * 0.15, startY: SCREEN_HEIGHT * 0.4, size: 16, emoji: '🌟' },
    { delay: 350, startX: SCREEN_WIDTH * 0.85, startY: SCREEN_HEIGHT * 0.4, size: 18, emoji: '🦋' },
  ];

  return (
    <Animated.View style={[splashStyles.container, { opacity: fadeAnim }]}>
      <StatusBar style="light" />

      {/* Yüzen parçacıklar */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Dekoratif arka plan daireleri */}
      <View style={splashStyles.bgCircle1} />
      <View style={splashStyles.bgCircle2} />
      <View style={splashStyles.bgCircle3} />

      {/* Ana ikon alanı */}
      <View style={splashStyles.iconArea}>
        {/* Yayılan halkalar */}
        <Animated.View style={[splashStyles.ring, splashStyles.ring3, {
          transform: [{ scale: ring3 }],
          opacity: Animated.multiply(ring3Opacity, 0.15),
        }]} />
        <Animated.View style={[splashStyles.ring, splashStyles.ring2, {
          transform: [{ scale: ring2 }],
          opacity: Animated.multiply(ring2Opacity, 0.25),
        }]} />
        <Animated.View style={[splashStyles.ring, splashStyles.ring1Style, {
          transform: [{ scale: ring1 }],
          opacity: Animated.multiply(ring1Opacity, 0.4),
        }]} />

        {/* Ana hamilelik ikonu */}
        <Animated.View style={[splashStyles.mainIconContainer, {
          transform: [{ scale: Animated.multiply(mainScale, heartbeat) }],
        }]}>
          <View style={splashStyles.iconGlow} />
          <View style={splashStyles.iconInner}>
            <Text style={splashStyles.mainEmoji}>🫄</Text>
          </View>
          <View style={splashStyles.heartBadge}>
            <Text style={splashStyles.heartEmoji}>💗</Text>
          </View>
        </Animated.View>
      </View>

      {/* Başlık */}
      <Animated.View style={{
        transform: [{ translateY: titleSlide }],
        opacity: titleOpacity,
        alignItems: 'center',
      }}>
        <Text style={splashStyles.title}>Gebelik Sağlık</Text>
        <Text style={splashStyles.titleAccent}>Takip</Text>
      </Animated.View>

      {/* Alt başlık */}
      <Animated.View style={{
        transform: [{ translateY: subtitleSlide }],
        opacity: subtitleOpacity,
        alignItems: 'center',
        marginTop: 12,
      }}>
        <View style={splashStyles.subtitleLine} />
        <Text style={splashStyles.subtitle}>Sağlıklı Anne, Sağlıklı Bebek</Text>
      </Animated.View>

      {/* Alt kısım */}
      <Animated.View style={[splashStyles.bottomContainer, { opacity: bottomOpacity }]}>
        <View style={splashStyles.loadingDots}>
          <Animated.View style={[splashStyles.dot, { transform: [{ scale: dotScale1 }] }]} />
          <Animated.View style={[splashStyles.dot, { transform: [{ scale: dotScale2 }] }]} />
          <Animated.View style={[splashStyles.dot, { transform: [{ scale: dotScale3 }] }]} />
        </View>
        <Text style={splashStyles.bottomText}>Gebelik Sağlık Takip ve Egzersiz</Text>
        <Text style={splashStyles.versionText}>v1.0</Text>
      </Animated.View>
    </Animated.View>
  );
}

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8577D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Arka plan dekoratif daireleri
  bgCircle1: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  bgCircle2: {
    position: 'absolute',
    bottom: -40,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  bgCircle3: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.35,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  // Ikon alanı
  iconArea: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  ring1Style: {
    width: 140,
    height: 140,
  },
  ring2: {
    width: 180,
    height: 180,
  },
  ring3: {
    width: 220,
    height: 220,
  },
  mainIconContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  iconInner: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  mainEmoji: {
    fontSize: 50,
  },
  heartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#C9445F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  heartEmoji: {
    fontSize: 14,
  },
  // Başlık
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
  titleAccent: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFF5E6',
    textAlign: 'center',
    letterSpacing: 3,
    marginTop: -2,
  },
  subtitleLine: {
    width: 50,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 1,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  // Alt kısım
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  bottomText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  versionText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.3)',
    marginTop: 4,
  },
});

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Giris"
          component={GirisScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KayitOl"
          component={KayitOlScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Anasayfa"
          component={AnasayfaScreen}
          options={({ navigation }) => ({
            title: 'Anasayfa',
            headerBackVisible: false,
            headerRight: () => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 18,
                }}
                onPress={() => {
                  Alert.alert(
                    'Çıkış Yap',
                    'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
                    [
                      { text: 'İptal', style: 'cancel' },
                      {
                        text: 'Çıkış Yap',
                        style: 'destructive',
                        onPress: () => {
                          navigation.reset({
                            index: 0,
                            routes: [{ name: 'Giris' }],
                          });
                        },
                      },
                    ]
                  );
                }}
              >
                <Text style={{ fontSize: 16, marginRight: 4 }}>👤</Text>
                <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '600' }}>Çıkış</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Formlar"
          component={FormlarScreen}
          options={{ title: 'Formlar' }}
        />
        <Stack.Screen
          name="GunlukHedefler"
          component={GunlukHedeflerScreen}
          options={{ title: 'Günlük Hedefler' }}
        />
        <Stack.Screen
          name="KanSekeriIzlem"
          component={KanSekeriIzlemScreen}
          options={{ title: 'Kan Şekeri İzlemlerim' }}
        />
        <Stack.Screen
          name="FizikselAktivitelerim"
          component={FizikselAktivitelerimScreen}
          options={{ title: 'Fiziksel Aktivitelerim' }}
        />
        <Stack.Screen
          name="BeslenmeEkleme"
          component={BeslenmeEklemeScreen}
          options={{ title: 'Beslenme Ekleme Formu' }}
        />
        <Stack.Screen
          name="Egitimler"
          component={EgitimlerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SSS"
          component={SSSScreen}
          options={{ title: 'Sıkça Sorulan Sorular' }}
        />
        <Stack.Screen
          name="Bildirimler"
          component={BildirimlerScreen}
          options={{ title: 'Bildirimler' }}
        />
        <Stack.Screen
          name="Anket"
          component={AnketScreen}
          options={{ title: 'Anket' }}
        />
        <Stack.Screen
          name="IlacHatirlatici"
          component={IlacHatirlaticiScreen}
          options={{ title: 'İlaç Hatırlatıcı' }}
        />
        <Stack.Screen
          name="NefesEgzersizi"
          component={NefesEgzersiziScreen}
          options={{ title: 'Nefes Egzersizi' }}
        />
        <Stack.Screen
          name="BMIHesaplayici"
          component={BMIHesaplayiciScreen}
          options={{ title: 'BMI Hesaplayıcı' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
