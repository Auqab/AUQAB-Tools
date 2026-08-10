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
import SSLChecker from "./pages/SSLChecker";
import CurrencyConverter from "./pages/CurrencyConverter";
import TimeZoneConverter from "./pages/TimeZoneConverter";
import BaseConverter from "./pages/BaseConverter";
import RomanNumerals from "./pages/RomanNumerals";
import RandomNumberGenerator from "./pages/RandomNumberGenerator";
import DiceRoller from "./pages/DiceRoller";
import FakeDataGenerator from "./pages/FakeDataGenerator";
import PDFMerger from "./pages/PDFMerger";
import PDFSplitter from "./pages/PDFSplitter";
import PDFCompressor from "./pages/PDFCompressor";
import PDFToImage from "./pages/PDFToImage";
import ImagesToPDF from "./pages/ImagesToPDF";
import AudioRecorder from "./pages/AudioRecorder";
import VideoToGIF from "./pages/VideoToGIF";
import TextToSpeech from "./pages/TextToSpeech";
import VoiceToText from "./pages/VoiceToText";
import AudioVisualizer from "./pages/AudioVisualizer";
import IPLookup from "./pages/IPLookup";
import WhoisLookup from "./pages/WhoisLookup";
import PingTool from "./pages/PingTool";
import DNSLookup from "./pages/DNSLookup";
import URLEncoderDecoder from "./pages/URLEncoderDecoder";
import ScientificCalculator from "./pages/ScientificCalculator";
import GraphPlotter from "./pages/GraphPlotter";
import EquationSolver from "./pages/EquationSolver";
import MatrixCalculator from "./pages/MatrixCalculator";
import StopwatchTimer from "./pages/StopwatchTimer";
import PomodoroTimer from "./pages/PomodoroTimer";
import Checklist from "./pages/Checklist";








function App() {
  return (
    <div className="app">
      <ParticlesBackground />
      <Navbar />

      <main className="main-content">
        <Routes>
	  <Route path="/tools/graph-plotter" element={<GraphPlotter />} />
	  <Route path="/tools/equation-solver" element={<EquationSolver />} />
	  <Route path="/tools/matrix-calculator" element={<MatrixCalculator />} />
	  <Route path="/tools/stopwatch-timer" element={<StopwatchTimer />} />
	  <Route path="/tools/pomodoro-timer" element={<PomodoroTimer />} />
	  <Route path="/tools/checklist" element={<Checklist />} />
	  <Route path="/tools/ip-lookup" element={<IPLookup />} />
	  <Route path="/tools/whois-lookup" element={<WhoisLookup />} />
	  <Route path="/tools/ping-tool" element={<PingTool />} />
	  <Route path="/tools/dns-lookup" element={<DNSLookup />} />
	  <Route path="/tools/url-encoder-decoder" element={<URLEncoderDecoder />} />
	  <Route path="/tools/scientific-calculator" element={<ScientificCalculator />} />
	  <Route path="/tools/voice-to-text" element={<VoiceToText />} />
	  <Route path="/tools/audio-visualizer" element={<AudioVisualizer />} />
	  <Route path="/tools/video-to-gif" element={<VideoToGIF />} />
	  <Route path="/tools/text-to-speech" element={<TextToSpeech />} />
	  <Route path="/tools/images-to-pdf" element={<ImagesToPDF />} />
	  <Route path="/tools/audio-recorder" element={<AudioRecorder />} />
	  <Route path="/tools/pdf-compressor" element={<PDFCompressor />} />
	  <Route path="/tools/pdf-to-image" element={<PDFToImage />} />
	  <Route path="/tools/pdf-merger" element={<PDFMerger />} />
	  <Route path="/tools/pdf-splitter" element={<PDFSplitter />} />
	  <Route path="/tools/dice-roller" element={<DiceRoller />} />
	  <Route path="/tools/fake-data-generator" element={<FakeDataGenerator />} />
	  <Route path="/tools/roman-numerals" element={<RomanNumerals />} />
	  <Route path="/tools/random-number-generator" element={<RandomNumberGenerator />} />
	  <Route path="/tools/timezone-converter" element={<TimeZoneConverter />} />
	  <Route path="/tools/base-converter" element={<BaseConverter />} />
	  <Route path="/tools/ssl-checker" element={<SSLChecker />} />
	  <Route path="/tools/currency-converter" element={<CurrencyConverter />} />
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
