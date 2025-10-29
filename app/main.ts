import { createInterface } from "readline";
import { existsSync, statSync } from "fs";
import { execFile } from "child_process";


const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const handleCommand  = (input: string) => {
  const [command, ...args] = input.trim().split(" ");

  const checkPath = (command: string) => {
    // returns : filepath if exists or null 
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

  else if(command === "echo") {
    rl.write(args.join(" ") + "\n");
  }

  else if(command === "type") {
    if(args.length > 1) {
      rl.write('type: too many arguments\n');
    } else if(["type", "echo", "exit"].includes(args[0])) {
      rl.write(`${args[0]} is a shell builtin\n`);
    } else if (checkPath(args[0])) {
      rl.write(`${args[0]} is ${checkPath(args[0])}\n`);
    } else {
      rl.write(`${args[0]}: not found\n`);
    }
  }

  else if(checkPath(command)){
    // when the command is none of the above: check for an executable command
    const commPath: any = checkPath(command);
    // execute the program using args[]
    execFile(command, args, (error, stdout, stderr) => {
      if (error) {
        rl.write(`Error executing file: ${error.message}`);
      } else if (stderr) {
        rl.write(`${stderr}`);
      } else {
        rl.write(`${stdout}`);
      }
      myShell();
    });
    return;

  } else {
    rl.write(command + ": command not found\n");
  }

  myShell();
  }

// TODO: Uncomment the code below to pass the first stage
const myShell = () => {
  rl.question("$ ", (answer) => {
    handleCommand(answer);
  });
}

myShell();
