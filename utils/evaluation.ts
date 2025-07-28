import { SystemState, ProtectionStatus, AchievementID, EvaluationResult, EvaluationDetail } from '../types';

/**
 * Punctajul maxim posibil care poate fi atins în evaluare.
 */
export const TARGET_SCORE = 100;

/**
 * Calculează scorul de securitate și generează o listă detaliată de feedback
 * pe baza stării curente a sistemului.
 * 
 * @param state - Starea globală a aplicației (SystemState).
 * @returns Un obiect EvaluationResult care conține scorul, detalii și statistici.
 */
export const calculateScoreAndDetails = (state: SystemState): EvaluationResult => {
    const details: EvaluationDetail[] = [];

    // Criteriul 1: Protecția antivirus este activă (+20 puncte)
    const antivirusActive = state.antivirus === ProtectionStatus.ACTIVE;
    details.push({ text: 'Protecția antivirus în timp real este activă.', achieved: antivirusActive, points: 20 });

    // Criteriul 2: Firewall-ul este activ (+20 puncte)
    const firewallActive = state.firewall.status === ProtectionStatus.ACTIVE;
    details.push({ text: 'Firewall-ul pentru rețea este activ.', achieved: firewallActive, points: 20 });
    
    // Criteriul 3: Toate actualizările de sistem sunt instalate (+20 puncte)
    const allUpdatesInstalled = state.updates.items.every(u => u.status === 'installed');
    details.push({ text: 'Toate actualizările de sistem au fost instalate.', achieved: allUpdatesInstalled, points: 20 });

    // Criteriul 4: Protecția împotriva ransomware este configurată (+15 puncte)
    const ransomwareConfigured = state.ransomwareProtection === 'configured';
    details.push({ text: 'Protecția ransomware (OneDrive) a fost configurată.', achieved: ransomwareConfigured, points: 15 });

    // Criteriul 5: Nicio amenințare activă nu este prezentă pe sistem (+15 puncte)
    const noActiveThreats = state.scan.threatsFound.every(t => t.status !== 'active');
    details.push({ text: 'Nicio amenințare activă nu a fost detectată pe sistem.', achieved: noActiveThreats, points: 15 });

    // Criteriul 6: Tentativa de phishing a fost evitată cu succes (+10 puncte)
    const phishingAvoided = state.achievements.has(AchievementID.PHISH_AVOIDER);
    details.push({ text: 'A fost evitată cu succes o tentativă de phishing.', achieved: phishingAvoided, points: 10 });
    
    // Calculează scorul final prin însumarea punctelor pentru obiectivele atinse.
    const score = details.reduce((acc, detail) => acc + (detail.achieved ? detail.points : 0), 0);
    const tasksCompleted = details.filter(d => d.achieved).length;
    const totalTasks = details.length;

    return {
        score: Math.round(score),
        maxScore: TARGET_SCORE,
        details,
        tasksCompleted,
        totalTasks
    };
};
