import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// TODO: Uncomment the code below to pass the first stage
const myShell = () => {
  rl.question("$ ", (answer) => {
    const parts = answer.trim().split(" ");
    const command = parts[0];
    const args = parts.slice(1);

    if (command === "exit") {
      const exitCode = args[0] ? parseInt(args[0]) : 0;
      exitCode == 0 ? rl.write(`Exited with success: ${exitCode}\n`) : rl.write(`Exited with error code: ${exitCode}\n`);
      rl.close();
      return;
    }

  rl.write(answer + ": command not found\n");
  myShell();

  });
}

myShell();
