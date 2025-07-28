import React from 'react';
import { EvaluationResult } from '../types';
import { CheckCircleIcon, ErrorIcon } from './Icons';

interface EvaluationModalProps {
    result: EvaluationResult;
}

const EvaluationModal: React.FC<EvaluationModalProps> = ({ result }) => {
    // Mesaj sumar adaptat în funcție de scorul final obținut de utilizator.
    const summaryMessage = result.score >= 80 
        ? "Felicitări! Ai securizat sistemul cu succes, demonstrând o bună înțelegere a uneltelor."
        : result.score >= 50
        ? "Exercițiul s-a încheiat. Ai făcut progrese bune, dar unele vulnerabilități importante au rămas nerezolvate."
        : "Exercițiul s-a încheiat. Sistemul este încă vulnerabil. Încearcă să activezi toate protecțiile data viitoare.";

    return (
        // Containerul principal al modalului, cu un fundal semi-transparent și centrare pe ecran.
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[10001]">
            <div className="bg-white text-black rounded-lg shadow-2xl w-[500px] flex flex-col overflow-hidden animate-[fade-in_0.3s_ease-out]">
                {/* Antetul ferestrei modale */}
                <div className="p-4 bg-gray-100 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-center text-gray-800">Rezultatul Evaluării</h2>
                </div>

                {/* Secțiunea principală cu scorul final */}
                <div className="py-6 px-4 text-center bg-gray-50">
                    <p className="text-gray-500 text-sm font-medium tracking-wider">SCOR FINAL</p>
                    <p className="text-7xl font-bold my-2 text-gray-800">
                        {result.score} <span className="text-5xl text-gray-400">/ {result.maxScore}</span>
                    </p>
                </div>
                
                {/* Secțiunea cu sumarul și detaliile evaluării */}
                <div className="p-6 flex-grow bg-white">
                    <p className="text-center text-gray-600 mb-6">{summaryMessage}</p>
                    
                    <div className="space-y-3">
                        {/* Iterează prin fiecare detaliu al evaluării și afișează-l */}
                        {result.details.map((detail, index) => (
                            <div key={index} className="flex items-start text-sm">
                                <span className={`font-bold w-[110px] flex-shrink-0 ${detail.achieved ? 'text-green-600' : 'text-red-600'}`}>
                                    {detail.achieved ? '[CORECT]' : '[INCORECT]'}
                                </span>
                                <span className="text-gray-700">{detail.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EvaluationModal;

// Animație simplă pentru apariția ferestrei
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}
`;
document.head.appendChild(style);
