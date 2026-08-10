const toolsData = [
  {
    id: "qr-generator",
    icon: "🔳",
    title: "QR Generator",
    category: "Utility",
    description: "Create QR codes from text and URLs",
    path: "/tools/qr-generator",
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
    description: "Scan book pages using your camera and convert them to text or PDF",
    path: "/tools/book-scanner",
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

];

export default toolsData;
