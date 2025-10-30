# Build My Own Shell in TypeScript

A fully functional Unix-like shell implementation built from scratch in TypeScript using Bun runtime. This project demonstrates core shell concepts including command parsing, PATH resolution, executable detection, and process management.

## Features

- **Command Execution**: Execute any system command available in your PATH
- **Built-in Commands**: 
  - `exit [code]` - Exit the shell with optional status code
  - `echo [args]` - Print arguments to stdout
  - `type <command>` - Display command type (builtin or external)
- **PATH Resolution**: Automatically finds and executes commands from system PATH
- **Error Handling**: Graceful error messages for missing commands and execution failures
- **Interactive REPL**: Continuous prompt loop for command input

## Prerequisites

- **Node.js** v22.19.0 or higher
- **Bun** v1.3.1 or higher ([Install Bun](https://bun.sh))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sukarxn/build-my-own-shell.git
cd build-my-own-shell/codecrafters-shell-typescript
```

2. Install dependencies:
```bash
bun install
```

## Usage

Start the shell:
```bash
bun run app/main.ts
```

Or using the provided script:
```bash
./your_program.sh
```

### Examples

```bash
$ echo hello world
hello world

$ type echo
echo is a shell builtin

$ type grep
grep is /usr/bin/grep

$ ls -la
(lists files in current directory)

$ git --version
git version 2.50.0

$ exit 0
```

## Project Structure

```
codecrafters-shell-typescript/
├── app/
│   └── main.ts           # Main shell implementation
├── your_program.sh       # Shell launcher script
├── bun.lockb             # Bun lock file
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## How It Works

### Command Parsing
- User input is split into command and arguments
- Command is checked against built-in commands first

### Built-in Command Handling
```typescript
if (command === "exit") {
  // Handle exit with optional status code
}
else if (command === "echo") {
  // Print arguments
}
else if (command === "type") {
  // Display command type
}
```

### External Command Execution
1. Check if command exists in system PATH
2. Verify it's an executable file (`mode & 0o111`)
3. Execute using `execFile()` with arguments
4. Handle stdout, stderr, and errors

### PATH Resolution
The shell searches through directories in your `$PATH` environment variable to locate executables:
```bash
$ echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

## Implementation Details

### Exit Code Handling
```bash
$ exit 0     # Success
$ exit 1     # Error
$ echo $?    # Check last exit code
```

### Command Type Detection
```bash
$ type ls       # /bin/ls (external command)
$ type echo     # echo is a shell builtin
$ type notfound # notfound: not found
```

### Error Handling
```bash
$ invalidcommand
invalidcommand: command not found

$ ls /nonexistent
ls: cannot access '/nonexistent': No such file or directory
```

## Key Technologies

- **TypeScript** - Type-safe shell implementation
- **Bun** - Fast JavaScript runtime and package manager
- **Node.js Built-ins**:
  - `readline` - Interactive command input
  - `child_process.execFile` - Execute external commands
  - `fs` - File system operations

## Future Enhancements

- [ ] Piping support (`|`)
- [ ] Output redirection (`>`, `>>`)
- [ ] Input redirection (`<`)
- [ ] Background jobs (`&`)
- [ ] Command history
- [ ] Aliases
- [ ] Environment variables (`export`, `$VAR`)
- [ ] Directory navigation (`cd`)
- [ ] AI agent for command suggestions
- [ ] Tab completion

## Development

### Build
```bash
bun build app/main.ts
```

### Run
```bash
bun run app/main.ts
```

### Debug
```bash
bun run --inspect app/main.ts
```

## Learning Resources

This project covers:
- Shell basics and REPL design
- Process management with Node.js
- File system operations
- System PATH resolution
- Exit codes and error handling
- TypeScript for systems programming

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the [CodeCrafters](https://codecrafters.io) "Build Your Own Shell" challenge.

## Author

**Gulati Sukaran**
- GitHub: [@sukarxn](https://github.com/sukarxn)

## Acknowledgments

- [CodeCrafters](https://codecrafters.io) for the shell challenge
- Unix shell specification and design principles
- Node.js documentation and community

---

**Built with ❤️ in TypeScript**