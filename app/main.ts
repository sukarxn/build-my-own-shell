import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const handleCommand  = (input: string) => {
  const [command, ...args] = input.trim().split(" ");
  if (command === "exit") {
    const exitCode = parseInt(args[0] || "0", 10);
    rl.close();
    process.exit(exitCode);
  }
}

// TODO: Uncomment the code below to pass the first stage
const myShell = () => {
  rl.question("$ ", (answer) => {
    handleCommand(answer);
    rl.write(answer + ": command not found\n");
    myShell();
  });
}

myShell();
