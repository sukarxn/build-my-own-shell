import { createInterface } from "readline";
import { existsSync, statSync } from "fs";


const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const handleCommand  = (input: string) => {
  const [command, ...args] = input.trim().split(" ");

  const checkPath = (command: string) => {
    // go to every directory in PATH
    const pathsDirs = process.env.PATH?.split(":");
    if (pathsDirs) {
      for(const dir of pathsDirs) {
        // check if command exists in dir
        const filepath = `${dir}/${command}`;
        if(existsSync(filepath)){
          try {
            const stats = statSync(filepath);
            if(stats.isFile() && (stats.mode & 0o111)) {
              return filepath;
            }
          } catch (err) {
            // skip if err or not executable
          }
        }
      }
    }
    return null;
  }

  if (command === "exit") {
    if(args.length > 1) {
      rl.write('exit: too many arguments\n');
      return;
    }
    const exitCode = parseInt(args[0] || "0", 10);
    rl.close();
    process.exit(exitCode);
  }

  if(command === "echo") {
    rl.write(args.join(" ") + "\n");
    return;
  }

  if(command === "type") {
    if(args.length > 1) {
      rl.write('type: too many arguments\n');
      return;
    }

    // if(["type", "echo", "exit"].includes(args[0])) {
    //   rl.write(`${args[0]} is a shell builtin\n`);
    //   return true;
    // } else if (checkPath(command)) {
    // //   rl.write(`${command}: ${checkPath(command)}`)
    // } else {
    //   rl.write(`${args[0]}: not found\n`);
    // }

    if(["type", "echo", "exit"].includes(args[0])) {
      rl.write(`${args[0]} is a shell builtin\n`);
      return;

    } else if (checkPath(args[0])) {
      rl.write(`${args[0]} is ${checkPath(args[0])}\n`);
      return;

    } else {
      rl.write(`${args[0]}: not found\n`);
      return;
    }
  }

  // if command is not recognized in any of the above cases
  rl.write(command + ": command not found\n");
  return; 
  }

// TODO: Uncomment the code below to pass the first stage
const myShell = () => {
  rl.question("$ ", (answer) => {
    handleCommand(answer);
    myShell();
  });
}

myShell();