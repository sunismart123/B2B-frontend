// class MessageParser {
//   constructor(actionProvider) {
//     this.actionProvider = actionProvider;
//   }

//   parse(message) {
//     const lowercase = message.toLowerCase();

//     console.log('Message Received:', message); // Debugging

//     if (lowercase.includes("hello")) {
//       this.actionProvider.handleHello();
//     } else if (lowercase.includes("questions") || lowercase.includes("options")) {
//       this.actionProvider.handleQuestions();
//     } else {
//       this.actionProvider.handleAutoSuggest(lowercase);
//     }
//   }
// }

// export default MessageParser;

class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowercase = message.toLowerCase();

    console.log('Message Received:', message); // Debugging

    if (lowercase.includes("hello")) {
      this.actionProvider.handleHello();
    } else if (lowercase.includes("questions") || lowercase.includes("options")) {
      this.actionProvider.handleQuestions();
    } else {
      this.actionProvider.handleAutoSuggest(lowercase);
    }
  }
}

export default MessageParser;
