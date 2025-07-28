/**
 * Interfața definește structura obiectului trimis prin postMessage.
 * Asigură consistența datelor comunicate către platforma externă.
 */
interface EvaluationPayload {
  type: 'evaluationResult';
  score: number;
  maxScore: number;
  details: string;
  tasksCompleted: number;
  totalTasks: number;
  extractedText: string;
  timestamp: string;
}

/**
 * Construiește și trimite rezultatul evaluării către fereastra părinte (ex: platforma de e-learning).
 * Această funcție este esențială pentru integrarea aplicației într-un sistem mai larg.
 * 
 * @param score - Scorul obținut de utilizator.
 * @param maxScore - Scorul maxim posibil.
 * @param details - Un string cu feedback concatenat despre acțiunile utilizatorului.
 * @param tasksCompleted - Numărul de sarcini finalizate cu succes.
 * @param totalTasks - Numărul total de sarcini posibile.
 */
export const sendEvaluationResult = (
  score: number,
  maxScore: number,
  details: string,
  tasksCompleted: number,
  totalTasks: number,
): void => {
  // Construiește payload-ul conform contractului stabilit.
  const payload: EvaluationPayload = {
    type: 'evaluationResult', // Tipul mesajului, OBLIGATORIU 'evaluationResult'
    score,
    maxScore,
    details,
    tasksCompleted,
    totalTasks,
    // Concatenează scorul și detaliile pentru procesare simplificată
    extractedText: `Scor final: ${score}/${maxScore}. Detalii: ${details}`,
    timestamp: new Date().toISOString(), // Adaugă un timestamp pentru înregistrare
  };

  // Trimite mesajul către fereastra părinte, dacă există.
  // '*' permite comunicarea indiferent de originea ferestrei părinte.
  if (window.parent) {
    window.parent.postMessage(payload, '*');
  }

  // Afișează în consolă obiectul trimis pentru debugging.
  console.log('Trimit rezultat evaluare:', payload);
};
