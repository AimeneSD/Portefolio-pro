import { useState } from 'react';

const socials = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aimene-saoud/',
    color: '#0274b3',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16" className="relative z-10 w-[30px] h-[30px]">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/AimeneSD',
    color: '#24262a',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16" className="relative z-10 w-[30px] h-[30px]">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'resume',
    label: 'CV',
    color: '#049f19',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16" className="relative z-10 w-[30px] h-[30px]">
        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0m2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755" fill="currentColor" />
      </svg>
    ),
    subItems: [
      {
        id: 'cv-dev',
        label: 'Développeur',
        href: `${import.meta.env.BASE_URL}fichiers/CV_aimene_saoud_developpeur.pdf`,
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-code-slash" viewBox="0 0 16 16">
            <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>
          </svg>
        )
      },
      {
        id: 'cv-admin',
        label: 'Admin Sys & Support',
        href: `${import.meta.env.BASE_URL}fichiers/CV_aimene_saoud_technicien_info.pdf`,
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-database-fill-gear" viewBox="0 0 16 16">
            <path d="M8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1"/>
            <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12 12 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7m6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.55 4.55 0 0 1 .23-2.002m-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-1.3-1.905m3.631-4.538c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
          </svg>
        )
      }
    ]
  },
  {
    id: 'mail',
    label: 'Mail',
    href: 'mailto:aimenesaoud@gmail.com',
    color: '#ff0000',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16" className="relative z-10 w-[30px] h-[30px]">
        <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
        <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
      </svg>
    ),
  },
];

const Socials = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <ul className="flex flex-col fixed top-4/5 max-md:top-2/7 right-0  mr-4 -translate-y-1/2 items-center gap-0 list-none z-10">
      {socials.map((s) => {
        const bgStyle = { backgroundColor: s.color };
        const isMenuOpen = openMenu === s.id;

        return (
          <li key={s.id} className="relative mx-2.5 py-2">
            {s.subItems ? (
              <div
                onClick={() => toggleMenu(s.id)}
                className="group relative flex justify-center items-center w-[50px] h-[50px] text-[#4d4d4d] transition-all duration-300 ease-in-out hover:text-white cursor-pointer"
              >
                <div className={`relative overflow-hidden flex justify-center items-center w-full h-full rounded-full hover:shadow-[3px_2px_45px_0px_rgba(0,255,0,0.15)] ${isMenuOpen ? 'text-white shadow-[3px_2px_45px_0px_rgba(0,255,0,0.15)]' : 'bg-white text-[#4d4d4d]'}`}>
                  <div
                    className={`absolute top-0 right-0 h-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    style={bgStyle}
                  />
                  {s.svg}
                </div>
                {/* Tooltip for the main CV button - hidden when sub menu is open */}
                {!isMenuOpen && (
                  <div
                    className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-[calc(100%+12px)] opacity-0 invisible text-white px-2.5 py-1.5 rounded-[5px] text-sm whitespace-nowrap transition-all duration-300 ease-in-out translate-x-2 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0"
                    style={bgStyle}
                  >
                    {s.label}
                  </div>
                )}
                
                {/* Sub items container, pops up to the left */}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 right-[calc(100%+12px)] flex gap-3 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-4'}`}
                  onClick={(e) => e.stopPropagation()} // Prevent closing menu when clicking inside
                >
                  {s.subItems.map(sub => (
                    <a 
                      key={sub.id} 
                      href={sub.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group/sub relative flex justify-center items-center w-[45px] h-[45px] text-white rounded-full shadow-lg transition-transform hover:scale-110"
                      style={bgStyle}
                      aria-label={sub.label}
                    >
                      {sub.svg}
                      {/* Sub Tooltip below */}
                      <div className="pointer-events-none absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 invisible text-white px-2.5 py-1 rounded-[5px] text-xs whitespace-nowrap transition-all duration-300 ease-in-out group-hover/sub:opacity-100 group-hover/sub:visible shadow-md" style={bgStyle}>
                        {sub.label}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                aria-label={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex justify-center items-center w-[50px] h-[50px] text-[#4d4d4d] transition-all duration-300 ease-in-out hover:text-white"
              >
                {/* Icon wrapper */}
                <div className="relative overflow-hidden flex justify-center items-center w-full h-full rounded-full hover:shadow-[3px_2px_45px_0px_rgba(0,255,0,0.15)] bg-white">
                  <div
                    className="absolute top-0 right-0 h-full w-0 transition-all duration-300 ease-in-out group-hover:w-full"
                    style={bgStyle}
                  />
                  {s.svg}
                </div>
                {/* Tooltip */}
                <div
                  className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-[calc(100%+12px)] opacity-0 invisible text-white px-2.5 py-1.5 rounded-[5px] text-sm whitespace-nowrap transition-all duration-300 ease-in-out translate-x-2 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0"
                  style={bgStyle}
                >
                  {s.label}
                </div>
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Socials;
