import { useState, useEffect } from 'react'
import Quiz from '../components/quiz/Quiz'
import { quizQuestions } from '../data/quizData'
import Carousel from '../components/Carousel'
import { carouselSlides } from '../data/carouselData'
import HomeLab from './HomeLab'
import { FaServer, FaRocket, FaNetworkWired, FaDatabase, FaHome, FaQuestionCircle } from 'react-icons/fa'
import { SiProxmox, SiNginx, SiDocker, SiKubernetes } from 'react-icons/si'

function App() {
  const [showHomeLab, setShowHomeLab] = useState(false);
  const [animatedIcons, setAnimatedIcons] = useState(false);
  
  useEffect(() => {
    // Déclencher l'animation des icônes après chargement
    setTimeout(() => {
      setAnimatedIcons(true);
    }, 500);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 dark:from-base-100 dark:to-base-200">
      {/* Navbar */}
      <nav className="bg-base-100 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary flex items-center">
            <FaServer className="text-primary mr-2" /> HomeLAB
          </h1>
          <div>
            {showHomeLab && (
              <button 
                className="bg-base-200 dark:bg-base-300 hover:bg-base-300 dark:hover:bg-base-200 text-base-content font-medium py-2 px-4 rounded-lg shadow transition-all duration-300 flex items-center"
                onClick={() => setShowHomeLab(false)}
              >
                <FaHome className="mr-2" /> Accueil
              </button>
            )}
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        {!showHomeLab ? (
          <div className="space-y-12 animate-fadeIn">
            <div className="text-center mb-12 pt-8">
              <h2 className="text-4xl font-bold mb-4 text-base-content">Bienvenue dans mon univers HomeLAB</h2>
              <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
                Découvrez ma passion pour l'infrastructure informatique et les technologies auto-hébergées.
              </p>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-2xl mb-12 transform transition-all duration-500 hover:shadow-primary/20">
              <Carousel slides={carouselSlides} />
            </div>
            
            <div className="bg-base-100 rounded-xl shadow-xl border border-base-300 overflow-hidden">
              <div className="grid grid-cols-2 divide-x divide-base-300">
                <div className="p-6 flex items-center justify-center bg-base-200">
                  <FaQuestionCircle className="text-2xl text-primary mr-3" />
                  <h2 className="text-xl font-bold text-base-content">Testez vos connaissances</h2>
                </div>
                <div className="p-6 flex items-center justify-center bg-base-200">
                  <FaRocket className="text-2xl text-secondary mr-3" />
                  <h2 className="text-xl font-bold text-base-content">Ma configuration HomeLAB</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4 text-center text-base-content/80">
                  Relevez le défi avec ce quiz de {quizQuestions.length} questions sur les technologies utilisées dans les HomeLAB.
                </div>
                <center>
                <Quiz />
                </center>
                <div className="mt-6 text-center">
                  <button 
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-content font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
                    onClick={() => setShowHomeLab(true)}
                  >
                    <FaRocket className="mr-2" /> Explorer mon HomeLAB
                  </button>
                </div>
              </div>
            </div>
            
            <div className={`mt-16 transition-all duration-1000 ${animatedIcons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-center text-2xl font-bold mb-10 text-base-content">Technologies utilisées</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
                <div className="bg-base-100 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col items-center group">
                  <SiProxmox className="text-5xl text-accent mb-4 transform transition-transform duration-500 group-hover:scale-[1.25] group-hover:rotate-6" />
                  <span className="font-medium text-base-content group-hover:font-semibold transition-all">Proxmox</span>
                </div>
                <div className="bg-base-100 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col items-center group">
                  <SiDocker className="text-5xl text-primary mb-4 transform transition-transform duration-500 group-hover:scale-[1.25] group-hover:rotate-6" />
                  <span className="font-medium text-base-content group-hover:font-semibold transition-all">Docker</span>
                </div>
                <div className="bg-base-100 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col items-center group">
                  <SiNginx className="text-5xl text-success mb-4 transform transition-transform duration-500 group-hover:scale-[1.25] group-hover:rotate-6" />
                  <span className="font-medium text-base-content group-hover:font-semibold transition-all">Nginx</span>
                </div>
                <div className="bg-base-100 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col items-center group">
                  <FaDatabase className="text-5xl text-secondary mb-4 transform transition-transform duration-500 group-hover:scale-[1.25] group-hover:rotate-6" />
                  <span className="font-medium text-base-content group-hover:font-semibold transition-all">Databases</span>
                </div>
                <div className="bg-base-100 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col items-center group">
                  <FaNetworkWired className="text-5xl text-info mb-4 transform transition-transform duration-500 group-hover:scale-[1.25] group-hover:rotate-6" />
                  <span className="font-medium text-base-content group-hover:font-semibold transition-all">Réseau</span>
                </div>
                <div className="bg-base-100 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col items-center group">
                  <SiKubernetes className="text-5xl text-primary mb-4 transform transition-transform duration-500 group-hover:scale-[1.25] group-hover:rotate-6" />
                  <span className="font-medium text-base-content group-hover:font-semibold transition-all">Kubernetes</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <HomeLab />
          </div>
        )}
      </div>
      
    </div>
  )
}

export default App
