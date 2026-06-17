import { StyleSheet, Text, View, TouchableOpacity, ImageSource, ImageSourcePropType } from "react-native";
import { Link } from "expo-router";
import Button from "@/app-example/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from 'react';
import ImageViewer from "@/app-example/components/ImageViewer";
import IconButton from "@/app-example/components/IconButton";
import CircleButton from "@/app-example/components/CircleButton";
import EmojiPicker from "@/app-example/components/EmojiPicker";
import EmojiList from "@/app-example/components/EmojiList";
import EmojiSticker from "@/app-example/components/EmojiSticker";
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from "react-native-view-shot";
import { Try } from "expo-router/build/views/Try";


const PlaceholderImage = require("@assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const imageRef = useRef<any>(null);

  const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('vc nao escolheu');
    }
};

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Salvo');
      }
    } catch (e) {
      console.log(e);
    }
  };



  return (
      <GestureHandlerRootView style = {styles.container}>
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
            {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
          </View>
        </View>

        {showAppOptions ?(
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) : (
          <View style = {styles.footerContainer}>
            <Button theme="primary" label="Escolha uma foto" onPress={pickImageAsync}/>
            <Button label="Usar essa foto" onPress={() => setShowAppOptions(true)} />
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
            <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>

        <View style={styles.header}>
          <Text style={styles.tituloApp}>POKÉ APP</Text>
          <Text style={styles.subtitulo}>Painel do Treinador</Text>
        </View>
        <View style={styles.menu}>
          <Link href="/pokedex" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Acessar Pokédex</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/toDoList" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Lista de Tarefas</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/about" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sobre o Projeto</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.footerContainer}>
          <Button theme="primary" label="Escolha uma foto"/>
          <Button label="Usar essa foto"/>
        </View>

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    flex: 1,
  },
  header: {
    marginBottom: 50,
    alignItems: 'center',
  },
  tituloApp: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subtitulo: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 5,
  },
  menu: {
    width: '100%',
    gap: 15, 
  },
  button: {
    backgroundColor: '#3d444d', 
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4e555d',
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    color: '#555',
    fontSize: 12,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },

});