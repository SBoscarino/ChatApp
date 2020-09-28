import React from 'react';
import { fetchInitialData } from '../../data/fetchInitialData';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  Footer,
  Header,
  Container,
  Content,
  Text,
  Button,
  Icon,
  Form,
  Textarea,
  Left,
  Thumbnail,
} from 'native-base';
import styles from './mainScreen.styles';
import { choosePath, checkValidation, conversationList } from './functions';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataArray: [],
      conversationArray: [],
      fullQuestionData: {},
      user: 'Guest',
      inputText: '',
      questionsBegan: false,
      calculateUserDestination: false,
      isButtonDisabled: false,
    };
  }
  componentDidMount() {
    const { dataArray } = this.state;

    if (dataArray.length === 0) {
      this.getData();
    }
  }

  getData = async () => {
    const payload = await fetchInitialData();
    this.setState({ dataArray: payload.data });
  };

  kickOffQuestions = () => {
    const { conversationArray } = this.state;

    const question = this.getQuestionText(1);
    const questionObject = this.getQuestionObject(1);
    const responseObject = {
      entity: 'Bot',
      text: question,
    };
    const stateCopy = conversationArray;
    stateCopy.push(responseObject);

    this.setState({
      conversationArray: stateCopy,
      questionsBegan: true,
      fullQuestionData: questionObject,
    });
  };

  setNextQuestion = (questionId) => {
    const { conversationArray } = this.state;
    if (!questionId) {
      return;
    }
    const question = this.getQuestionText(questionId);
    const questionObject = this.getQuestionObject(questionId);
    const responseObject = {
      entity: 'Bot',
      text: question,
    };
    const stateCopy = conversationArray;
    stateCopy.push(responseObject);

    this.setState({
      conversationArray: stateCopy,
      fullQuestionData: questionObject,
    });
  };

  getQuestionObject = (questionIndex) => {
    const { dataArray } = this.state;
    const questionObject = dataArray.find((item) => item.id === questionIndex);
    return questionObject;
  };

  getQuestionText = (questionIndex) => {
    const { dataArray } = this.state;
    const questionObject = dataArray.find((item) => item.id === questionIndex);
    const questionText = questionObject.question;
    return questionText;
  };

  setError = () => {
    const { conversationArray } = this.state;
    const errorObject = {
      entity: 'error',
      text: 'try that again, please ;)',
    };
    const stateCopy = conversationArray;
    stateCopy.push(errorObject);

    this.setState({
      conversationArray: stateCopy,
    });
  };

  calculateUserDestination = () => {
    const { inputText, fullQuestionData } = this.state;

    // validation result will be true, false, or a string.
    const validationResult = checkValidation(fullQuestionData, inputText);
    // path will be an id for the next item.
    const path = choosePath(fullQuestionData, validationResult, inputText);
    const isContinuingPath = path !== 'error';

    if (isContinuingPath) {
      // continue as normal
      this.setNextQuestion(path);
      if (path === 'end' || path === 10) {
        // end state
        this.setState({
          isButtonDisabled: true,
        });
      }
    }
    if (path === 'error') {
      // error time!
      this.setError();
    }
    if (path === -1) {
      // end state
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  handleUserResponse = () => {
    const { user, conversationArray, inputText } = this.state;
    const userObject = {
      entity: user,
      text: inputText,
    };
    const stateCopy = conversationArray;
    stateCopy.push(userObject);

    this.setState({
      conversationArray: stateCopy,
      inputText: '',
      calculateUserDestination: true,
    });
  };

  handleText = (input) => {
    this.setState({ inputText: input });
  };

  render() {
    const {
      leftPadding,
      containerSpacing,
      flexRow,
      white,
      leftMargin,
      buttonStyle,
    } = styles;

    const {
      user,
      conversationArray,
      dataArray,
      questionsBegan,
      isButtonDisabled,
      inputText,
    } = this.state;

    // kick off if we haven't done so.
    if (questionsBegan === false && dataArray.length > 0) {
      this.kickOffQuestions();
    }

    return (
      <Container>
        <Header>
          <Left style={[flexRow, containerSpacing]}>
            <Thumbnail source={{ uri: 'http://placekitten.com/100/100' }} />
            <Text style={leftPadding}>{user}</Text>
          </Left>
        </Header>

        {conversationList(conversationArray)}
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <Footer style={flexRow}>
            <Content style={containerSpacing}>
              <Form>
                <Textarea
                  style={white}
                  rowSpan={2}
                  bordered
                  placeholder="Type here..."
                  value={inputText}
                  onChangeText={(value) => this.handleText(value)}
                />
              </Form>
            </Content>
            <Form>
              <Button
                info
                disabled={isButtonDisabled}
                style={[leftMargin, buttonStyle]}
                onPress={() => {
                  this.handleUserResponse();
                  this.calculateUserDestination();
                }}>
                <Icon type="FontAwesome" name="paper-plane" />
              </Button>
            </Form>
          </Footer>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default MainScreen;
