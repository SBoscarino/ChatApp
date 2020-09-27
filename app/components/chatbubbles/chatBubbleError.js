import React from 'react';
import { Text, Card, CardItem, Body, Content } from 'native-base';
import styles from './chatBubbles.styles';

export default function ChatBubbleUser(errorText) {
  const { errorBubbleBase, bubbleEntity, bubbleText } = styles;
  return (
    <Content>
      <Card transparent>
        <CardItem>
          <Body>
            <Text style={[errorBubbleBase, bubbleEntity]}>Error:</Text>
            <Text style={bubbleText}>{errorText}</Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
}
