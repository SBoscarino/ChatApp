import { StyleSheet } from 'react-native';
import COLORS from '../../assets/colors';

export default styles = StyleSheet.create({
  // shared
  bubbleEntity: {
    fontWeight: 'bold',
  },
  bubbleWrapper: {
    flexDirection: 'column',
  },
  bubbleText: {
    color: COLORS.BLACK,
  },

  // Response Bubbles
  responseBubbleBase: {
    color: COLORS.DARK_BLUE,
  },

  // User Bubbles
  userBubbleBase: {
    color: COLORS.LIGHT_BLUE,
  },

  // Error Bubbles
  errorBubbleBase: {
    color: COLORS.RED,
  },
});
