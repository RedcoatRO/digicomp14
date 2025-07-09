import React from 'react';

export const WindowsDefenderIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_105_2)">
            {/* Monitor Body */}
            <path d="M464 428H48c-8.837 0-16-7.163-16-16V80c0-8.837 7.163-16 16-16h416c8.837 0 16 7.163 16 16v332c0 8.837-7.163 16-16 16z" fill="#005B9A"/>
            {/* Monitor Screen */}
            <path d="M448 380H64V96h384v284z" fill="#B3D7F2"/>
            {/* Monitor Stand */}
            <path d="M320 428h-128v-32h128v32z" fill="#00436E"/>
             {/* Power light */}
            <circle cx="56" cy="404" r="8" fill="#6EEF5E"/>
            {/* Shield */}
            <path d="M256 128.5l-120 48v96c0 80 120 120 120 120s120-40 120-120v-96l-120-48z" fill="#3B82F6"/>
            {/* Shield Colors */}
            <path d="M256 137.266V272.5h110v-88.06l-110-47.174z" fill="#4285F4"/>
            <path d="M146 185.441v87.059H256V137.266L146 185.441z" fill="#EA4335"/>
            <path d="M146 272.5v19.124c0 70 110 108.5 110 108.5V272.5H146z" fill="#FBBC05"/>
            <path d="M256 272.5v127.624c0 0 110-38.5 110-108.5V272.5H256z" fill="#34A853"/>
        </g>
        <defs>
            <clipPath id="clip0_105_2">
                <rect width="512" height="512" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);


export const WindowsLogoIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M0 0H9V9H0V0ZM11 0H20V9H11V0ZM0 11H9V20H0V11ZM11 11H20V20H11V11Z"/>
    </svg>
);

export const SearchIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"/>
  </svg>
);

export const WidgetsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <rect x="3" y="3" width="8" height="8" rx="1"></rect>
        <rect x="3" y="13" width="8" height="8" rx="1"></rect>
        <rect x="13" y="3" width="8" height="18" rx="1"></rect>
    </svg>
);

export const FileExplorerIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M5 10C5 8.89543 5.89543 8 7 8H19L24 14H41C42.1046 14 43 14.8954 43 16V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V10Z" fill="#FFCA28"/>
        <path d="M5 18C5 16.8954 5.89543 16 7 16H41C42.1046 16 43 16.8954 43 18V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V18Z" fill="#42A5F5"/>
    </svg>
);

export const SecurityIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
     <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
        <path fillRule="evenodd" d="M10 1.5c.386 0 .74.14 1.008.368l6.25 5.25A1.5 1.5 0 0118 8.24v4.266c0 1.94-.933 3.685-2.453 4.811l-.001.001c-1.52 1.125-3.473 1.93-5.546 1.93s-4.026-.805-5.546-1.93l-.001-.001C3.433 16.19 2.5 14.45 2.5 12.506V8.24a1.5 1.5 0 01.742-1.322l6.25-5.25A1.5 1.5 0 0110 1.5zM3.999 12.5c0 1.514.733 2.91 2.02 3.812C7.31 17.207 8.97 17.88 10 17.88s2.69-.673 3.98-1.568c1.288-.902 2.02-2.298 2.02-3.812V8.531l-5.25-4.41-5.25 4.41v3.97z" clipRule="evenodd"/>
    </svg>
);

export const ControlPanelIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10.5H11.5V3H3V10.5ZM3 21H11.5V12.5H3V21ZM12.5 21H21V10.5H12.5V21ZM12.5 3V8.5H21V3H12.5Z" fill="#42A5F5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const ShieldIcon = ({ className = 'w-6 h-6', color = '#34A853' }: { className?: string, color?: string }) => (
     <svg className={className} fill={color} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 1.5c.386 0 .74.14 1.008.368l6.25 5.25A1.5 1.5 0 0118 8.24v4.266c0 1.94-.933 3.685-2.453 4.811l-.001.001c-1.52 1.125-3.473 1.93-5.546 1.93s-4.026-.805-5.546-1.93l-.001-.001C3.433 16.19 2.5 14.45 2.5 12.506V8.24a1.5 1.5 0 01.742-1.322l6.25-5.25A1.5 1.5 0 0110 1.5zM3.999 12.5c0 1.514.733 2.91 2.02 3.812C7.31 17.207 8.97 17.88 10 17.88s2.69-.673 3.98-1.568c1.288-.902 2.02-2.298 2.02-3.812V8.531l-5.25-4.41-5.25 4.41v3.97z" clipRule="evenodd"/>
    </svg>
);

export const ShieldWarningIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} fill="#FBBC05" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.156 1.119A1.5 1.5 0 008.6 2.373L2.35 12.623a1.5 1.5 0 001.25 2.377h12.5a1.5 1.5 0 001.25-2.377L11.157 2.373a1.5 1.5 0 00-1.001-1.254zM9.9 5.07a.75.75 0 01.75.75v3.12a.75.75 0 01-1.5 0V5.82a.75.75 0 01.75-.75zm.75 6.13a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" />
    </svg>
);

export const ShieldErrorIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
   <svg className={className} fill="#EA4335" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 1.5c.386 0 .74.14 1.008.368l6.25 5.25A1.5 1.5 0 0118 8.24v4.266c0 1.94-.933 3.685-2.453 4.811l-.001.001c-1.52 1.125-3.473 1.93-5.546 1.93s-4.026-.805-5.546-1.93l-.001-.001C3.433 16.19 2.5 14.45 2.5 12.506V8.24a1.5 1.5 0 01.742-1.322l6.25-5.25A1.5 1.5 0 0110 1.5zm-1.03 8.22a.75.75 0 011.06 0l1.25 1.25a.75.75 0 11-1.06 1.06L10 11.06l-1.22 1.22a.75.75 0 01-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 011.06-1.06l1.22 1.22 1.22-1.22a.75.75 0 111.06 1.06L11.06 10l1.22 1.22a.75.75 0 11-1.06 1.06L10 11.06l-1.22 1.22a.75.75 0 01-1.06-1.06l1.22-1.22z" clipRule="evenodd" />
    </svg>
);

export const CheckCircleIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} fill="#34A853" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

export const WarningIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} fill="#FBBC05" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8.257 3.099c.625-1.09 2.13-1.09 2.755 0l5.627 9.847c.625 1.09.07 2.554-1.378 2.554H4.008c-1.448 0-2.002-1.464-1.377-2.554l5.626-9.847zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
);

export const ErrorIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} fill="#EA4335" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);

export const TrophyIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} fill="#FFD700" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M15.5 2h-11a1 1 0 00-1 1v3.586a1 1 0 00.293.707l1.414 1.414a5 5 0 01-2.12 6.071A.5.5 0 004 14.5v2.5a1 1 0 001 1h10a1 1 0 001-1v-2.5a.5.5 0 00-.086-.277 5 5 0 01-2.12-6.071l1.414-1.414A1 1 0 0016.5 6.586V3a1 1 0 00-1-1zm-10-1a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v3a.5.5 0 01-.146.354l-1.414 1.414a5.969 5.969 0 00-1.03 2.232.5.5 0 00.49 1h.22a.5.5 0 01.414.224l.184.275a.5.5 0 00.414.224h.778a.5.5 0 01.447.276l.1.2a.5.5 0 010 .448l-.1.2A.5.5 0 0115 14h-1.5a.5.5 0 00-.5.5v1.5a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5V15a.5.5 0 00-.5-.5H5a.5.5 0 01-.447-.276l-.1-.2a.5.5 0 010-.448l.1-.2A.5.5 0 015 12h.778a.5.5 0 01.414-.224l.184-.275a.5.5 0 00.414-.224h.22a.5.5 0 01.49-1 5.969 5.969 0 00-1.03-2.232L6.146 6.354A.5.5 0 016 6V2.5A.5.5 0 015.5 1z" clipRule="evenodd" /></svg>
);

export const SyncIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg fill="currentColor" viewBox="0 0 20 20" className={className}><path fillRule="evenodd" d="M15.312 11.342a1.25 1.25 0 11-2.124 1.418A4.25 4.25 0 0010 6.5a1.25 1.25 0 01-2.5 0 6.75 6.75 0 0110.104 5.392l-.38-2.09a.5.5 0 00-.964.174l.958 5.27a.5.5 0 00.963-.175l-1.87-10.276a.5.5 0 00-.964-.173l.46 2.533zM4.688 8.658a1.25 1.25 0 112.124-1.418A4.25 4.25 0 0010 13.5a1.25 1.25 0 012.5 0 6.75 6.75 0 01-10.104-5.392l.38 2.09a.5.5 0 00.964-.174l-.958-5.27a.5.5 0 00-.963.175l1.87 10.276a.5.5 0 00.964.173l-.46-2.533z" clipRule="evenodd" /><animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="2s" repeatCount="indefinite"/></svg>
);

export const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" {...props}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
);

export const MaximizeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" {...props}><path d="M4.5 4.5h15v15h-15z"></path></svg>
);

export const MinimizeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" {...props}><path d="M5.5 12h13"></path></svg>
);

export const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 20 20" {...props}><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
);

export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="currentColor" viewBox="0 0 20 20" {...props}><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>;

export const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="currentColor" viewBox="0 0 20 20" {...props}><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>;

export const NotepadIcon = ({ className = 'w-8 h-8' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.75 21.25H4.25C3.01 21.25 2 20.24 2 19V5C2 3.76 3.01 2.75 4.25 2.75H14.25L22 10.5V19C22 20.24 20.99 21.25 19.75 21.25Z" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2.75V10.5H21.75" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 15.25H17" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11.25H11" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
export const CalculatorIcon = ({ className = 'w-8 h-8' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 22H5C3.9 22 3 21.1 3 20V4C3 2.9 3.9 2 5 2H19C20.1 2 21 2.9 21 4V20C21 21.1 20.1 22 19 22Z" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 7.5H7.5" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 11H7.5" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 15.5V18" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.5 15.5H7.5" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 18H7.5" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 15.5H13.5" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
export const SettingsIcon = ({ className = 'w-8 h-8' }: { className?: string }) => <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17a.75.75 0 011.02 0l1.125.956a.75.75 0 00.922.028l1.323-.775a.75.75 0 01.916.916l-.775 1.323a.75.75 0 00.028.922l.956 1.125a.75.75 0 010 1.02l-.956 1.125a.75.75 0 00-.028.922l.775 1.323a.75.75 0 01-.916.916l-1.323-.775a.75.75 0 00-.922.028l-1.125.956a.75.75 0 01-1.02 0l-1.125-.956a.75.75 0 00-.922-.028l-1.323.775a.75.75 0 01-.916-.916l.775-1.323a.75.75 0 00-.028-.922l-.956-1.125a.75.75 0 010-1.02l.956-1.125a.75.75 0 00.028-.922l-.775-1.323a.75.75 0 01.916-.916l1.323.775a.75.75 0 00.922.028l1.125-.956zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>;

export const WifiIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19.5v.01" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 16a5.002 5.002 0 017 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12.5a9.002 9.002 0 0114 0" />
    </svg>
);

export const VolumeIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072M11 20L6 15H2v-6h4l5-5v16z" />
    </svg>
);

export const OneDriveIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 8.5C4.5 5.73858 6.73858 3.5 9.5 3.5C11.6241 3.5 13.4357 4.81467 14.1956 6.61981C14.3989 6.55168 14.6098 6.5 14.8235 6.5C16.4335 6.5 17.75 7.8165 17.75 9.42647C17.75 9.73971 17.6934 10.0426 17.5873 10.3235C18.4206 10.511 19.1206 11.0824 19.5294 11.8529C20.1588 12.9809 19.9206 14.4162 18.9912 15.25C18.8118 15.4029 18.6044 15.5 18.3897 15.5H7.01912C5.62647 15.5 4.5 14.3735 4.5 12.9809C4.5 11.8338 5.22206 10.875 6.18382 10.5294C6.06471 10.2397 6 9.93235 6 9.61029C6 9.20882 6.07794 8.81912 6.22206 8.45588C5.23088 8.45588 4.5 9.17794 4.5 10.1537" fill="#0078D4"/>
    </svg>
);

export const FamilyIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 8a3 3 0 100-6 3 3 0 000 6z" />
        <path fillRule="evenodd" d="M1.5 15.085a5.5 5.5 0 015.5-5.5h6a5.5 5.5 0 015.5 5.5V16a1 1 0 01-1 1H2.5a1 1 0 01-1-1v-.915z" clipRule="evenodd" />
        <path d="M10 8a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
);

export const HistoryIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
);
