import React from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';

// **Описание**: Создайте компонент Modal с возможностью открытия и закрытия через overlay
//
// **Входные данные**: Компонент должен принимать props visible (boolean), onClose (функция) и children (React.ReactNode)
//
// **Выходные данные**: Функциональный Modal-компонент с полупрозрачным фоном и центрированным содержимым
//
// **Ограничения**: 
// - Используйте только стандартные компоненты React Native
// - Modal должен отображаться поверх всего контента
// - При нажатии на полупрозрачный фон должен вызываться onClose
// - Содержимое должно быть центрировано по экрану
//
// **Примеры**:
// Использование: <Modal visible={true} onClose={() => setVisible(false)}><Text>Содержимое модального окна</Text></Modal>
// Результат: Модальное окно с полупрозрачным фоном и текстом по центру
//
// Использование: <Modal visible={false} onClose={handleClose}><View><Text>Заголовок</Text><Button title="Закрыть" /></View></Modal>
// Результат: Скрытое модальное окно (не отображается)

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({visible, onClose, children}: ModalProps) => {
  return (
    <>
      {visible && 
        <View style={styles.container}>
          <Pressable onPress={onClose} style={styles.backdrop}></Pressable>
          <View style={styles.content}>
              <Pressable style={styles.close} onPress={onClose}>
                <Text>X</Text>
              </Pressable>   
            {children}
          </View>
          
        </View>}
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  close: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0002"
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 12,
    position: "relative",
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: 400
  }
});