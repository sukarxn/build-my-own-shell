import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const handleCommand  = (input: string):boolean => {
  const [command, ...args] = input.trim().split(" ");

  if (command === "exit") {
    if(args.length > 1) {
      rl.write('exit: too many arguments\n');
      return true;
    }
    const exitCode = parseInt(args[0] || "0", 10);
    rl.close();
    process.exit(exitCode);
  }

  if(command === "echo") {
    rl.write(args.join(" ") + "\n");
    return true;
  }

  if(command === "type") {
    if(args.length > 1) {
      rl.write('exit: too many arguments\n');
      return true;
    }
    ["type", "echo", "exit"].includes(args[0]) ?
    rl.write(`${args[0]} is a shell builtin\n`): 
    rl.write(`${args[0]}: not found\n`);
    return true;
  }

  // if command is not recognized in any of the above cases
  rl.write(command + ": command not found\n");
  return false; 
}

// TODO: Uncomment the code below to pass the first stage
const myShell = () => {
  rl.question("$ ", (answer) => {
    handleCommand(answer);
    myShell();
  });
}

myShell();