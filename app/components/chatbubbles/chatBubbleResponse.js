import React from 'react';
import { Text, Card, CardItem, Body, Content } from 'native-base';
import styles from './chatBubbles.styles';

export default function ChatBubbleResponse(text, entity) {
  const {
    responseBubbleBase,
    bubbleEntity,
    bubbleWrapper,
    bubbleText,
  } = styles;
  return (
    <Content>
      <Card transparent>
        <CardItem>
          <Body style={bubbleWrapper}>
            <Text style={[responseBubbleBase, bubbleEntity]}>{entity}:</Text>
            <Text style={bubbleText}>{text}</Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
}
