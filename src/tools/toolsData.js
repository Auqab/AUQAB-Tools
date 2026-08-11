const toolsData = [
{
  id: "qr-generator",
  icon: "🔳",
  title: "QR Generator & Scanner",
  category: "Utility",
  description: "Create and scan QR codes instantly",
  path: "/tools/qr-generator"
},

  {
    id: "password-generator",
    icon: "🔐",
    title: "Password Generator",
    category: "Security",
    description: "Generate strong secure passwords",
    path: "/tools/password-generator",
  },
  {
    id: "image-compressor",
    icon: "🖼️",
    title: "Image Compressor",
    category: "Image",
    description: "Compress images easily",
    path: "/tools/image-compressor",
  },
  {
    id: "unit-converter",
    icon: "📏",
    title: "Unit Converter",
    category: "Converter",
    description: "Convert units quickly",
    path: "/tools/unit-converter",
  },
  {
    id: "word-counter",
    icon: "📝",
    title: "Text & Word Counter",
    category: "Text",
    description: "Count words, characters, sentences, lines and reading time",
    path: "/tools/word-counter",
  },
  {
    id: "text-case-converter",
    icon: "🔤",
    title: "Text Case Converter",
    category: "Text",
    description: "Convert text between different cases",
    path: "/tools/text-case-converter",
  },
  {
    id: "json-formatter",
    icon: "{}",
    title: "JSON Formatter",
    category: "Developer",
    description: "Format and minify JSON data easily",
    path: "/tools/json-formatter",
  },
  {
    id: "script-generator",
    icon: "💻",
    title: "Script Generator",
    category: "Developer",
    description: "Generate PC scripts for Windows and Linux",
    path: "/tools/script-generator",
  },
  {
    id: "image-resizer",
    icon: "📷",
    title: "Image Resizer",
    category: "Image",
    description: "Resize images online easily",
    path: "/tools/image-resizer",
  },
  {
    id: "base64-tool",
    icon: "🔐",
    title: "Base64 Encoder Decoder",
    category: "Developer",
    description: "Encode and decode Base64 text easily",
    path: "/tools/base64-tool",
  },
{
  id: "book-scanner",
  icon: "📖",
  title: "Book Scanner",
  category: "Utility",
  description: "Scan pages, enhance, and extract text with AI",
  path: "/tools/book-scanner"
},

{
  id: "url-shortener",
  icon: "🔗",
  title: "URL Manager",
  category: "Utility",
  description: "Save, manage and generate QR codes for your links",
  path: "/tools/url-shortener"
},

{
  id: "color-picker",
  icon: "🎨",
  title: "Color Picker & Palette",
  category: "Design",
  description: "Pick colors and generate beautiful palettes",
  path: "/tools/color-picker"
},

{
  id: "uuid-generator",
  icon: "🆔",
  title: "UUID Generator",
  category: "Developer",
  description: "Generate random UUIDs for your projects",
  path: "/tools/uuid-generator"
},

{
  id: "markdown-previewer",
  icon: "📝",
  title: "Markdown Previewer",
  category: "Text",
  description: "Write and preview Markdown in real time",
  path: "/tools/markdown-previewer"
},
{
  id: "diff-checker",
  icon: "🔍",
  title: "Diff Checker",
  category: "Text",
  description: "Compare two texts and highlight differences",
  path: "/tools/diff-checker"
},

{
  id: "regex-tester",
  icon: "🧪",
  title: "Regex Tester",
  category: "Developer",
  description: "Test regular expressions and see matches",
  path: "/tools/regex-tester"
},
{
  id: "text-to-slug",
  icon: "🔗",
  title: "Text to Slug",
  category: "Text",
  description: "Convert text into URL-friendly slug",
  path: "/tools/text-to-slug"
},

{
  id: "lorem-generator",
  icon: "📜",
  title: "Lorem Ipsum Generator",
  category: "Text",
  description: "Generate placeholder dummy text",
  path: "/tools/lorem-generator"
},
{
  id: "char-frequency-counter",
  icon: "🔢",
  title: "Character Frequency Counter",
  category: "Text",
  description: "Count character and word occurrences",
  path: "/tools/char-frequency-counter"
},

{
  id: "image-cropper",
  icon: "✂️",
  title: "Image Cropper",
  category: "Image",
  description: "Crop images with mouse and download",
  path: "/tools/image-cropper"
},
{
  id: "image-to-base64",
  icon: "🔣",
  title: "Image to Base64",
  category: "Image",
  description: "Convert image to Base64 data URI",
  path: "/tools/image-to-base64"
},

{
 id: "image-filters",
 icon: "🎨",
 title: "Image Filters",
 category: "Image",
 description: "Apply artistic filters to images",
 path: "/tools/image-filters"
 },

{
 id: "qr-scanner",
 icon: "📷",
 title: "QR Code Scanner",
 category: "Utility",
 description: "Scan QR codes with camera",
 path: "/tools/qr-scanner" 
},

{
 id: "jwt-debugger",
 icon: "🛡️", 
title: "JWT Debugger",
 category: "Developer",
 description: "Decode JWT tokens",
 path: "/tools/jwt-debugger" 
},
{
 id: "cron-generator",
 icon: "⏱️", 
title: "Cron Generator",
 category: "Developer",
 description: "Build cron expressions visually",
 path: "/tools/cron-generator" 
},

{
 id: "code-minifier",
 icon: "🧹",
 title: "Code Minifier",
 category: "Developer",
 description: "Minify HTML, CSS & JS",
 path: "/tools/code-minifier" 
},
{
 id: "sql-formatter",
 icon: "🗄️",
 title: "SQL Formatter",
 category: "Developer",
 description: "Format SQL queries",
 path: "/tools/sql-formatter" 
},

{
 id: "http-tester",
 icon: "🌐",
 title: "HTTP Request Tester",
 category: "Developer",
 description: "Test HTTP requests",
 path: "/tools/http-tester" 
},
{ 
id: "json-yaml-converter",
 icon: "🔄",
 title: "JSON ↔ YAML Converter",
 category: "Developer",
 description: "Convert JSON to YAML and vice versa",
 path: "/tools/json-yaml-converter" 
},

{
  id: "csv-to-json",
  icon: "📊",
  title: "CSV to JSON",
  category: "Developer",
  description: "Convert CSV data to JSON format",
  path: "/tools/csv-to-json"
},
{
  id: "hash-generator",
  icon: "🔐",
  title: "Hash Generator",
  category: "Security",
  description: "Generate MD5, SHA1, SHA256, SHA512 hashes",
  path: "/tools/hash-generator"
},

{
  id: "aes-encryption",
  icon: "🔐",
  title: "AES Encryption",
  category: "Security",
  description: "Encrypt and decrypt text with AES",
  path: "/tools/aes-encryption"
},
{
  id: "password-strength-meter",
  icon: "🟢",
  title: "Password Strength Meter",
  category: "Security",
  description: "Check how strong your password is",
  path: "/tools/password-strength-meter"
},

{
  id: "ssl-checker",
  icon: "🔒",
  title: "SSL Checker",
  category: "Security",
  description: "Inspect SSL certificate of any domain",
  path: "/tools/ssl-checker"
},
{
  id: "currency-converter",
  icon: "💱",
  title: "Currency Converter",
  category: "Converter",
  description: "Live exchange rate conversion",
  path: "/tools/currency-converter"
},

{
  id: "timezone-converter",
  icon: "🕒",
  title: "Time Zone Converter",
  category: "Converter",
  description: "Convert time between different time zones",
  path: "/tools/timezone-converter"
},
{
  id: "base-converter",
  icon: "🔢",
  title: "Number Base Converter",
  category: "Converter",
  description: "Convert numbers between binary, hex, octal, decimal",
  path: "/tools/base-converter"
},

{
  id: "roman-numerals",
  icon: "🏛️",
  title: "Roman Numerals Converter",
  category: "Converter",
  description: "Convert numbers to/from Roman numerals",
  path: "/tools/roman-numerals"
},
{
  id: "random-number-generator",
  icon: "🎲",
  title: "Random Number Generator",
  category: "Utility",
  description: "Generate random numbers in a range",
  path: "/tools/random-number-generator"
},

{
  id: "dice-roller",
  icon: "🎲",
  title: "Dice Roller & Picker",
  category: "Utility",
  description: "Roll dice or pick a random winner",
  path: "/tools/dice-roller"
},
{
  id: "fake-data-generator",
  icon: "👤",
  title: "Fake Data Generator",
  category: "Developer",
  description: "Generate realistic fake test data",
  path: "/tools/fake-data-generator"
},

{
  id: "pdf-merger",
  icon: "📄",
  title: "PDF Merger",
  category: "PDF",
  description: "Combine multiple PDFs into one",
  path: "/tools/pdf-merger"
},
{
  id: "pdf-splitter",
  icon: "✂️",
  title: "PDF Splitter",
  category: "PDF",
  description: "Extract pages from a PDF",
  path: "/tools/pdf-splitter"
},

{
  id: "pdf-compressor",
  icon: "🗜️",
  title: "PDF Compressor",
  category: "PDF",
  description: "Reduce PDF file size",
  path: "/tools/pdf-compressor"
},
{
  id: "pdf-to-image",
  icon: "🖼️",
  title: "PDF to Image",
  category: "PDF",
  description: "Convert PDF pages to images",
  path: "/tools/pdf-to-image"
},

{
  id: "images-to-pdf",
  icon: "🖼️",
  title: "Images to PDF",
  category: "PDF",
  description: "Combine images into a PDF file",
  path: "/tools/images-to-pdf"
},
{
  id: "audio-recorder",
  icon: "🎙️",
  title: "Audio Recorder",
  category: "Media",
  description: "Record audio in your browser",
  path: "/tools/audio-recorder"
},

{
  id: "video-to-gif",
  icon: "🎥",
  title: "Video to GIF",
  category: "Media",
  description: "Convert short videos to animated GIFs",
  path: "/tools/video-to-gif"
},
{
  id: "text-to-speech",
  icon: "🔊",
  title: "Text to Speech",
  category: "Media",
  description: "Hear your text spoken aloud",
  path: "/tools/text-to-speech"
},

{
  id: "voice-to-text",
  icon: "🎤",
  title: "Voice to Text",
  category: "Media",
  description: "Convert speech to text in real-time",
  path: "/tools/voice-to-text"
},
{
  id: "audio-visualizer",
  icon: "🎵",
  title: "Audio Visualizer",
  category: "Media",
  description: "Visualize live audio frequencies",
  path: "/tools/audio-visualizer"
},

{
 id: "ip-lookup",
 icon: "🌍",
 title: "IP Lookup",
 category: "Network", 
description: "Get IP address details",
 path: "/tools/ip-lookup" 
},
{
 id: "whois-lookup",
 icon: "📋",
 title: "Whois Lookup",
 category: "Network",
 description: "Domain registration info",
 path: "/tools/whois-lookup"
 },
{
 id: "ping-tool",
 icon: "📶", 
title: "Ping Tool",
 category: "Network",
 description: "Test website response time",
 path: "/tools/ping-tool" 
},
{
 id: "dns-lookup",
 icon: "📚",
 title: "DNS Lookup", 
category: "Network",
 description: "Retrieve DNS records",
 path: "/tools/dns-lookup" 
},
{
 id: "url-encoder-decoder",
 icon: "🔗",
 title: "URL Encoder/Decoder",
 category: "Developer",
 description: "Encode or decode URLs",
 path: "/tools/url-encoder-decoder"
 },
{
 id: "scientific-calculator",
 icon: "🔢", 
title: "Scientific Calculator",
 category: "Utility",
 description: "Advanced math calculator",
 path: "/tools/scientific-calculator"
 },

{ id: "graph-plotter", icon: "📈", title: "Graph Plotter", category: "Math", description: "Plot mathematical functions", path: "/tools/graph-plotter" },
{ id: "equation-solver", icon: "🧮", title: "Equation Solver", category: "Math", description: "Solve algebraic equations", path: "/tools/equation-solver" },
{ id: "matrix-calculator", icon: "🔲", title: "Matrix Calculator", category: "Math", description: "Matrix multiplication/add/inverse", path: "/tools/matrix-calculator" },
{ id: "stopwatch-timer", icon: "⏱️", title: "Stopwatch & Timer", category: "Utility", description: "Stopwatch and countdown timer", path: "/tools/stopwatch-timer" },
{ id: "pomodoro-timer", icon: "🍅", title: "Pomodoro Timer", category: "Utility", description: "Pomodoro technique timer", path: "/tools/pomodoro-timer" },
{ id: "checklist", icon: "✅", title: "Checklist / To‑Do", category: "Utility", description: "A simple browser checklist", path: "/tools/checklist" },

{ id: "notepad", icon: "📝", title: "Note Pad", category: "Utility", description: "Simple browser notepad", path: "/tools/notepad" },
{ id: "invoice-generator", icon: "🧾", title: "Invoice Generator", category: "Utility", description: "Generate simple invoices", path: "/tools/invoice-generator" },
{ id: "qr-business-card", icon: "📇", title: "QR Business Card", category: "Utility", description: "Create a vCard QR code", path: "/tools/qr-business-card" },
{ id: "periodic-table", icon: "🧪", title: "Periodic Table", category: "Education", description: "Interactive periodic table", path: "/tools/periodic-table" },
{ id: "morse-converter", icon: "🆘", title: "Morse Code Converter", category: "Text", description: "Text ↔ Morse code", path: "/tools/morse-converter" },
{ id: "chess-timer", icon: "♟️", title: "Chess Timer", category: "Utility", description: "Two-player chess clock", path: "/tools/chess-timer" },

{ id: "binary-hex-viewer", icon: "🔢", title: "Binary/Hex Viewer", category: "Developer", description: "View file hex content", path: "/tools/binary-hex-viewer" },
{ id: "weather-app", icon: "🌦️", title: "Weather App", category: "Utility", description: "Current weather by city", path: "/tools/weather-app" },
{ id: "bmi-calculator", icon: "⚖️", title: "BMI Calculator", category: "Health", description: "Body Mass Index", path: "/tools/bmi-calculator" },
{ id: "age-calculator", icon: "🎂", title: "Age Calculator", category: "Utility", description: "Calculate exact age", path: "/tools/age-calculator" },
{ id: "day-of-week", icon: "📅", title: "Day of Week", category: "Utility", description: "Find weekday for a date", path: "/tools/day-of-week" },
{ id: "random-quote", icon: "💬", title: "Random Quote", category: "Fun", description: "Inspirational quotes", path: "/tools/random-quote" },

{ id: "emoji-board", icon: "🎭", title: "Emoji Copy Board", category: "Fun", description: "Click to copy emojis", path: "/tools/emoji-board" },
{ id: "number-to-words", icon: "🔢", title: "Number to Words", category: "Text", description: "Convert numbers to English words", path: "/tools/number-to-words" },
{ id: "tip-calculator", icon: "💵", title: "Tip Calculator", category: "Utility", description: "Calculate tips and split bills", path: "/tools/tip-calculator" },
{ id: "percentage-calculator", icon: "📊", title: "Percentage Calculator", category: "Math", description: "Advanced percentage calculations", path: "/tools/percentage-calculator" },
{ id: "password-meme", icon: "🔐", title: "Password Meme Info", category: "Fun", description: "Funny password strength meme", path: "/tools/password-meme" },

{ id: "ai-grammar-check", icon: "🧠", title: "AI Grammar Check", category: "AI", description: "Check grammar with AI", path: "/tools/ai-grammar-check" },
{ id: "ai-text-summarizer", icon: "📝", title: "AI Text Summarizer", category: "AI", description: "Summarize text with AI", path: "/tools/ai-text-summarizer" },
{ id: "ai-chatbot", icon: "🤖", title: "AI Chatbot", category: "AI", description: "Chat with GPT AI", path: "/tools/ai-chatbot" },

{
  id: "privacy-vault",
  icon: "🔐",
  title: "Privacy Vault",
  category: "Security",
  description: "Encrypted secret storage",
  path: "/tools/privacy-vault"
}

];

export default toolsData;
