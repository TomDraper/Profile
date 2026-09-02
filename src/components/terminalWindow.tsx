import { useState, useEffect } from 'react'
import '../css/terminalWindow.css'

type Directory = {
    name: string;
    parent?: Directory;
    children: Record<string, Directory>;
    files: Record<string, File>;
}

type File = {
    name: string,
    contents: string
}

const root: Directory = {
    name: "root",
    children: {},
    files: {
        "contact.txt": { name: "contact.txt", contents: "Email: mythirdalias@gmail.com. \nLinkedIn: https://www.linkedin.com/in/tom-draper-88836321a/ \nGithub: https://github.com/TomDraper" },
        "elevator.txt": { name: "elevator.txt", contents: "Hi, I'm Tom. Passion for games since I was a child. Programmed things most of my life. Bachelors in Games Development, 5 years of industry experience. Worked with numerous programming languages including C#/C++/Python. Happy anywhere that I can solve a puzzle. Looking to start a new oppurtunity, potentially switching industries into web or software development. Extremely skilled in Unity, but understanding of game engines in general and have worked with Unreal/Godot as well." }
    }
};

// build tree
root.children["education"] = {
    name: "education",
    parent: root,
    children: {},
    files: {
        "school.txt": { name: "school.txt", contents: "14 GCSES A* to C.\n4 From a special IT class where I built an early Flash Game." },
        "college.txt": { name: "college.txt", contents: "Higher National Diploma in Games Development where I learnt 3D Modelling, Animation, Illustration, Graphic Design as well as my first introduction to games engines and how to build games." },
        "university.txt": { name: "university.txt", contents: "Bachelors in Games Development from Teesside University. Mainly focused on designing games rather than making them, but in my 3rd year I focused on creating a simple game to track and evaluate players so we could further improve their experiences using UE3. Essentially created a replay system and a way to track what players were looking at, how long they spent in various zones, if they got lost anywhere. I further expanded this so that it would change dependent on what you wanted to test. So if you wanted to test how sound effects affected the players then it would produce the same level but with sound effects on/off/different at various points and then specifically targetted those areas to evaluate players upon." }
    }
};

root.children["experience"] = {
    name: "experience",
    parent: root,
    children: {},
    files: {
        "sprungstudios.txt": { name: "sprungStudios.txt", contents: "Worked for Sprung Studios as a UI Developer, mostly using Unreal Engine. Developed for AAA games and worked to pixel-perfect precision with UIs while keeping the performance overhead as low as possible." },
        "luminousxr.txt": { name: "luminousXR.txt", contents: "Worked for Luminous as a Unity Developer where I developed editor tools and maintained some internal tooling as well as developing and creating some modules and games myself. Lead several projects to success. Was well respected for my abilities and planning of projects and worked on several things outside of the traditional scope of the business such as Python/Java plugins for Unity, a hub app to contain all of our work as well as keep them updated. Created a desktop controller so we could play the VR games on PC as well and automated localization saving time, effort and money for all involved." }
    }
};

const commands: Record<string, Function> = {
    // Actual commands.
    "cd": openDirectory,
    "..": goUpOneLevel,
    "hist": displayCommandHistory,
    "open": displayFile,
    "help": displayHelp,
    "secret": displayAllCommands,
    "secrets": displayAllCommands,

    // Fun gimmick stuff to make it feel like a terminal.
    "pwd": getFullPath,
    "ver": () => "Version: 1.0.0... Probably.",
    "clear": () => "",
    "date": () => new Date().toString(),
    "echo": (args:string[]) => args.join(" "),
    "print": (args:string[]) => args.join(" "),
    
    // Easter eggs and sarcasm.
    "ls": () => "Why would you need this? I display it each time!",
    "edit": () => "Yeah... I'm not building an edit unless you pay me to. It's not even got a back-end!",
    "create": () => "I made this for a laugh you know?? No creating!",
    "sudo": () => "You shall not pass. Do not pass go. Do not collect £200.",
    "exit": () => "You can go if you want :(",
    "rm": () => ":O - HOW RUDE!",
    "skills": () => "C#, C++, Unity, Unreal, React... Googling stuff well.",
    "stats": () => "Level: 34 | XP: Lots | Companions: Wife and Twin Daughters. | Familiars: Cat (Kirk) | Condition: Tired.",
    "quest": () => "Current quest: Be employed.",
    "unlock": (args:string[]) => `You now have the power(s) of: ${args.join(" / ")}.`,
    "devmode": () => "Developer mode enabled. (Press F12)",
    "ping": () => "pong",
    
}

function displayAllCommands(args: string[]){
    return Object.keys(commands).join("\n");
}

function getFullPath(args: string[], currentDirectory:Directory){
    var pathToRoot = [currentDirectory.name];
    var directory = currentDirectory;

    while(directory.parent){
        pathToRoot.push(directory.parent.name);
        directory = directory.parent;
    }

    pathToRoot.reverse();
    const directoryPath = "/" + pathToRoot.join("/");
    return directoryPath;
}

function displayHelp(args:string[]){
    if (args.length > 0){
        return "ERR: Command requires 0 arguments.";
    }

    const helpText = 
    "---- HELP ----\n" +
    "Directories are marked with square brackets []." + "\n" +
    "Files have an extension (.txt) but you don't need the extension to open them." + "\n" +
    "You can use up and down arrow to navigate through previous commands (Up to 10)" + "\n\n" +
    "---- AUTOCOMPLETE ----\n" +
    "Tab cycles suggestions. \n" +
    "Right arrow will fill the current suggestion in. \n" +
    "Tab will fill if only a single suggestion remains. \n" + 
    "There might be a SECRET way to see all hidden commands." + "\n\n" +
    "---- COMMANDS ----" + "\n" +
    "cd [directoryName] - Open Directory - Brackets are not required." + "\n" +
    ".. - Go up a directory level." + "\n" +
    "open [fileName] - Open File - Extension is not required." + "\n" +
    "hist - Display the last 10 commands and their outputs - Files and help will be redacted." + "\n" +
    "clear - Clears previous output." + "\n" +
    "help - Display this field again" + "\n\n";

    return helpText;
}

function openDirectory(args:string[], currentDirectory:Directory, setDirectory:Function){
    if (args.length != 1) {
        return "ERR: Command requires exactly one argument."
    }

    const target = args[0].replaceAll("[", "").replaceAll("]", "");
    
    // We want to navigate up a level.
    if (target === ".."){
        return goUpOneLevel([], currentDirectory, setDirectory);
    }

    const nextDir = currentDirectory.children[target];

    if (!nextDir) {
        return `ERR: No directory named ${target}`
    }
    else {
        setDirectory(nextDir);
    }

    return `Moved from: ${currentDirectory.name} to ${nextDir.name}.`;
}

function goUpOneLevel(args:string[], currentDirectory: Directory, setDirectory:Function){
    if (args.length > 0){
        return "ERR: Command requires 0 arguments."
    }

    if (currentDirectory.parent === undefined){
        return "ERR: Already at root.";
    }

    setDirectory(currentDirectory.parent);

    return `Moved from: ${currentDirectory.name} to ${currentDirectory.parent.name}.`;
}

function displayCommandHistory(args:string[]){
    if (args.length > 0){
        return "ERR: Command requires 0 arguments.";
    }

    let textOutput = "---- Previous Command History ---- \n\n";
    for(let i = 1; i < fullHistory.length; i++){
        const cmd = fullHistory[i][0];
        const output = fullHistory[i][1];

        // Edge case for opening files - We don't want to spam with large files.
        if (cmd.startsWith("> open") && output.startsWith("ERR:") === false){
            textOutput += cmd + "\n";
            textOutput += "~ Opened File - File contents hidden ~" + "\n";
            if (i != fullHistory.length-1){
                textOutput += "----------------" + "\n";
            }
            continue;
        }

        if (cmd === "> help"){
            textOutput += cmd + "\n";
            textOutput += "~ Opened Help - Contents hidden ~" + "\n";
            if (i != fullHistory.length-1){
                textOutput += "----------------" + "\n";
            }
            continue;
        }

        textOutput += fullHistory[i][0] + "\n";
        textOutput += fullHistory[i][1] + "\n";
        if (i != fullHistory.length-1){
            textOutput += "----------------" + "\n";
        }
    }
    textOutput += "\n---- END OF HISTORY---- \n\n";

    return textOutput;
}

function displayFile(args:string[], currentDirectory: Directory){
    if (args.length != 1){
        return "ERR: Command requires exactly one argument.";
    }

    const target = args[0].endsWith(".txt") ? args[0] : args[0] + ".txt";

    const file = currentDirectory.files[target];
    if (!file){
        return `No file named ${args[0]}`;
    }
    let finalOutput = `---- ${file.name} ----\n\n${file.contents}\n\n---- EOF ----`;
    
    return finalOutput;
}

function processCommand(input:string, currentDirectory:Directory, setDirectory:Function) {
    let [command, ...args] = input.toLowerCase().split(" ");

    if (command === "history"){
        command = "hist"
    }

    let output = "";
    if (command in commands){
        output = commands[command](args, currentDirectory, setDirectory);
    }
    else
    {
        output = `ERR: No command found: ${command}`;
    }
    
    return output;
}

function getSuggestions(input: string, currentDirectory: Directory): string[] {
    const parts = input.toLowerCase().split(" ");

    // typing command
    if (parts.length === 1) {
        return Object.keys(commands).filter(cmd =>
            cmd.startsWith(parts[0])
        );
    }

    const [command, partial] = parts;

    // typing directory
    if (command === "cd") {
        return Object.keys(currentDirectory.children)
            .filter(dir => dir.startsWith(partial));
    }

    // typing file
    if (command === "open") {
        return Object.keys(currentDirectory.files)
            .filter(file => file.startsWith(partial));
    }

    return [];
}

const fullHistory:string[][] = [[]];
const initialOutput:string = "Welcome to the Terminal! \n\nType \"help\" for assistance.\n\n";

export default function TerminalWindow()
{
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const [tempInput, setTempInput] = useState("");
    const [output, setOutput] = useState<string>(initialOutput);
    const [input, setInput] = useState("");
    const [ghostInput, setGhostInput] = useState<string>("");
    const [currentDirectory, setDirectory] = useState<Directory>(root);
    const [tabIndex, setTabIndex] = useState(-1);

    const handleCommand = (cmd:string) => {
        const output = processCommand(cmd, currentDirectory, setDirectory);
        setOutput(output);

        // Update the command history for arrow keys.
        setHistory(prev => {
            const updated = [...prev, cmd]
            return updated.slice(-10);
        });
        
        // Update text history - but only if the command itself isn't history.
        if (cmd !== "hist"){
            fullHistory.push([`> ${cmd}`, output]);
            if (fullHistory.length > 10){
                fullHistory.shift();
            }
        }

        setInput("");
        setGhostInput("");
    };

    return (
        <div className="terminal">
            <div>{output}</div>

            <div>---- {currentDirectory.name.toUpperCase()} ----</div>

            {Object.keys(currentDirectory.children).map((d) => (
                <div key={d}>[{d}]</div>
            ))}

            {Object.keys(currentDirectory.files).map((f) => (
                <div key={f}>{currentDirectory.files[f].name}</div>
            ))}            

            <div className="terminalInputContainer">
                <div className="terminalArrow">{"> "}</div>
                <div className="terminalInputWrapper">
                    <span className="terminalGhost">
                        {input}
                        <span className="ghostText">
                            {ghostInput}
                        </span>
                    </span>
                    <input
                        className="terminalInput"
                        name="terminal-input"
                        id="terminal-input"
                        value={input}
                        onChange={(e) => {
                            const newInput = e.target.value;
                            setInput(newInput);
                            setTabIndex(0);

                            const suggestions = getSuggestions(newInput, currentDirectory);
                            
                            if (suggestions.length === 0) {    
                                setGhostInput("");
                                return;
                            }

                            const parts = newInput.split(" ");
                            parts[parts.length - 1] = suggestions[0];
                            setGhostInput(parts.join(" ").slice(newInput.length));
                        }}
                        onKeyDown={(e) => {
                                switch(e.key){
                                    case "Enter": 
                                        handleCommand(input);
                                        setHistoryIndex(null);
                                        break;
                                    case "ArrowUp":
                                        e.preventDefault();

                                        setHistoryIndex(prev => {
                                            if (history.length === 0) return null;
                                            if (prev === null){
                                                setTempInput(input);
                                            }
                                            const newIndex = prev === null ? history.length-1 : Math.max(0, prev - 1);
                                            setInput(history[newIndex] || "");
                                            return newIndex;
                                        })
                                        break;
                                    case "ArrowDown":
                                        e.preventDefault();

                                        setHistoryIndex(prev => {
                                            if (prev === null) return null;
                                            const newIndex = prev + 1;
                                            if (newIndex >=  history.length){
                                                setInput(tempInput);
                                                return null;
                                            }
                                            setInput(history[newIndex]);
                                            return newIndex;
                                        })
                                        break;
                                    case "ArrowRight":
                                        const isAtEnd = e.currentTarget.selectionStart === input.length;
                                        if (!isAtEnd) break;

                                        e.preventDefault();
                                        setInput(input + ghostInput);
                                        setGhostInput("");
                                        break;

                                    case "Tab":
                                        e.preventDefault();
                                        
                                        const suggestions = getSuggestions(input, currentDirectory);

                                        if (suggestions.length === 0) return;

                                        const nextIndex = (tabIndex + 1) % suggestions.length;
                                        setTabIndex(nextIndex);

                                        const parts = input.split(" ");
                                        parts[parts.length - 1] = suggestions[nextIndex];

                                        const nextGhostInput = parts.join(" ").slice(input.length);
                                        if (suggestions.length === 1 && nextGhostInput === ghostInput){
                                            setInput(parts.join(" "));
                                            setGhostInput("");
                                            break;
                                        }
                                        setGhostInput(nextGhostInput);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        autoFocus
                        autoComplete='off'
                        autoCorrect='off'
                        autoCapitalize='off'
                        spellCheck={false}
                    ></input>
                </div>
                
            </div>
            
            <div className="autocomplete">
                {input === "" ? "" : getSuggestions(input, currentDirectory).map((s, i) => (
                    <div key={i} className={i==tabIndex ? "tabHighlight" : ""}>{s}</div>
                ))}
            </div>
        </div>
    );
}