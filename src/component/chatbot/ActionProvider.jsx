// class ActionProvider {
//   constructor(createChatBotMessage, setStateFunc) {
//     this.createChatBotMessage = createChatBotMessage;
//     this.setState = setStateFunc;

//     this.defaultResponses = new Map([
//       ["what is the project about?", "This is a B2B E-commerce project where buyers can deal directly with sellers."],
//       ["how do i add a product?", "To add a product, go to the 'Add Product' page and fill in the required details."],
//       ["how do i view the cart?", "You can view your cart by clicking on the 'Cart' icon on the top right corner."],
//       ["how do i proceed to payment?", "Once you have added items to your cart, click on 'Proceed to Checkout' to go to the payment page."],
//       ["what payment methods are available?", "You can pay using various methods including credit card, debit card, UPI, net banking, and wallet."]
//     ]);
//   }

//   handleHello() {
//     const message = this.createChatBotMessage("Hello! How can I assist you today?");
//     this.setState((prev) => ({
//       ...prev,
//       messages: [...prev.messages, message],
//     }));
//   }

//   handleQuestions() {
//     const questions = [
//       "What is the project about?",
//       "How do I add a product?",
//       "How do I view the cart?",
//       "How do I proceed to payment?",
//       "What payment methods are available?"
//     ];

//     const message = this.createChatBotMessage("Please choose a question from the list:", {
//       widget: "questionsList",
//       widgetProps: {
//         filteredQuestions: questions, 
//         onQuestionClick: this.handleChoice.bind(this) // Ensure this is correctly bound
//       },
//     });

//     this.setState((prev) => ({
//       ...prev,
//       messages: [...prev.messages, message],
//     }));
//   }

//   handleChoice(question) {
//     console.log('Choice Selected:', question); // Debugging

//     const response = this.defaultResponses.get(question.toLowerCase()) || "I'm sorry, I don't have an answer to that question.";
//     const message = this.createChatBotMessage(response);

//     this.setState((prev) => ({
//       ...prev,
//       messages: [...prev.messages, message],
//       filteredQuestions: this.defaultResponses.has(question.toLowerCase()) ? [] : prev.filteredQuestions, // Clear suggestions only if question is found
//     }));
//   }

//   handleAutoSuggest(input) {
//     const questions = [
//       "What is the project about?",
//       "How do I add a product?",
//       "How do I view the cart?",
//       "How do I proceed to payment?",
//       "What payment methods are available?"
//     ];

//     const filteredQuestions = questions.filter(question =>
//       question.toLowerCase().includes(input.toLowerCase())
//     ).slice(0, 5);

//     console.log('Filtered Questions:', filteredQuestions); // Debugging

//     this.setState((prev) => ({
//       ...prev,
//       filteredQuestions,
//     }));

//     // Create a message to trigger the widget
//     const message = this.createChatBotMessage("Here are some suggestions:", {
//       widget: "questionsList",
//       widgetProps: { 
//         filteredQuestions, 
//         onQuestionClick: this.handleChoice.bind(this) 
//       },
//     });

//     this.setState((prev) => ({
//       ...prev,
//       messages: [...prev.messages, message],
//     }));
//   }
// }

// export default ActionProvider;


class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;

    this.defaultResponses = new Map([
      ["what is the project about?", "This is a B2B E-commerce project where buyers can deal directly with sellers."],
      ["how do i add a product?", "To add a product, go to the 'Add Product' page and fill in the required details."],
      ["how do i view the cart?", "You can view your cart by clicking on the 'Cart' icon on the top right corner."],
      ["how do i proceed to payment?", "Once you have added items to your cart, click on 'Proceed to Checkout' to go to the payment page."],
      ["what payment methods are available?", "You can pay using various methods including credit card, debit card, UPI, net banking, and wallet."]
    ]);
  }

  handleHello() {
    const message = this.createChatBotMessage("Hello! How can I assist you today?");
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }

  handleQuestions() {
    const questions = [
      "What is the project about?",
      "How do I add a product?",
      "How do I view the cart?",
      "How do I proceed to payment?",
      "What payment methods are available?"
    ];

    const message = this.createChatBotMessage("Please choose a question from the list:", {
      widget: "questionsList",
      widgetProps: {
        filteredQuestions: questions, 
        onQuestionClick: this.handleChoice.bind(this) // Ensure this is correctly bound
      },
    });

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }

  handleChoice(question) {
    console.log('Choice Selected:', question); // Debugging

    const response = this.defaultResponses.get(question.toLowerCase()) || "I'm sorry, I don't have an answer to that question.";
    const message = this.createChatBotMessage(response);

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
      filteredQuestions: prev.filteredQuestions, // Keep the filteredQuestions as is
    }));
  }

  handleAutoSuggest(input) {
    const questions = [
      "What is the project about?",
      "How do I add a product?",
      "How do I view the cart?",
      "How do I proceed to payment?",
      "What payment methods are available?"
    ];

    const filteredQuestions = questions.filter(question =>
      question.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 5);

    console.log('Filtered Questions:', filteredQuestions); // Debugging

    this.setState((prev) => ({
      ...prev,
      filteredQuestions,
    }));

    // Create a message to trigger the widget
    const message = this.createChatBotMessage("Here are some suggestions:", {
      widget: "questionsList",
      widgetProps: { 
        filteredQuestions, 
        onQuestionClick: this.handleChoice.bind(this) 
      },
    });

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}

export default ActionProvider;
