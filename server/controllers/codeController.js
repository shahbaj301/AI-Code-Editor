const { exec } = require('child_process');
const path = require('path');
const fs = require('fs').promises;
const os = require('os');
const { v4: uuidv4 } = require('uuid');

// Map language to Docker images and run commands
const languageConfigs = {
  javascript: {
    extension: 'js',
    dockerImage: 'node:18-alpine',
    runCommand: (filename) => `node ${filename}`
  },
  python: {
    extension: 'py',
    dockerImage: 'python:3.10-alpine',
    runCommand: (filename) => `python3 ${filename}`
  },
  java: {
    extension: 'java',
    dockerImage: 'openjdk:17',
    compileCommand: (filename) => `javac ${filename}`,
    runCommand: (className) => `java ${className}`
  },
  c: {
    extension: 'c',
    dockerImage: 'gcc:12-alpine',
    compileCommand: (filename) => `gcc ${filename} -o a.out`,
    runCommand: () => './a.out'
  },
  cpp: {
    extension: 'cpp',
    dockerImage: 'gcc:12-alpine',
    compileCommand: (filename) => `g++ ${filename} -o a.out`,
    runCommand: () => './a.out'
  }
};

exports.runCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ success: false, message: 'Code and language are required' });
    }

    const config = languageConfigs[language.toLowerCase()];
    if (!config) {
      return res.status(400).json({ success: false, message: 'Unsupported language' });
    }

    const tempDir = path.join(os.tmpdir(), `code-runner-${uuidv4()}`);
    await fs.mkdir(tempDir, { recursive: true });

    const filename = `Main.${config.extension}`;
    const filePath = path.join(tempDir, filename);

    await fs.writeFile(filePath, code);

    let command = '';
    if (config.compileCommand) {
      // Compile for compiled languages
      command = `docker run --rm -v ${tempDir}:/code -w /code ${config.dockerImage} sh -c "${config.compileCommand(filename)}"`;
      // Compile step
      const compileResult = await execCommand(command);
      if (compileResult.stderr) {
        await fs.rm(tempDir, { recursive: true, force: true });
        return res.status(200).json({ success: false, message: 'Compilation Error', output: compileResult.stderr });
      }
      // Run step
      const runCmd = config.runCommand('Main');
      command = `docker run --rm -v ${tempDir}:/code -w /code ${config.dockerImage} sh -c "${runCmd}"`;
    } else {
      // Interpreted languages
      command = `docker run --rm -v ${tempDir}:/code -w /code ${config.dockerImage} sh -c "${config.runCommand(filename)}"`;
    }

    const runResult = await execCommand(command);
    await fs.rm(tempDir, { recursive: true, force: true });

    if (runResult.stderr) {
      return res.status(200).json({ success: false, message: 'Runtime Error', output: runResult.stderr });
    }

    res.status(200).json({ success: true, output: runResult.stdout });
  } catch (error) {
    console.error('Run code error:', error);
    res.status(500).json({ success: false, message: 'Server error running code' });
  }
};

function execCommand(command) {
  return new Promise((resolve) => {
    exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
      resolve({ stdout, stderr, error });
    });
  });
}
