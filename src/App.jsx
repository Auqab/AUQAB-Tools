import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ParticlesBackground from "./components/ParticlesBackground";
import { ToastProvider } from "./components/Toast";
import { LanguageProvider } from "./contexts/LanguageContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import PageProgress from "./components/PageProgress";
import BackToTop from "./components/BackToTop";
import ScrollToTop from "./components/ScrollToTop";

// مكون تحميل مؤقت يظهر أثناء تحميل الأداة
const Loading = () => (
  <div className="tool-page">
    <div className="password-card" style={{ textAlign: "center", padding: 40 }}>
      <p>⏳ Loading tool...</p>
    </div>
  </div>
);

// الصفحات الأساسية (خفيفة، تحميل فوري)
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Premium from "./pages/Premium";
import Services from "./pages/Services";
import RequestService from "./pages/RequestService";
import Pricing from "./pages/Pricing";

// الأدوات – تحميل كسول (من مجلد tools)
const AIGrammarCheck = lazy(() => import("./pages/tools/AIGrammarCheck"));
const AITextSummarizer = lazy(() => import("./pages/tools/AITextSummarizer"));
const AIChatbot = lazy(() => import("./pages/tools/AIChatbot"));
const QRGenerator = lazy(() => import("./pages/tools/QRGenerator"));
const PasswordGenerator = lazy(() => import("./pages/tools/PasswordGenerator"));
const ImageCompressor = lazy(() => import("./pages/tools/ImageCompressor"));
const ImageResizer = lazy(() => import("./pages/tools/ImageResizer"));
const UnitConverter = lazy(() => import("./pages/tools/UnitConverter"));
const TextCounter = lazy(() => import("./pages/tools/TextCounter"));
const TextCaseConverter = lazy(() => import("./pages/tools/TextCaseConverter"));
const JSONFormatter = lazy(() => import("./pages/tools/JSONFormatter"));
const ScriptGenerator = lazy(() => import("./pages/tools/ScriptGenerator"));
const Base64Tool = lazy(() => import("./pages/tools/Base64Tool"));
const BookScanner = lazy(() => import("./pages/tools/BookScanner"));
const URLShortener = lazy(() => import("./pages/tools/URLShortener"));
const ColorPicker = lazy(() => import("./pages/tools/ColorPicker"));
const UUIDGenerator = lazy(() => import("./pages/tools/UUIDGenerator"));
const MarkdownPreviewer = lazy(() => import("./pages/tools/MarkdownPreviewer"));
const DiffChecker = lazy(() => import("./pages/tools/DiffChecker"));
const RegexTester = lazy(() => import("./pages/tools/RegexTester"));
const TextToSlug = lazy(() => import("./pages/tools/TextToSlug"));
const LoremIpsumGenerator = lazy(() => import("./pages/tools/LoremIpsumGenerator"));
const CharFrequencyCounter = lazy(() => import("./pages/tools/CharFrequencyCounter"));
const ImageCropper = lazy(() => import("./pages/tools/ImageCropper"));
const ImageToBase64 = lazy(() => import("./pages/tools/ImageToBase64"));
const ImageFilters = lazy(() => import("./pages/tools/ImageFilters"));
const QRCodeScanner = lazy(() => import("./pages/tools/QRCodeScanner"));
const JWTDecoder = lazy(() => import("./pages/tools/JWTDecoder"));
const CronGenerator = lazy(() => import("./pages/tools/CronGenerator"));
const CodeMinifier = lazy(() => import("./pages/tools/CodeMinifier"));
const SQLFormatterPage = lazy(() => import("./pages/tools/SQLFormatter"));
const HTTPTester = lazy(() => import("./pages/tools/HTTPTester"));
const JSONYAMLConverter = lazy(() => import("./pages/tools/JSONYAMLConverter"));
const CSVtoJSON = lazy(() => import("./pages/tools/CSVtoJSON"));
const HashGenerator = lazy(() => import("./pages/tools/HashGenerator"));
const AESEncryption = lazy(() => import("./pages/tools/AESEncryption"));
const PasswordStrengthMeter = lazy(() => import("./pages/tools/PasswordStrengthMeter"));
const SSLChecker = lazy(() => import("./pages/tools/SSLChecker"));
const CurrencyConverter = lazy(() => import("./pages/tools/CurrencyConverter"));
const TimeZoneConverter = lazy(() => import("./pages/tools/TimeZoneConverter"));
const BaseConverter = lazy(() => import("./pages/tools/BaseConverter"));
const RomanNumerals = lazy(() => import("./pages/tools/RomanNumerals"));
const RandomNumberGenerator = lazy(() => import("./pages/tools/RandomNumberGenerator"));
const DiceRoller = lazy(() => import("./pages/tools/DiceRoller"));
const FakeDataGenerator = lazy(() => import("./pages/tools/FakeDataGenerator"));
const PDFMerger = lazy(() => import("./pages/tools/PDFMerger"));
const PDFSplitter = lazy(() => import("./pages/tools/PDFSplitter"));
const PDFCompressor = lazy(() => import("./pages/tools/PDFCompressor"));
const PDFToImage = lazy(() => import("./pages/tools/PDFToImage"));
const ImagesToPDF = lazy(() => import("./pages/tools/ImagesToPDF"));
const AudioRecorder = lazy(() => import("./pages/tools/AudioRecorder"));
const VideoToGIF = lazy(() => import("./pages/tools/VideoToGIF"));
const TextToSpeech = lazy(() => import("./pages/tools/TextToSpeech"));
const VoiceToText = lazy(() => import("./pages/tools/VoiceToText"));
const AudioVisualizer = lazy(() => import("./pages/tools/AudioVisualizer"));
const IPLookup = lazy(() => import("./pages/tools/IPLookup"));
const WhoisLookup = lazy(() => import("./pages/tools/WhoisLookup"));
const PingTool = lazy(() => import("./pages/tools/PingTool"));
const DNSLookup = lazy(() => import("./pages/tools/DNSLookup"));
const URLEncoderDecoder = lazy(() => import("./pages/tools/URLEncoderDecoder"));
const ScientificCalculator = lazy(() => import("./pages/tools/ScientificCalculator"));
const GraphPlotter = lazy(() => import("./pages/tools/GraphPlotter"));
const EquationSolver = lazy(() => import("./pages/tools/EquationSolver"));
const MatrixCalculator = lazy(() => import("./pages/tools/MatrixCalculator"));
const StopwatchTimer = lazy(() => import("./pages/tools/StopwatchTimer"));
const PomodoroTimer = lazy(() => import("./pages/tools/PomodoroTimer"));
const Checklist = lazy(() => import("./pages/tools/Checklist"));
const NotePad = lazy(() => import("./pages/tools/NotePad"));
const InvoiceGenerator = lazy(() => import("./pages/tools/InvoiceGenerator"));
const QRBusinessCard = lazy(() => import("./pages/tools/QRBusinessCard"));
const PeriodicTable = lazy(() => import("./pages/tools/PeriodicTable"));
const MorseConverter = lazy(() => import("./pages/tools/MorseConverter"));
const ChessTimer = lazy(() => import("./pages/tools/ChessTimer"));
const BinaryHexViewer = lazy(() => import("./pages/tools/BinaryHexViewer"));
const WeatherApp = lazy(() => import("./pages/tools/WeatherApp"));
const BMICalculator = lazy(() => import("./pages/tools/BMICalculator"));
const AgeCalculator = lazy(() => import("./pages/tools/AgeCalculator"));
const DayOfWeekCalculator = lazy(() => import("./pages/tools/DayOfWeekCalculator"));
const RandomQuoteGenerator = lazy(() => import("./pages/tools/RandomQuoteGenerator"));
const EmojiBoard = lazy(() => import("./pages/tools/EmojiBoard"));
const NumberToWords = lazy(() => import("./pages/tools/NumberToWords"));
const TipCalculator = lazy(() => import("./pages/tools/TipCalculator"));
const PercentageCalculator = lazy(() => import("./pages/tools/PercentageCalculator"));
const PasswordMemeInfo = lazy(() => import("./pages/tools/PasswordMemeInfo"));
const PrivacyVault = lazy(() => import("./pages/tools/PrivacyVault"));

// صفحات أخرى
const NotFound = lazy(() => import("./pages/NotFound"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Changelog = lazy(() => import("./pages/Changelog"));
const Games = lazy(() => import("./pages/games/Games"));
const Backgrounds = lazy(() => import("./pages/backgrounds/Backgrounds"));
const BackgroundGenerator = lazy(() => import("./pages/backgrounds/BackgroundGenerator"));


function App() {
  return (
    <ToastProvider>
     <ThemeProvider>
       <LanguageProvider>
        <FavoritesProvider>
          <div className="app">
            <ParticlesBackground />
            <Navbar />
            <PageProgress />
            <main className="main-content">
              <Suspense fallback={<Loading />}>
                <ScrollToTop />
                <Routes>
		  <Route path="/backgrounds" element={<Backgrounds />} />
		  <Route path="/backgrounds/generator" element={<BackgroundGenerator />} />
		  <Route path="/backgrounds" element={<BackgroundGenerator />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/changelog" element={<Changelog />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/tools/privacy-vault" element={<PrivacyVault />} />
                  <Route path="/tools/ai-grammar-check" element={<AIGrammarCheck />} />
                  <Route path="/tools/ai-text-summarizer" element={<AITextSummarizer />} />
                  <Route path="/tools/ai-chatbot" element={<AIChatbot />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/premium" element={<Premium />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/request-service" element={<RequestService />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/cookies" element={<Cookies />} />

                  <Route path="/tools/qr-generator" element={<QRGenerator />} />
                  <Route path="/tools/password-generator" element={<PasswordGenerator />} />
                  <Route path="/tools/image-compressor" element={<ImageCompressor />} />
                  <Route path="/tools/image-resizer" element={<ImageResizer />} />
                  <Route path="/tools/unit-converter" element={<UnitConverter />} />
                  <Route path="/tools/word-counter" element={<TextCounter />} />
                  <Route path="/tools/text-case-converter" element={<TextCaseConverter />} />
                  <Route path="/tools/json-formatter" element={<JSONFormatter />} />
                  <Route path="/tools/script-generator" element={<ScriptGenerator />} />
                  <Route path="/tools/base64-tool" element={<Base64Tool />} />
                  <Route path="/tools/book-scanner" element={<BookScanner />} />
                  <Route path="/tools/url-shortener" element={<URLShortener />} />
                  <Route path="/tools/color-picker" element={<ColorPicker />} />
                  <Route path="/tools/uuid-generator" element={<UUIDGenerator />} />
                  <Route path="/tools/markdown-previewer" element={<MarkdownPreviewer />} />
                  <Route path="/tools/diff-checker" element={<DiffChecker />} />
                  <Route path="/tools/regex-tester" element={<RegexTester />} />
                  <Route path="/tools/text-to-slug" element={<TextToSlug />} />
                  <Route path="/tools/lorem-generator" element={<LoremIpsumGenerator />} />
                  <Route path="/tools/char-frequency-counter" element={<CharFrequencyCounter />} />
                  <Route path="/tools/image-cropper" element={<ImageCropper />} />
                  <Route path="/tools/image-to-base64" element={<ImageToBase64 />} />
                  <Route path="/tools/image-filters" element={<ImageFilters />} />
                  <Route path="/tools/qr-scanner" element={<QRCodeScanner />} />
                  <Route path="/tools/jwt-debugger" element={<JWTDecoder />} />
                  <Route path="/tools/cron-generator" element={<CronGenerator />} />
                  <Route path="/tools/code-minifier" element={<CodeMinifier />} />
                  <Route path="/tools/sql-formatter" element={<SQLFormatterPage />} />
                  <Route path="/tools/http-tester" element={<HTTPTester />} />
                  <Route path="/tools/json-yaml-converter" element={<JSONYAMLConverter />} />
                  <Route path="/tools/csv-to-json" element={<CSVtoJSON />} />
                  <Route path="/tools/hash-generator" element={<HashGenerator />} />
                  <Route path="/tools/aes-encryption" element={<AESEncryption />} />
                  <Route path="/tools/password-strength-meter" element={<PasswordStrengthMeter />} />
                  <Route path="/tools/ssl-checker" element={<SSLChecker />} />
                  <Route path="/tools/currency-converter" element={<CurrencyConverter />} />
                  <Route path="/tools/timezone-converter" element={<TimeZoneConverter />} />
                  <Route path="/tools/base-converter" element={<BaseConverter />} />
                  <Route path="/tools/roman-numerals" element={<RomanNumerals />} />
                  <Route path="/tools/random-number-generator" element={<RandomNumberGenerator />} />
                  <Route path="/tools/dice-roller" element={<DiceRoller />} />
                  <Route path="/tools/fake-data-generator" element={<FakeDataGenerator />} />
                  <Route path="/tools/pdf-merger" element={<PDFMerger />} />
                  <Route path="/tools/pdf-splitter" element={<PDFSplitter />} />
                  <Route path="/tools/pdf-compressor" element={<PDFCompressor />} />
                  <Route path="/tools/pdf-to-image" element={<PDFToImage />} />
                  <Route path="/tools/images-to-pdf" element={<ImagesToPDF />} />
                  <Route path="/tools/audio-recorder" element={<AudioRecorder />} />
                  <Route path="/tools/video-to-gif" element={<VideoToGIF />} />
                  <Route path="/tools/text-to-speech" element={<TextToSpeech />} />
                  <Route path="/tools/voice-to-text" element={<VoiceToText />} />
                  <Route path="/tools/audio-visualizer" element={<AudioVisualizer />} />
                  <Route path="/tools/ip-lookup" element={<IPLookup />} />
                  <Route path="/tools/whois-lookup" element={<WhoisLookup />} />
                  <Route path="/tools/ping-tool" element={<PingTool />} />
                  <Route path="/tools/dns-lookup" element={<DNSLookup />} />
                  <Route path="/tools/url-encoder-decoder" element={<URLEncoderDecoder />} />
                  <Route path="/tools/scientific-calculator" element={<ScientificCalculator />} />
                  <Route path="/tools/graph-plotter" element={<GraphPlotter />} />
                  <Route path="/tools/equation-solver" element={<EquationSolver />} />
                  <Route path="/tools/matrix-calculator" element={<MatrixCalculator />} />
                  <Route path="/tools/stopwatch-timer" element={<StopwatchTimer />} />
                  <Route path="/tools/pomodoro-timer" element={<PomodoroTimer />} />
                  <Route path="/tools/checklist" element={<Checklist />} />
                  <Route path="/tools/notepad" element={<NotePad />} />
                  <Route path="/tools/invoice-generator" element={<InvoiceGenerator />} />
                  <Route path="/tools/qr-business-card" element={<QRBusinessCard />} />
                  <Route path="/tools/periodic-table" element={<PeriodicTable />} />
                  <Route path="/tools/morse-converter" element={<MorseConverter />} />
                  <Route path="/tools/chess-timer" element={<ChessTimer />} />
                  <Route path="/tools/binary-hex-viewer" element={<BinaryHexViewer />} />
                  <Route path="/tools/weather-app" element={<WeatherApp />} />
                  <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
                  <Route path="/tools/age-calculator" element={<AgeCalculator />} />
                  <Route path="/tools/day-of-week" element={<DayOfWeekCalculator />} />
                  <Route path="/tools/random-quote" element={<RandomQuoteGenerator />} />
                  <Route path="/tools/emoji-board" element={<EmojiBoard />} />
                  <Route path="/tools/number-to-words" element={<NumberToWords />} />
                  <Route path="/tools/tip-calculator" element={<TipCalculator />} />
                  <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
                  <Route path="/tools/password-meme" element={<PasswordMemeInfo />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <BackToTop />
          </div>
          </FavoritesProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
