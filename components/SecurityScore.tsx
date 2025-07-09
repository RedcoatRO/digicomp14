
import React from 'react';

interface SecurityScoreProps {
    score: number;
}

const SecurityScore: React.FC<SecurityScoreProps> = ({ score }) => {
    const size = 120;
    const strokeWidth = 10;
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;

    const offset = circumference - (score / 100) * circumference;

    const scoreColor = score < 40 ? 'text-red-400' : score < 80 ? 'text-amber-400' : 'text-green-400';
    const ringColor = score < 40 ? 'stroke-red-400' : score < 80 ? 'stroke-amber-400' : 'stroke-green-400';

    return (
        <div className="flex flex-col items-center justify-center bg-gray-700/50 p-6 rounded-lg">
            <div className="relative" style={{ width: size, height: size }}>
                <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                    {/* Background circle */}
                    <circle
                        className="text-gray-600"
                        strokeWidth={strokeWidth}
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx={center}
                        cy={center}
                    />
                    {/* Progress circle */}
                    <circle
                        className={`${ringColor} transition-all duration-500 ease-in-out`}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx={center}
                        cy={center}
                        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                    />
                </svg>
                <div className={`absolute inset-0 flex flex-col items-center justify-center ${scoreColor}`}>
                    <span className="text-3xl font-bold">{score}</span>
                </div>
            </div>
            <h3 className="text-lg font-semibold mt-4">Security Score</h3>
            <p className="text-sm text-gray-400">Higher is better</p>
        </div>
    );
};

export default SecurityScore;
