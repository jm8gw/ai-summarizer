import Hero from './components/Hero'
import Generate from './components/Generate'

import './App.css'


const App = () => {
  return (
    <main>
        <div className="main">
            <div className="gradient"/>
        </div>

        <div className="app">
            <Hero />
            <Generate />
        </div>

        <footer>
            <p className="font-inter font-bold text-black text-center">© 2024 Jeffrey Mouritzen. All rights reserved.</p>
        </footer>
    </main>

  )
}

export default App