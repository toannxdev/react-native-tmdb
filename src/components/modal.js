import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../redux/slices/modalSlice';

const LoadingModal = ({ cancelable = true }) => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.visible);

  const [backgroundColor, setBackgroundColor] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(backgroundColor, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(backgroundColor, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  const overlayColor = backgroundColor.interpolate({
    inputRange: [0, 0.5],
    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)'],
  });

  return (
    <>
      <StatusBar backgroundColor={visible ? 'rgba(0, 0, 0, 0.5)' : 'transparent'} />
      <Modal
        animationType='fade'
        transparent={true}
        visible={visible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          dispatch(hideModal());
        }}
      >
        <TouchableWithoutFeedback
          onPress={cancelable ? () => dispatch(hideModal()) : null}
        >
          <Animated.View
            style={[styles.overlay, { backgroundColor: overlayColor }]}
          >
            <View style={styles.centeredView}>
              <View style={styles.cardView}>
                <ActivityIndicator size='large' color='#0000ff' />
              </View>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default LoadingModal;
