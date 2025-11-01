export const CODE_TEMPLATES = {
  javascript: `// Welcome to JavaScript!
console.log("Hello, World!");

// Variables
let name = "Developer";
const age = 25;

// Function
function greet(person) {
    return \`Hello, \${person}!\`;
}

// Call function
console.log(greet(name));

// Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);`,

  python: `# Welcome to Python!
print("Hello, World!")

# Variables
name = "Developer"
age = 25

# Function
def greet(person):
    return f"Hello, {person}!"

# Call function
print(greet(name))

# List operations
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print("Doubled:", doubled)

# Dictionary
person = {"name": name, "age": age}
print(person)`,

  java: `// Welcome to Java!
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Variables
        String name = "Developer";
        int age = 25;
        
        // Call method
        System.out.println(greet(name));
        
        // Array
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Array length: " + numbers.length);
    }
    
    // Method
    public static String greet(String person) {
        return "Hello, " + person + "!";
    }
}`,

  cpp: `// Welcome to C++!
#include <iostream>
#include <vector>
#include <string>

using namespace std;

// Function
string greet(const string& person) {
    return "Hello, " + person + "!";
}

int main() {
    cout << "Hello, World!" << endl;
    
    // Variables
    string name = "Developer";
    int age = 25;
    
    // Call function
    cout << greet(name) << endl;
    
    // Vector
    vector<int> numbers = {1, 2, 3, 4, 5};
    cout << "Vector size: " << numbers.size() << endl;
    
    return 0;
}`,

  c: `// Welcome to C!
#include <stdio.h>
#include <string.h>

// Function declaration
void greet(const char* person);

int main() {
    printf("Hello, World!\\n");
    
    // Variables
    char name[] = "Developer";
    int age = 25;
    
    // Call function
    greet(name);
    
    // Array
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    printf("Array size: %d\\n", size);
    
    return 0;
}

// Function definition
void greet(const char* person) {
    printf("Hello, %s!\\n", person);
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        .highlight {
            color: #007acc;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Hello, World! 🌍</h1>
    <p>Welcome to <span class="highlight">HTML</span>!</p>
    
    <div>
        <h2>Features:</h2>
        <ul>
            <li>Semantic markup</li>
            <li>CSS styling</li>
            <li>Responsive design</li>
        </ul>
    </div>
    
    <button onclick="alert('Hello from JavaScript!')">
        Click me!
    </button>
</body>
</html>`,

  css: `/* Welcome to CSS! */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.title {
    color: #007acc;
    text-align: center;
    margin-bottom: 20px;
    font-size: 2.5rem;
}

.card {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #007acc;
    margin: 20px 0;
}

.btn {
    background: #007acc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.btn:hover {
    background: #0056b3;
}`,

  typescript: `// Welcome to TypeScript!
interface Person {
    name: string;
    age: number;
}

interface Greeting {
    greet(person: Person): string;
}

class Greeter implements Greeting {
    greet(person: Person): string {
        return \`Hello, \${person.name}! You are \${person.age} years old.\`;
    }
}

// Usage
const developer: Person = {
    name: "Developer",
    age: 25
};

const greeter = new Greeter();
console.log(greeter.greet(developer));

// Generic function
function identity<T>(arg: T): T {
    return arg;
}

const result = identity<string>("Hello TypeScript!");
console.log(result);`,

  php: `<?php
// Welcome to PHP!
echo "Hello, World!\\n";

// Variables
$name = "Developer";
$age = 25;

// Function
function greet($person) {
    return "Hello, " . $person . "!";
}

// Call function
echo greet($name) . "\\n";

// Array
$numbers = [1, 2, 3, 4, 5];
$doubled = array_map(function($n) {
    return $n * 2;
}, $numbers);

echo "Doubled: " . implode(", ", $doubled) . "\\n";

// Associative array
$person = [
    "name" => $name,
    "age" => $age
];

print_r($person);
?>`,

  python: `# Welcome to Python!
print("Hello, World!")

# Variables
name = "Developer"
age = 25

# Function
def greet(person):
    return f"Hello, {person}!"

# Call function
print(greet(name))

# List operations
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print("Doubled:", doubled)

# Dictionary
person = {"name": name, "age": age}
print(person)

# Class example
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."

dev = Person(name, age)
print(dev.introduce())`,

  ruby: `# Welcome to Ruby!
puts "Hello, World!"

# Variables
name = "Developer"
age = 25

# Method
def greet(person)
  "Hello, #{person}!"
end

# Call method
puts greet(name)

# Array operations
numbers = [1, 2, 3, 4, 5]
doubled = numbers.map { |n| n * 2 }
puts "Doubled: #{doubled}"

# Hash
person = { name: name, age: age }
puts person

# Class example
class Person
  attr_accessor :name, :age
  
  def initialize(name, age)
    @name = name
    @age = age
  end
  
  def introduce
    "Hi, I'm #{@name} and I'm #{@age} years old."
  end
end

dev = Person.new(name, age)
puts dev.introduce`,

  go: `// Welcome to Go!
package main

import "fmt"

// Function
func greet(person string) string {
    return fmt.Sprintf("Hello, %s!", person)
}

func main() {
    fmt.Println("Hello, World!")
    
    // Variables
    name := "Developer"
    age := 25
    
    // Call function
    fmt.Println(greet(name))
    
    // Slice operations
    numbers := []int{1, 2, 3, 4, 5}
    var doubled []int
    for _, n := range numbers {
        doubled = append(doubled, n*2)
    }
    fmt.Println("Doubled:", doubled)
    
    // Struct
    type Person struct {
        Name string
        Age  int
    }
    
    dev := Person{Name: name, Age: age}
    fmt.Printf("Person: %+v\\n", dev)
}`,

  rust: `// Welcome to Rust!
fn main() {
    println!("Hello, World!");
    
    // Variables
    let name = "Developer";
    let age = 25;
    
    // Call function
    println!("{}", greet(name));
    
    // Vector operations
    let numbers = vec![1, 2, 3, 4, 5];
    let doubled: Vec<i32> = numbers.iter().map(|n| n * 2).collect();
    println!("Doubled: {:?}", doubled);
    
    // Struct
    #[derive(Debug)]
    struct Person {
        name: String,
        age: u32,
    }
    
    let dev = Person {
        name: name.to_string(),
        age,
    };
    println!("Person: {:?}", dev);
}

// Function
fn greet(person: &str) -> String {
    format!("Hello, {}!", person)
}`,

  sql: `-- Welcome to SQL!
-- Create a sample database structure

-- Create users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, email, age) VALUES 
('Alice Johnson', 'alice@example.com', 28),
('Bob Smith', 'bob@example.com', 32),
('Charlie Brown', 'charlie@example.com', 25);

-- Query examples
SELECT * FROM users;

SELECT name, email FROM users WHERE age > 25;

SELECT COUNT(*) as total_users FROM users;

-- Update data
UPDATE users SET age = 29 WHERE name = 'Alice Johnson';

-- Advanced query with aggregation
SELECT 
    CASE 
        WHEN age < 30 THEN 'Young'
        ELSE 'Adult'
    END as age_group,
    COUNT(*) as count
FROM users
GROUP BY age_group;`,

  json: `{
  "name": "Hello World Project",
  "version": "1.0.0",
  "description": "A sample JSON structure",
  "author": {
    "name": "Developer",
    "email": "developer@example.com",
    "age": 25
  },
  "technologies": [
    "JavaScript",
    "Node.js",
    "JSON"
  ],
  "config": {
    "environment": "development",
    "debug": true,
    "port": 3000,
    "database": {
      "host": "localhost",
      "name": "myapp",
      "credentials": {
        "username": "admin",
        "password": "secure123"
      }
    }
  },
  "features": {
    "authentication": true,
    "logging": true,
    "caching": false
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.0.0"
  }
}`,

  xml: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Welcome to XML! -->
<project>
    <name>Hello World Project</name>
    <version>1.0.0</version>
    <description>A sample XML structure</description>
    
    <author>
        <name>Developer</name>
        <email>developer@example.com</email>
        <age>25</age>
    </author>
    
    <technologies>
        <technology>JavaScript</technology>
        <technology>Node.js</technology>
        <technology>XML</technology>
    </technologies>
    
    <config environment="development">
        <debug>true</debug>
        <port>3000</port>
        <database>
            <host>localhost</host>
            <name>myapp</name>
            <credentials>
                <username>admin</username>
                <password>secure123</password>
            </credentials>
        </database>
    </config>
    
    <features>
        <feature name="authentication" enabled="true"/>
        <feature name="logging" enabled="true"/>
        <feature name="caching" enabled="false"/>
    </features>
</project>`
};

export const getDefaultCode = (language) => {
  return CODE_TEMPLATES[language] || `// Welcome to ${language}!\n\n// Start coding here...`;
};
