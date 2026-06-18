import { StyleSheet, Text, View, TouchableOpacity, ImageSourcePropType, LayoutChangeEvent } from "react-native";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from "react-native-view-shot";

// Componentes
import Button from "@/app-example/components/Button";
import ImageViewer from "@/app-example/components/ImageViewer";
import IconButton from "@/app-example/components/IconButton";
import CircleButton from "@/app-example/components/CircleButton";
import EmojiPicker from "@/app-example/components/EmojiPicker";
import EmojiList from "@/app-example/components/EmojiList";
import EmojiSticker from "@/app-example/components/EmojiSticker";

const PlaceholderImage = { uri: "http://googleusercontent.com/image_collection/image_retrieval/10107356669707157416" };

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const imageRef = useRef<any>(null);

  const onImageContainerLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCanvasWidth(width);
    setCanvasHeight(height);
  };

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
      alert('Nenhuma imagem selecionada.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);    
    setSelectedImage(undefined);
    setPickedEmoji(undefined);
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
        alert('Imagem salva na galeria!');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.tituloApp}>POKÉ APP</Text>
        <Text style={styles.subtitulo}>Sistema do Treinador</Text>
      </View>

      {/* ÁREA DE EDIÇÃO */}
      <View style={styles.imageContainer} onLayout={onImageContainerLayout}>
        <View ref={imageRef} collapsable={false} style={{ flex: 1 }}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          
          {pickedEmoji && canvasWidth > 0 && (
            <EmojiSticker 
              imageSize={40} 
              stickerSource={pickedEmoji}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
            />
          )}
        </View>
      </View>

      {/* CONTROLES */}
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Resetar" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Salvar" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Selecionar Imagem" onPress={pickImageAsync}/>
          <Button label="Usar esta base" onPress={() => setShowAppOptions(true)} />
        </View>
      )}

      {/* MENU */}
      <View style={styles.menu}>
        <Link href="/pokedex" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Acessar Pokédex</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/toDoList" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Lista de Missões</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/about" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sobre o Sistema</Text>
          </TouchableOpacity>
        </Link>
      

      <Link href="/teamBuilder" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Gerador de Times</Text>
          </TouchableOpacity>
        </Link>

      {/* MODAIS */}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1D24', // Fundo escuro e sofisticado
    alignItems: 'center',
    padding: 24,
  },
  header: {
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
  },
  tituloApp: {
    color: '#FFFFFF', 
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 4,
  },
  subtitulo: {
    color: '#E3350D', // Vermelho oficial Pokémon como destaque
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 4,
    letterSpacing: 2,
  },
  imageContainer: {
    height: 260, 
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 12, // Bordas mais suaves
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E3350D', // Borda vermelha tecnológica
    elevation: 8, // Sombra sutil no Android
    shadowColor: '#E3350D', // Sombra vermelha no iOS
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  menu: {
    width: '100%',
    gap: 12, 
    marginTop: 1,
  },
  button: {
    backgroundColor: '#2A2F3A', // Cinza escuro para contraste leve
    padding: 16,
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 4, // Detalhe lateral de interface digital
    borderColor: '#E3350D', 
  },
  buttonText: {
    color: '#E0E0E0', 
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase', 
  },
  footerContainer: {
    marginTop: 10,
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});