"use client"
import { ArrowRight, Sun, Moon} from 'lucide-react';
import { questionsData } from './data/Questions';
import { useState } from 'react';

const App = () => {
  const [phase, setPhase] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [wins , setWins] = useState<number>(0);
  const [clickedAnswer, setClickedAnswer] = useState<number | null>(null);
  const [blockNav, setBlockNav] = useState<boolean>(false);
  const [openFinishModal, setOpenFinishModal] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const phaseUpdate = () => {
    if (phase !== questionsData.length -1) {
      if (clickedAnswer !== null) {
      const percentageCalc = ((phase + 1) / questionsData.length * 100);
      setPercentage(percentageCalc);
      setPhase(phase + 1)
      setClickedAnswer(null);
      setBlockNav(false);
      }
    } else {
      setOpenFinishModal(true);
    }
  } 

  const handleAnswer = (index:number) => {
    if(blockNav === true) {
      return;
    } 

    if (index === questionsData[phase].correct && clickedAnswer === null) {
        setWins(w => wins + 1);
        setClickedAnswer(index);
    }

    setClickedAnswer(index);
    setBlockNav(true);
    
  }

   const finishGame = () => {
      setPhase(0);
      setWins(0);
      setPercentage(0);
      setClickedAnswer(null);
      setBlockNav(false);
      setOpenFinishModal(false);
  }

  const darkModeToggle = () => {
    setDarkMode(!darkMode);
  }


  return(
    <section className={`w-full h-dvh flex justify-center items-center transition-all duration-300 md:h-dvh ${darkMode ? 'bg-gray-900' : 'bg-white/90'}`}>
      <div className={`shadow-2xl  h-dvh w-2xl  p-5 md:h-auto md:p-12 overflow-y-auto md:rounded-2xl ${darkMode ? 'bg-gray-900 shadow-sky-700/40' : 'bg-white shadow-black-50'}`}>
        <div className="w-full flex justify-between mb-10">
          
            <div className='flex cursor-pointer'>
              <span className="bg-blue-700 text-5xl font-bold w-14 h-14 mr-5 rounded-lg p-5 mb-5 flex justify-center items-center md:mb-10 hover:scale-105 transition-all duration-300">
                ?
              </span>
              <h1 className={` font-bold text-3xl pt-3 md:text-5xl md:pt-1 ${darkMode ? 'text-white' : 'text-black/80'}`}>
                Quiz
              </h1>
            </div>
            <div 
            onClick={darkModeToggle}
            className={`text-black shadow-md shadow-black/40 rounded-2xl w-12 h-7 flex items-center mt-4 cursor-pointer transition-all duration-300 ${!darkMode ? 'border-2' : 'pl-[19px] border-sky-500 shadow-sky-400/20 border-1' }`}>
              <span className={`border-2  rounded-full shadow-md ${darkMode ? 'bg-black hover:white/80 shadow-sky-400/5' : 'bg-black hover:bg-black/80 shadow-black/30'}`}>
                { darkMode ? <Sun className='text-sky-400' /> : <Moon className='text-white' /> }
              </span>
            </div>
            <h1 className={`font-light text-md pt-5 md:text-2xl md:pt-4 ${darkMode ? 'text-white' : 'text-black'}`}>
              Pontos: {wins}
            </h1>
        </div>

        <div className="w-auto font-sans md:mb-10">
            <h1 className={` text-3xl font-bold mb-6 md:text-4xl ${darkMode ? 'text-white/90' : 'text-gray-700'}`}>
              {questionsData[phase].question}
            </h1>
            <p className={` text-md ${darkMode ? ' text-gray-300' : 'text-gray-600'}`}>
              Pergunta {phase + 1} de {questionsData.length}
            </p>
            
            <div className="w-full bg-blue-500/20 h-2 rounded-2xl mb-10">
              <div style={{width:`${percentage}%`}} className={` transition-all duration-1000  h-2 rounded-2xl ${darkMode ? 'bg-gradient-to-r from-sky-400 to-green-400 ' : 'bg-gradient-to-r from-blue-800 to-blue-400/50'}`}></div>
            </div>
        </div>
        
        <ul className={`w-auto font-sans  flex flex-col gap-3 md:mb-0 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                {questionsData[phase].answers.map((item,index) => (
                  <li
                    key={index}
                    onClick={() => handleAnswer(index)} 
                    className={`flex-1 flex justify-center cursor-pointer border-4 shadow-md md:hover:pl-8 md:justify-start transition-all duration-300 rounded-md md:pl-5 py-2 text-2xl md:text-3xl
                    ${darkMode ? 'bg-gray-700 border-transparent hover:border-sky-500 hover:shadow-sky-400/20' : 'bg-gray-200 border-gray-300 hover:border-blue-400/80 hover:shadow-blue-400/50'}
                    ${clickedAnswer === index && questionsData[phase].correct === index ? 'bg-green-500/50 border-green-500/80 shadow-green-500/50' : ''} 
                    ${clickedAnswer === index && questionsData[phase].correct !== index ? 'bg-red-500/50 border-red-500/80 shadow-red-500/50' : ''}`}>
                    
                    {item}
                  </li>
                ))

                }
                

            <button onClick={phaseUpdate} className="flex-1 flex justify-center items-center cursor-pointer bg-blue-500 shadow-md hover:shadow-blue-400/80 rounded-md text-white text-3xl p-4 mt-5 md:text-4xl" >
              PRÓXIMA 
              <ArrowRight className='w-9 h-9'/>
            </button>
            
        </ul>
      </div>
      {openFinishModal && 
           <section className={`flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-black/80`}>
              <div className={`flex items-center flex-col shadow-2xl shadow-black-50 h-dvh w-2xl rounded-2xl  md:h-auto md:p-12 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>

                <div className='flex my-[150px] md:my-0'>
                  <span className={`bg-blue-700 text-5xl font-bold w-14 h-14 mb-10 mr-5 rounded-lg p-5 flex justify-center items-center `}>
                    ?
                  </span>
                  <h1 className={` font-bold text-3xl pt-3 md:text-5xl md:pt-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                    Quiz
                  </h1>
                </div>



                <h1 className={` text-2xl text-center mx-2 font-bold mb-3 md:text-4xl ${darkMode ? 'text-white/90' : 'text-gray-700'}`}>

                {'Você acertou ' + wins + ' perguntas de ' + questionsData.length + '.'}
                </h1>


                <button onClick={finishGame} className=" flex justify-center items-center cursor-pointer bg-blue-500 shadow-md hover:shadow-blue-400/80 rounded-md text-white text-3xl  md:text-4xl p-4 mt-5 md:flex-1" >
                  RECOMEÇAR 
                  <ArrowRight className='w-9 h-9'/>
                </button>
              </div>
           </section>
        }
    </section>
  )
}

export default App;