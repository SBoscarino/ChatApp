import React from 'react';
import { Text, Card, CardItem, Body, Content } from 'native-base';
import styles from './chatBubbles.styles';

export default function ChatBubbleUser(text, entity) {
  const { userBubbleBase, bubbleWrapper, bubbleEntity, bubbleText } = styles;
  return (
    <Content>
      <Card transparent>
        <CardItem>
          <Body style={bubbleWrapper}>
            <Text style={[userBubbleBase, bubbleEntity]}>{entity}:</Text>
            <Text style={bubbleText}>{text}</Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
}
