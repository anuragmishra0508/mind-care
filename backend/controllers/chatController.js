exports.chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Please provide a message' });
    }

    const lowerCaseMessage = message.toLowerCase();
    let reply = "I'm here for you. Could you tell me more about how you're feeling?";

    const rules = [
      { keywords: ['stress', 'overwhelmed', 'anxious', 'panic'], response: "It sounds like you're carrying a lot right now. Taking a few deep breaths can sometimes help ground you. You are not alone." },
      { keywords: ['sad', 'depressed', 'cry', 'down'], response: "I'm really sorry you're feeling down. It takes courage to acknowledge this. Remember that it's okay to not be okay. If you need it, consider reaching out to a friend or professional." },
      { keywords: ['sleep', 'tired', 'exhausted', 'insomnia'], response: "Being tired makes everything harder. Try limiting screen time before bed and creating a calming evening routine." },
      { keywords: ['happy', 'good', 'great', 'excited', 'joy'], response: "That's wonderful to hear! It's so important to recognize those good moments." },
      { keywords: ['hello', 'hi', 'hey'], response: "Hello! How can I support you today?" }
    ];

    for (const rule of rules) {
      if (rule.keywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
        reply = rule.response;
        break;
      }
    }

    res.status(200).json({ success: true, data: { reply } });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
