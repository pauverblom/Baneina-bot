module.exports = {
  name: "exist",
  description: "Do YOU exist?",
  execute(message, args) {
    
    if (Existence == 1) {
      message.reply("Whoah! You exist! " + Existence + " person exists!");
    }

    if (Existence > 1) {
      message.reply("Whoah! You exist! " + Existence + " people exist!");
    }
  }
};

