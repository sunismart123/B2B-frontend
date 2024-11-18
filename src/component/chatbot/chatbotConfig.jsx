// // import { createChatBotMessage } from 'react-chatbot-kit';
// // import QuestionsList from './QuestionsList';

// // const onQuestionClick = (question, actionProvider) => {
// //   if (actionProvider) {
// //     actionProvider.handleChoice(question);
// //   } else {
// //     console.error('actionProvider is not defined');
// //   }
// // };


// // const chatbotConfig = {
// //   initialMessages: [createChatBotMessage("Hi! How can I help you today?")],
// //   botName: "B2B Chatbot",
// //   customStyles: {
// //     botMessageBox: {
// //       backgroundColor: "#376B7E",
// //     },
// //     chatButton: {
// //       backgroundColor: "#5ccc9d",
// //     },
// //   },
// //   state: {
// //     filteredQuestions: []
// //   },
// //   widgets: [
// //     {
// //       widgetName: "questionsList",
// //       widgetFunc: (props) => (
// //         <QuestionsList
// //           {...props}
// //           onQuestionClick={(question) => onQuestionClick(question, props.actionProvider)}
// //         />
// //       ),
// //       mapStateToProps: ["filteredQuestions"],
// //     },
// //   ],
// // };

// // export default chatbotConfig;
// import { createChatBotMessage } from 'react-chatbot-kit';
// import QuestionsList from './QuestionsList';

// const onQuestionClick = (question, actionProvider) => {
//   if (actionProvider) {
//     actionProvider.handleChoice(question);
//   } else {
//     console.error('actionProvider is not defined');
//   }
// };

// const chatbotConfig = {
//   initialMessages: [createChatBotMessage("Hi! How can I help you today?")],
//   botName: "B2B Chatbot",
//   customStyles: {
//     botMessageBox: {
//       backgroundColor: "#376B7E",
//     },
//     chatButton: {
//       backgroundColor: "#5ccc9d",
//     },
//   },
//   state: {
//     filteredQuestions: []
//   },
//   widgets: [
//     {
//       widgetName: "questionsList",
//       widgetFunc: (props) => (
//         <QuestionsList
//           {...props}
//           onQuestionClick={(question) => onQuestionClick(question, props.actionProvider)}
//         />
//       ),
//       mapStateToProps: ["filteredQuestions"],
//     },
//   ],
// };

// export default chatbotConfig;


import { createChatBotMessage } from 'react-chatbot-kit';
import QuestionsList from './QuestionsList';

const onQuestionClick = (question, actionProvider) => {
  if (actionProvider) {
    actionProvider.handleChoice(question);
  } else {
    console.error('actionProvider is not defined');
  }
};

const chatbotConfig = {
  initialMessages: [createChatBotMessage("Hi! How can I help you today?")],
  botName: "B2B Chatbot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  state: {
    filteredQuestions: []
  },
  widgets: [
    {
      widgetName: "questionsList",
      widgetFunc: (props) => (
        <QuestionsList
          {...props}
          onQuestionClick={(question) => onQuestionClick(question, props.actionProvider)}
        />
      ),
      mapStateToProps: ["filteredQuestions"],
    },
  ],
};

export default chatbotConfig;
