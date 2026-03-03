import { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';
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

const Stack = createNativeStackNavigator();

function SplashScreen({ onFinish }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Giriş animasyonu
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animasyonu
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    // Çıkış animasyonu
    const timer = setTimeout(() => {
      pulse.stop();
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 2800);

    return () => {
      clearTimeout(timer);
      pulse.stop();
    };
  }, []);

  return (
    <Animated.View style={[splashStyles.container, { opacity: fadeAnim }]}>
      <StatusBar style="light" />
      <Animated.View style={{ transform: [{ scale: Animated.multiply(scaleAnim, pulseAnim) }] }}>
        <Text style={splashStyles.icon}>🫁</Text>
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: slideAnim }], opacity: fadeAnim }}>
        <Text style={splashStyles.title}>KOAH Egzersiz</Text>
        <Text style={splashStyles.subtitle}>Sağlıklı Nefes, Sağlıklı Yaşam</Text>
      </Animated.View>
      <Animated.View style={[splashStyles.bottomContainer, { opacity: fadeAnim }]}>
        <View style={splashStyles.line} />
        <Text style={splashStyles.bottomText}>Kronik Obstrüktif Akciğer Hastalığı</Text>
        <Text style={splashStyles.bottomText}>Egzersiz ve Takip Uygulaması</Text>
      </Animated.View>
    </Animated.View>
  );
}

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 15,
    color: colors.primaryLight,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  line: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 16,
  },
  bottomText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    lineHeight: 18,
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
          name="Anasayfa"
          component={AnasayfaScreen}
          options={{ title: 'Anasayfa' }}
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
