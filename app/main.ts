import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// TODO: Uncomment the code below to pass the first stage
const myrl = () => {
  rl.question("$ ", (answer) => {
  rl.write(answer + ": command not found\n");
  myrl();
});
}

myrl();
