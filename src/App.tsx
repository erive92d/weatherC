import './App.css'
import Header from './components/Header/Header';
import Footer from './components/Footer';
import CurrentCity from './components/Body/CurrentCity';

function App() {

  // const [isDark, setIsDark] = useState(false)

  return (
    <div className={`${`from-zinc-700 to-zinc-800 text-gray-200`} flex flex-col min-h-screen bg-gradient-to-r `}>
      <Header />
      <CurrentCity />
      <Footer />
    </div>
  )
}

export default App
