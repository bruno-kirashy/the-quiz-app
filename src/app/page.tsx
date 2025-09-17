"use client"
import { ArrowRight } from 'lucide-react';
import { questionsData } from './data/Questions';
import { useState } from 'react';

const App = () => {
  const [phase, setPhase] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [wins , setWins] = useState<number>(0);
  const [clickedAnswer, setClickedAnswer] = useState<number | null>(null);
  const [blockNav, setBlockNav] = useState<boolean>(false);

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
      alert('Fim de jogo!')
      setPhase(0);
      setWins(0);
      setPercentage(0);
      setClickedAnswer(null);
      setBlockNav(false);
    }
  } 

  const handleAnswer = (index:number) => {
    if(blockNav === true) {
      return;
    } else {
        if (index === questionsData[phase].correct && clickedAnswer === null) {
        setWins(w => wins + 1);
        setClickedAnswer(index);
        }
        setClickedAnswer(index);
        setBlockNav(true);
    }
  }




  return(
    <section className="w-full h-dvh bg-white/90 flex justify-center items-center">
      <div className="bg-white shadow-2xl shadow-black-50 h-dvh w-2xl rounded-2xl p-5 md:h-auto md:p-12">
        <div className="w-full flex justify-between">
          
            <div className='flex'>
              <span className="bg-blue-700 text-5xl font-bold w-14 h-14 mb-10 mr-5 rounded-lg p-5 flex justify-center items-center">
                ?
              </span>
              <h1 className="text-black font-bold text-5xl pt-1">
                Quiz
              </h1>
            </div>

            <h1 className='text-black font-light text-2xl pt-4'>
              Pontos: {wins}
            </h1>
        </div>

        <div className="w-auto mb-10 font-sans">
            <h1 className="text-gray-700 text-4xl font-bold mb-3">
              {questionsData[phase].question}
            </h1>
            <p className="text-gray-600">
              Pergunta {phase + 1} de {questionsData.length}
            </p>
            
            <div className="w-full bg-blue-500/20 h-2 rounded-2xl mb-8">
              <div style={{width:`${percentage}%`}} className={` transition-all duration-1000 bg-gradient-to-r from-blue-800 to-blue-400/50 h-2 rounded-2xl`}></div>
            </div>
        </div>
        
        <ul className="w-auto font-sans text-gray-700 flex flex-col gap-3">
                {questionsData[phase].answers.map((item,index) => (
                  <li
                    key={index}
                    onClick={() => handleAnswer(index)} 
                    className={`flex-1 flex justify-center cursor-pointer bg-gray-200 border-4 border-gray-300 shadow-md md:hover:pl-8 md:justify-start transition-all duration-300 rounded-md md:pl-5 py-2 text-3xl 
                    ${clickedAnswer === index ? 'bg-green-500/50 border-green-500/80 shadow-green-500/50' : 'hover:border-blue-400/80 hover:shadow-blue-400/50'} 
                    ${clickedAnswer === index && questionsData[phase].correct !== index ? 'bg-red-500/50 border-red-500/80 shadow-red-500/50' : ''}`}>
                    
                    {item}
                  </li>
                ))

                }
                

            <button onClick={phaseUpdate} className="flex-1 flex justify-center items-center cursor-pointer bg-blue-500 shadow-md hover:shadow-blue-400/80 rounded-md text-white text-4xl p-4 mt-5" >
              PRÓXIMA 
              <ArrowRight className='w-9 h-9'/>
            </button>
            
        </ul>
      </div>
    </section>
  )
}

export default App;