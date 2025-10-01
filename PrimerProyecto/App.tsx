/*
README
------
Proyecto: Demo de Componentes Nativos - React Native + TypeScript
Objetivo: Un solo archivo (App.tsx) que muestra ejemplos en vivo de los
componentes nativos más usados en React Native junto con una breve
explicación de para qué se usa cada uno.

Cómo usar:
1. Crea un proyecto con Expo + TypeScript:
   expo init DemoComponentesTS --template expo-template-blank-typescript
2. Reemplaza el contenido de App.tsx por este archivo.
3. Dentro del proyecto ejecuta: expo start
4. Abre en iOS / Android / Expo Go.

Nota: Este archivo evita dependencias extras; algunos componentes (Picker,
Slider avanzados) requieren librerías externas si querés versiones más
completas.
*/

import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Image,
  Switch,
  ActivityIndicator,
  FlatList,
  SectionList,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  RefreshControl,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');

type DemoItem = { key: string; title: string };

export default function App(): JSX.Element {
  const [text, setText] = useState('');
  const [isOn, setIsOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const data: DemoItem[] = [
    { key: '1', title: 'Elemento 1' },
    { key: '2', title: 'Elemento 2' },
    { key: '3', title: 'Elemento 3' },
    { key: '4', title: 'Elemento 4' },
  ];

  const sections = [
    { title: 'Frutas', data: ['Manzana', 'Banana', 'Naranja'] },
    { title: 'Verduras', data: ['Lechuga', 'Tomate', 'Zanahoria'] },
  ];

  function onPressButton() {
    Alert.alert('Botón', 'Presionaste el botón nativo');
  }

  function onRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }

  function startAnimation() {
    anim.setValue(0);
    Animated.timing(anim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  }

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >

          <Text style={styles.header}>Demo de Componentes Nativos (TypeScript)</Text>

          {/* Card: View + Text */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>View / Text</Text>
            <Text style={styles.cardText}>
              View es el contenedor básico. Text renderiza texto. Ambos son la base de toda UI.
            </Text>
            <View style={styles.row}>
              <View style={styles.box} />
              <View style={[styles.box, { backgroundColor: '#8ecae6' }]} />
              <View style={[styles.box, { backgroundColor: '#219ebc' }]} />
            </View>
          </View>

          {/* TextInput */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>TextInput</Text>
            <Text style={styles.cardText}>Permite ingresar texto. Ideal para formularios.</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribí algo..."
              value={text}
              onChangeText={setText}
            />
            <Text style={styles.small}>Ingresaste: {text || '<vacío>'}</Text>
          </View>

          {/* Button, TouchableOpacity, Pressable */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Button / TouchableOpacity / Pressable</Text>
            <Text style={styles.cardText}>
              Button es simple y nativo. TouchableOpacity y Pressable permiten personalizar el estilo y
              comportamientos al presionar.
            </Text>
            <Button title="Botón nativo" onPress={onPressButton} />

            <TouchableOpacity style={styles.touch} onPress={() => Alert.alert('TOUCH', 'TouchableOpacity')}>
              <Text style={{ color: '#fff' }}>TouchableOpacity</Text>
            </TouchableOpacity>

            <Pressable
              style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.6 }]}
              onPress={() => Alert.alert('PRESSABLE', 'Pressable usado')}
            >
              <Text style={{ color: '#fff' }}>Pressable</Text>
            </Pressable>
          </View>

          {/* Image */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Image</Text>
            <Text style={styles.cardText}>Muestra imágenes desde URI o assets locales.</Text>
            <Image
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              style={{ width: 80, height: 80, marginTop: 8 }}
              resizeMode="contain"
            />
          </View>

          {/* Switch */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Switch</Text>
            <Text style={styles.cardText}>Control booleano (on/off). Usado en ajustes y toggles.</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Switch value={isOn} onValueChange={setIsOn} />
              <Text style={styles.small}>{isOn ? 'Encendido' : 'Apagado'}</Text>
            </View>
          </View>

          {/* ActivityIndicator */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>ActivityIndicator</Text>
            <Text style={styles.cardText}>Indicador de carga en pantalla.</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <ActivityIndicator size="small" animating={true} />
              <ActivityIndicator size="large" animating={true} />
            </View>
          </View>

          {/* FlatList */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>FlatList</Text>
            <Text style={styles.cardText}>Lista optimizada para elementos largos/infinitos.</Text>
            <FlatList
              data={data}
              keyExtractor={(item) => item.key}
              horizontal
              style={{ marginTop: 8 }}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text>{item.title}</Text>
                </View>
              )}
            />
          </View>

          {/* SectionList */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>SectionList</Text>
            <Text style={styles.cardText}>Lista con secciones y cabeceras.</Text>
            <SectionList
              sections={sections}
              keyExtractor={(item, i) => `${item}-${i}`}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={{ fontWeight: '700', marginTop: 6 }}>{title}</Text>
              )}
              renderItem={({ item }) => <Text style={{ paddingLeft: 6 }}>{item}</Text>}
            />
          </View>

          {/* Modal */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Modal</Text>
            <Text style={styles.cardText}>Componente para mostrar contenido sobreelevado.</Text>
            <Button title="Abrir Modal" onPress={() => setModalVisible(true)} />
            <Modal visible={modalVisible} animationType="slide" transparent>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={{ fontSize: 18, fontWeight: '700' }}>Este es un Modal</Text>
                  <Text style={{ marginVertical: 10 }}>Podés incluir formularios, imágenes, etc.</Text>
                  <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                </View>
              </View>
            </Modal>
          </View>

          {/* KeyboardAvoidingView note shown via surrounding wrapper */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>KeyboardAvoidingView</Text>
            <Text style={styles.cardText}>
              Util para evitar que el teclado tape inputs en iOS/Android. Este demo usa el wrapper
              general (ver arriba).
            </Text>
          </View>

          {/* Animated */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Animated</Text>
            <Text style={styles.cardText}>Animaciones usando la API Animated.</Text>
            <Animated.View style={[styles.animatedBox, { transform: [{ scale }] }]} />
            <View style={{ flexDirection: 'row', marginTop: 8, gap: 8 }}>
              <Button title="Animar" onPress={startAnimation} />
            </View>
          </View>

          {/* Platform specific / Dimensions */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Platform / Dimensions</Text>
            <Text style={styles.cardText}>
              Podés condicionar código según Platform.OS y usar Dimensions para adaptar layout.
            </Text>
            <Text style={styles.small}>Ancho de pantalla: {Math.round(width)} px</Text>
            <Text style={styles.small}>Plataforma: {Platform.OS}</Text>
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f9fc' },
  container: { padding: 16, paddingBottom: 40 },
  header: { fontSize: 22, fontWeight: '800', marginBottom: 12, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardText: { marginTop: 6, fontSize: 13, color: '#333' },
  row: { flexDirection: 'row', gap: 8, marginTop: 8 },
  box: { width: 40, height: 40, backgroundColor: '#ffd166', borderRadius: 6 },
  input: { borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 8, padding: 8, marginTop: 8 },
  small: { marginTop: 6, fontSize: 12, color: '#666' },
  touch: { marginTop: 8, backgroundColor: '#fb8500', padding: 10, borderRadius: 8, alignItems: 'center' },
  pressable: { marginTop: 8, backgroundColor: '#0077b6', padding: 10, borderRadius: 8, alignItems: 'center' },
  listItem: { backgroundColor: '#f1f1f1', padding: 12, marginRight: 8, borderRadius: 8 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { width: width - 40, backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  animatedBox: { width: 60, height: 60, backgroundColor: '#06d6a0', borderRadius: 10, marginTop: 8 },
});
