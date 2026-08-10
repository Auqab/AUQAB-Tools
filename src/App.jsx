import { Routes, Route } from "react-router-dom";
import "./App.css";
import TextCounter from "./pages/TextCounter";
import ImageCompressor from "./pages/ImageCompressor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import URLShortener from "./pages/URLShortener";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import About from "./pages/About";
import QRGenerator from "./pages/QRGenerator";
import PasswordGenerator from "./pages/PasswordGenerator";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Cookies from "./pages/Cookies";
import UnitConverter from "./pages/UnitConverter";
import TextCaseConverter from "./pages/TextCaseConverter";
import JSONFormatter from "./pages/JSONFormatter";
import ScriptGenerator from "./pages/ScriptGenerator";
import ImageResizer from "./pages/ImageResizer";
import Base64Tool from "./pages/Base64Tool";
import Premium from "./pages/Premium";
import Services from "./pages/Services";
import RequestService from "./pages/RequestService";
import Pricing from "./pages/Pricing";
import BookScanner from "./pages/BookScanner";
import ParticlesBackground from "./components/ParticlesBackground";
import ColorPicker from "./pages/ColorPicker";
import UUIDGenerator from "./pages/UUIDGenerator";
import MarkdownPreviewer from "./pages/MarkdownPreviewer";
import DiffChecker from "./pages/DiffChecker";
import RegexTester from "./pages/RegexTester";
import TextToSlug from "./pages/TextToSlug";
import LoremIpsumGenerator from "./pages/LoremIpsumGenerator";
import CharFrequencyCounter from "./pages/CharFrequencyCounter";
import ImageCropper from "./pages/ImageCropper";
import ImageToBase64 from "./pages/ImageToBase64";
import ImageFilters from "./pages/ImageFilters";
import QRCodeScanner from "./pages/QRCodeScanner";
import JWTDecoder from "./pages/JWTDecoder";
import CronGenerator from "./pages/CronGenerator";
import CodeMinifier from "./pages/CodeMinifier";
import SQLFormatterPage from "./pages/SQLFormatter";
import HTTPTester from "./pages/HTTPTester";
import JSONYAMLConverter from "./pages/JSONYAMLConverter";
import CSVtoJSON from "./pages/CSVtoJSON";
import HashGenerator from "./pages/HashGenerator";
import AESEncryption from "./pages/AESEncryption";
import PasswordStrengthMeter from "./pages/PasswordStrengthMeter";



function App() {
  return (
    <div className="app">
      <ParticlesBackground />
      <Navbar />

      <main className="main-content">
        <Routes>
	  <Route path="/tools/aes-encryption" element={<AESEncryption />} />
	  <Route path="/tools/password-strength-meter" element={<PasswordStrengthMeter />} />
	  <Route path="/tools/csv-to-json" element={<CSVtoJSON />} />
	  <Route path="/tools/hash-generator" element={<HashGenerator />} />
	  <Route path="/tools/http-tester" element={<HTTPTester />} />
	  <Route path="/tools/json-yaml-converter" element={<JSONYAMLConverter />} />
	  <Route path="/tools/code-minifier" element={<CodeMinifier />} />
	  <Route path="/tools/sql-formatter" element={<SQLFormatterPage />} />
	  <Route path="/tools/jwt-debugger" element={<JWTDecoder />} />
	  <Route path="/tools/cron-generator" element={<CronGenerator />} />
	  <Route path="/tools/image-filters" element={<ImageFilters />} />
	  <Route path="/tools/qr-scanner" element={<QRCodeScanner />} />	  <Route path="/tools/image-cropper" element={<ImageCropper />} />
	  <Route path="/tools/image-to-base64" element={<ImageToBase64 />} />
	  <Route path="/tools/lorem-generator" element={<LoremIpsumGenerator />} />
	  <Route path="/tools/char-frequency-counter" element={<CharFrequencyCounter />} />
          <Route path="/tools/regex-tester" element={<RegexTester />} />
          <Route path="/tools/text-to-slug" element={<TextToSlug />} />
	  <Route path="/tools/markdown-previewer" element={<MarkdownPreviewer />} />
          <Route path="/tools/diff-checker" element={<DiffChecker />} />
          <Route path="/tools/uuid-generator" element={<UUIDGenerator />} />
          <Route path="/tools/color-picker" element={<ColorPicker />} />
          <Route path="/tools/url-shortener" element={<URLShortener />} />
          <Route path="/tools/book-scanner" element={<BookScanner />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/request-service" element={<RequestService />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tools/base64-tool" element={<Base64Tool />} />
          <Route path="/tools/image-resizer" element={<ImageResizer />} />
          <Route path="/tools/script-generator" element={<ScriptGenerator />} />
          <Route path="/tools/json-formatter" element={<JSONFormatter />} />
          <Route path="/tools/text-case-converter" element={<TextCaseConverter />} />
          <Route path="/tools/word-counter" element={<TextCounter />} />
          <Route path="/tools/unit-converter" element={<UnitConverter />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/url-shortener" element={<URLShortener />} />
          <Route path="/text-counter" element={<TextCounter />} />
          <Route path="/tools/password-generator" element={<PasswordGenerator />} />
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/about" element={<About />} />
          <Route path="/tools/qr-generator" element={<QRGenerator />} />
          <Route path="/tools/image-compressor" element={<ImageCompressor />} />
          <Route path="/premium" element={<Premium />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
