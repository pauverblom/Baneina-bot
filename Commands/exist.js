module.exports = {
	name: 'exist',
	description: 'Do YOU exist?',
	execute(message, args) {
		Existence = Existence + 1;

    if (Existence == 1) {
      message.reply("Whoah! You exist! " + Existence + " person exists!");
    }

    if (Existence > 1) {
      message.reply("Whoah! You exist! " + Existence + " people exist!");
    }
  }
	//!Unexist
  if (message.content === "!Unexist") {
    if (Existence > 0) {
      Existence = Existence - 1;
    }

    if (Existence == 1) {
      message.reply(
        "You commited sewer side! You unexisted! " +
          Existence +
          " person exists! " +
          "Congrats! " +
          "You are the only survivor!"
      );
    }
    if (Existence > 1) {
      message.reply(
        "You commited sewer side! You unexisted! " +
          Existence +
          " people exist!"
      );
    }
    if (Existence == 0) {
      message.reply(
        "You commited sewer side! " +
          "You unexisted! " +
          "No-one exists. " +
          "This is so sad."
      );
    }
	},
};

