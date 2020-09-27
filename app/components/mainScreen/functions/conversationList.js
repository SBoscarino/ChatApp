import React from 'react';
import chatBubbleError from '../../chatbubbles/chatBubbleError';
import chatBubbleUser from '../../chatbubbles/chatBubbleUser';
import chatBubbleResponse from '../../chatbubbles/chatBubbleResponse';
import { List } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

const handleTypeOfBubble = (item) => {
  const { entity, text } = item;
  if (entity === 'Bot') {
    return chatBubbleResponse(text, entity);
  }
  if (entity === 'error') {
    return chatBubbleError(text);
  } else {
    return chatBubbleUser(text, entity);
  }
};
const conversationList = (conversationArray) => {
  return (
    <ScrollView>
      <List>{conversationArray.map((item) => handleTypeOfBubble(item))}</List>
    </ScrollView>
  );
};

export { conversationList };
