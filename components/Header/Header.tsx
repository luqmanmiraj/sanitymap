import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import Seasons from './seasons';
import Months from '../Months/Months';
import DatePicker from '../DatePicker/DatePicker';
import Who from '../Who/who';
import More from '../More/More';

interface HeaderProps {
  selectedSeason: any;
  handleSeasonsSelected: (season: any) => void;
  fetchEvents: () => void;
}

const Header: React.FC<HeaderProps> = ({ selectedSeason, handleSeasonsSelected, fetchEvents }) => {
  const [showModal, setShowModal] = useState(false);
  const [showWhoModal, setShowWhoModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [whoModalPosition, setWhoModalPosition] = useState({ top: 0, left: 0 });
  const [moreModalPosition, setMoreModalPosition] = useState({ top: 0, left: 0 });
  const [activeTab, setActiveTab] = useState('seasons');
  const [selectedText, setSelectedText] = useState('When');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const whoButtonRef = useRef<HTMLButtonElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const [whoButtonText, setWhoButtonText] = useState('Who');
  const [moreButtonText, setMoreButtonText] = useState(0);


  const toggleModal = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top: rect.bottom + window.scrollY, left: rect.left + rect.width / 2 + window.scrollX });
    setShowModal(!showModal);
    setShowWhoModal(false);
    setShowMoreModal(false);
  };

  const toggleWhoModal = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setWhoModalPosition({ top: rect.bottom + window.scrollY, left: rect.left + rect.width / 2 + window.scrollX });
    setShowWhoModal(!showWhoModal);
    setShowModal(false);
    setShowMoreModal(false);
  };

  const toggleMoreModal = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMoreModalPosition({ top: rect.bottom + window.scrollY, left: rect.left + rect.width / 2 + window.scrollX });
    setShowMoreModal(!showMoreModal);
    setShowModal(false);
    setShowWhoModal(false);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSelection = (selection: string) => {
    setSelectedText(selection);
    setShowModal(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const season = urlParams.get('season');
    const seasonFromUrl = season ? season.charAt(0).toUpperCase() + season.slice(1).toLowerCase() : undefined;
    const month = urlParams.get('month');
    const monthFromUrl = month ? month.charAt(0).toUpperCase() + month.slice(1).toLowerCase() : undefined;
    const dateRangeFromUrl = urlParams.get('dateRange');
    const travellers = urlParams.get('travellers');
    const explorerTypes = urlParams.get('explorerTypes')?.split(',').filter(value => value !== '') || [];
    const budget = urlParams.get('budget') || 'Low-cost';
    const accessibility = urlParams.get('accessibility')?.split(',').filter(value => value !== '') || [];
    const languages = urlParams.get('languages')?.split(',').filter(value => value !== '') || [];

    if (seasonFromUrl) {
      handleSeasonsSelected(seasonFromUrl);
      setSelectedText(seasonFromUrl);
    } else if (monthFromUrl) {
      // Handle month selection if needed
      setSelectedText(monthFromUrl);
    } else if (dateRangeFromUrl) {
      const [start, end] = dateRangeFromUrl.split('_');
      const selectionText = `${new Date(start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} to ${new Date(end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      handleSelection(selectionText);
      setSelectedText(selectionText);
    }

    if (travellers) {
      const travellersArray = travellers.split(',');
      if (travellersArray.length > 1) {
        setWhoButtonText('Who +');
      } else {
        setWhoButtonText('Who');
      }
    }
    const count = explorerTypes.length +
      (budget && budget !== '' ? 1 : 0) +
      accessibility.length +
      languages.length;

    setMoreButtonText(count > 1 ? count : 0);
  }, [handleSeasonsSelected, handleSelection, showWhoModal]);

  useEffect(() => {
    if (showModal || showWhoModal || showMoreModal) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [showModal, showWhoModal, showMoreModal]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const img = new Image();
      img.src = '/images/map-main.jpg';
      img.onload = () => setBgImageLoaded(true);
    }
  }, [isVisible]);

  return (
    <>
      <header
        ref={headerRef}
        className={`relative w-full h-[306px] bg-cover bg-center rounded-[30px] sm:h-60 transition-opacity transition-transform duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ backgroundImage: bgImageLoaded ? `url('/images/map-main.jpg')` : 'none', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-[30px]">
          <div className="container mx-auto h-full flex flex-col justify-center items-center px-4 py-6">
            <h1 className="text-white lg:text-6xl text-2xl md:text-4xl font-bold text-center font-serif">Personalize your experience</h1>
            <nav className="flex flex-col justify-center items-center w-full max-w-md">
              <div className="bg-[#A3A3A34D] bg-opacity-30 backdrop-blur-md rounded-full flex justify-center w-full max-w-[386px] h-[70px] mt-[30px] sm:h-[60px] border border-[#BDBDBD66] p-2 sm:p-1">
                <button ref={buttonRef} onClick={toggleModal} className={`px-4 flex-grow font-['Proxima Nova'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center hover:bg-opacity-50 hover:backdrop-blur-lg hover:shadow-lg hover:scale-105 transition-all duration-200 rounded-full h-full ${showModal === true ? ' outline-none bg-white focus:bg-white focus:text-black focus:outline-none text-black' : 'text-white'}`}>
                  {selectedText === 'Spring' && (
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7"
                    >
                      <rect width="64" height="64" rx="32" fill={"#889D1E"} />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M32.9264 20.3743C32.8208 20.2722 32.7024 20.1909 32.5763 20.1305C32.3944 20.0434 32.1971 20 32 20C31.6653 20 31.331 20.1254 31.0737 20.3743C28.6382 22.7018 27.1232 25.7968 26.7529 29.097C24.3718 27.5236 21.5634 26.6667 18.6667 26.6667C17.9303 26.6667 17.3334 27.2636 17.3334 28C17.3334 36.1002 23.8999 42.6667 32 42.6667C40.1002 42.6667 46.6667 36.1002 46.6667 28C46.6667 27.2636 46.0698 26.6667 45.3334 26.6667C42.3449 26.6667 39.5652 27.5605 37.247 29.0953C36.8763 25.7958 35.3614 22.7014 32.9264 20.3743ZM32 23.2852C30.158 25.5071 29.1995 28.352 29.345 31.2668C29.3453 31.2712 29.3455 31.2755 29.3456 31.2799C30.4469 32.4496 31.3391 33.782 31.9981 35.219C32.6674 33.7616 33.5686 32.4328 34.6544 31.2798L34.655 31.2668C34.8006 28.352 33.8421 25.5071 32 23.2852ZM30.5829 39.9172C30.2667 37.2562 29.0661 34.7621 27.152 32.8481C25.2379 30.934 22.7438 29.7333 20.0828 29.4171C20.7293 34.9119 25.0881 39.2707 30.5829 39.9172ZM43.9174 29.416C38.4217 30.062 34.0621 34.4217 33.416 39.9173C38.9117 39.2713 43.2713 34.9117 43.9174 29.416Z"
                        fill="white"
                      />
                    </svg>
                  )}
                  {selectedText === 'Summer' && (
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7"
                    >
                      <rect width="64" height="64" rx="32" fill={"#FFAD29"} />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M32 36C34.2092 36 36 34.2092 36 32C36 29.7909 34.2092 28 32 28C29.7909 28 28 29.7909 28 32C28 34.2092 29.7909 36 32 36ZM32 38.6667C35.6819 38.6667 38.6667 35.6819 38.6667 32C38.6667 28.3181 35.6819 25.3334 32 25.3334C28.3181 25.3334 25.3334 28.3181 25.3334 32C25.3334 35.6819 28.3181 38.6667 32 38.6667Z"
                        fill="white"
                      />
                      <path
                        d="M30.6666 20C30.6666 19.2636 31.2636 18.6666 32 18.6666C32.7363 18.6666 33.3333 19.2636 33.3333 20V21.3333C33.3333 22.0697 32.7363 22.6666 32 22.6666C31.2636 22.6666 30.6666 22.0697 30.6666 21.3333V20Z"
                        fill="white"
                      />
                      <path
                        d="M23.5146 25.4011C24.0353 25.9218 24.8795 25.9218 25.4002 25.4011C25.9209 24.8804 25.9209 24.0362 25.4002 23.5155L24.4574 22.5727C23.9367 22.052 23.0925 22.052 22.5718 22.5727C22.0511 23.0934 22.0511 23.9376 22.5718 24.4583L23.5146 25.4011Z"
                        fill="white"
                      />
                      <path
                        d="M41.4281 22.573C40.9074 22.0523 40.0632 22.0523 39.5425 22.573L38.5997 23.5158C38.079 24.0365 38.079 24.8807 38.5997 25.4014C39.1204 25.9221 39.9646 25.9221 40.4853 25.4014L41.4281 24.4586C41.9488 23.9379 41.9488 23.0937 41.4281 22.573Z"
                        fill="white"
                      />
                      <path
                        d="M25.4005 38.599C24.8798 38.0783 24.0355 38.0783 23.5148 38.599L22.572 39.5418C22.0513 40.0625 22.0513 40.9067 22.572 41.4274C23.0927 41.9481 23.9369 41.9481 24.4576 41.4274L25.4005 40.4846C25.9211 39.9639 25.9211 39.1197 25.4005 38.599Z"
                        fill="white"
                      />
                      <path
                        d="M41.4279 41.4271C40.9072 41.9478 40.063 41.9478 39.5423 41.4271L38.5995 40.4843C38.0788 39.9636 38.0788 39.1194 38.5995 38.5987C39.1202 38.078 39.9644 38.078 40.4851 38.5987L41.4279 39.5415C41.9486 40.0622 41.9486 40.9064 41.4279 41.4271Z"
                        fill="white"
                      />
                      <path
                        d="M32 41.3333C31.2636 41.3333 30.6666 41.9302 30.6666 42.6666V44C30.6666 44.7363 31.2636 45.3333 32 45.3333C32.7363 45.3333 33.3333 44.7363 33.3333 44V42.6666C33.3333 41.9302 32.7363 41.3333 32 41.3333Z"
                        fill="white"
                      />
                      <path
                        d="M44 30.6666C44.7363 30.6666 45.3333 31.2636 45.3333 32C45.3333 32.7363 44.7363 33.3333 44 33.3333H42.6666C41.9302 33.3333 41.3333 32.7363 41.3333 32C41.3333 31.2636 41.9302 30.6666 42.6666 30.6666H44Z"
                        fill="white"
                      />
                      <path
                        d="M22.6666 32C22.6666 31.2636 22.0697 30.6666 21.3333 30.6666H20C19.2636 30.6666 18.6666 31.2636 18.6666 32C18.6666 32.7363 19.2636 33.3333 20 33.3333H21.3333C22.0697 33.3333 22.6666 32.7363 22.6666 32Z"
                        fill="white"
                      />
                    </svg>
                  )}
                  {
                    selectedText == 'Autumn' && (
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-7 h-7"
                      >
                        <rect width="64" height="64" rx="32" fill={"#721931"} />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M42.6666 20H37.3146C25.8798 20 20.1815 24.7906 19.9864 32.9449L19.9822 33.6317C20.0017 35.9609 20.533 37.9549 22.1159 39.9201C21.7533 41.1466 21.4965 42.4577 21.3415 43.8528C21.2601 44.5846 21.7875 45.2439 22.5194 45.3252C23.2513 45.4065 23.9105 44.8791 23.9918 44.1472C24.102 43.1552 24.2678 42.2177 24.4918 41.3333H28C37.6783 41.3333 43.332 35.6774 43.9978 24.0764L44 21.3333C44 20.597 43.403 20 42.6666 20ZM25.418 38.6667H28C36.0951 38.6667 40.5996 34.2931 41.3014 24.4945L41.3333 24V22.6667H37.3146C27.0949 22.6667 22.6671 26.5077 22.648 33.3294L22.6488 33.6166C22.6589 34.8248 22.8361 35.8734 23.3211 36.8801C24.9935 33.6152 27.6694 31.1323 31.4584 29.4483C32.1314 29.1492 32.9193 29.4522 33.2184 30.1251C33.5175 30.7981 33.2144 31.586 32.5415 31.8851C29.1203 33.4056 26.7992 35.6385 25.418 38.6667Z"
                          fill="white"
                        />
                      </svg>
                    )}
                  {
                    selectedText == 'Winter' && (
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-7 h-7"
                      >
                        <rect width="64" height="64" rx="32" fill={"#079EA5"} />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M33.3246 18.5112C33.2476 17.8481 32.6841 17.3334 32.0003 17.3334C31.2639 17.3334 30.667 17.9303 30.667 18.6667V20.508L29.9299 20.1408L29.7868 20.0793C29.1593 19.8516 28.4468 20.1255 28.141 20.7371C27.8117 21.3957 28.0787 22.1966 28.7373 22.5259L30.667 23.4907V26.5502L27.9555 28.126L25.2974 26.5913L25.4267 24.4377L25.4271 24.2819C25.3899 23.6154 24.8582 23.0678 24.1757 23.0269C23.4406 22.9827 22.809 23.5429 22.7648 24.2779L22.7143 25.1L21.1197 24.1792L20.9806 24.1092C20.3678 23.8443 19.6402 24.075 19.2983 24.6672C18.9302 25.3049 19.1487 26.1204 19.7864 26.4886L21.381 27.4094L20.6945 27.8639L20.5696 27.9571C20.0587 28.3867 19.9397 29.1406 20.3164 29.7113C20.7222 30.3258 21.5493 30.495 22.1638 30.0893L23.964 28.9007L26.6131 30.43L26.622 33.5659L23.9639 35.1006L22.1635 33.9118L22.0288 33.8336C21.433 33.5325 20.6929 33.7192 20.3161 34.2898C19.9104 34.9043 20.0797 35.7314 20.6942 36.1371L21.3808 36.5919L19.7861 37.5125L19.6559 37.598C19.1201 37.9963 18.9562 38.7417 19.2981 39.3339C19.6662 39.9716 20.4817 40.1901 21.1194 39.8219L22.7142 38.9014L22.7646 39.7232L22.7828 39.8778C22.8994 40.5351 23.4928 41.0152 24.1754 40.9742C24.9104 40.9301 25.4706 40.2984 25.4264 39.5634L25.2972 37.41L27.9475 35.8798L30.6677 37.44V40.5094L28.7381 41.4741L28.603 41.5517C28.0444 41.9171 27.836 42.6514 28.1418 43.263C28.4711 43.9216 29.272 44.1886 29.9307 43.8593L30.6677 43.492V45.3334L30.6767 45.4889C30.7537 46.152 31.3173 46.6667 32.001 46.6667C32.7374 46.6667 33.3344 46.0698 33.3344 45.3334V43.492L34.0714 43.8593L34.2145 43.9208C34.8421 44.1485 35.5545 43.8746 35.8603 43.263C36.1896 42.6044 35.9226 41.8035 35.264 41.4741L33.3344 40.5094V37.4497L36.0451 35.8739L38.7032 37.4086L38.5733 39.563L38.5729 39.7188C38.6101 40.3853 39.1418 40.9329 39.8243 40.9739C40.5594 41.018 41.1911 40.4579 41.2352 39.7228L41.2851 38.8992L42.8803 39.8216L43.0194 39.8915C43.6322 40.1564 44.3598 39.9257 44.7017 39.3335C45.0699 38.6958 44.8514 37.8804 44.2136 37.5122L42.6196 36.5905L43.3056 36.1368L43.4304 36.0437C43.9413 35.614 44.0603 34.8601 43.6836 34.2895C43.2778 33.675 42.4508 33.5057 41.8362 33.9115L40.0365 35.0991L37.3869 33.5704L37.3775 30.4339L40.0356 28.8992L41.8365 30.089L41.9712 30.1671C42.5671 30.4682 43.3071 30.2815 43.6839 29.7109C44.0896 29.0964 43.9204 28.2693 43.3058 27.8636L42.6176 27.4085L44.2139 26.4882L44.3441 26.4027C44.8799 26.0045 45.0439 25.259 44.702 24.6669C44.3338 24.0291 43.5183 23.8106 42.8806 24.1788L41.2854 25.0985L41.2355 24.2776L41.2172 24.1229C41.1006 23.4656 40.5072 22.9856 39.8246 23.0265C39.0896 23.0707 38.5295 23.7023 38.5736 24.4374L38.7023 26.5898L36.0535 28.1202L33.3336 26.56V23.4907L35.2632 22.5259L35.3983 22.4484C35.957 22.0829 36.1653 21.3487 35.8595 20.7371C35.5302 20.0785 34.7293 19.8115 34.0707 20.1408L33.3336 20.508V18.6667L33.3246 18.5112ZM29.2799 30.4413L29.2894 33.5751L32.0101 35.135L34.7201 33.5594L34.7107 30.4242L31.9911 28.8651L29.2799 30.4413Z"
                          fill="white"
                        />
                      </svg>
                    )
                  }

                  {selectedText}</button>
                <button ref={whoButtonRef} onClick={toggleWhoModal} className={`px-4 flex-grow font-['Proxima Nova'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center hover:bg-opacity-50 hover:backdrop-blur-lg hover:shadow-lg hover:scale-105 transition-all duration-200 focus:bg-white focus:text-black focus:outline-none rounded-full h-full ${showWhoModal == true ? ' outline-none bg-white focus:bg-white focus:text-black focus:outline-none text-black' : 'text-white'}`}>
                  {
                    whoButtonText
                  }
                </button>
                <button
                  ref={moreButtonRef}
                  onClick={toggleMoreModal}
                  data-more-button
                  className={`px-4 flex-grow font-['Proxima Nova'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center hover:bg-opacity-50 hover:backdrop-blur-lg hover:shadow-lg hover:scale-105 transition-all duration-200 focus:bg-white focus:text-black focus:outline-none rounded-full h-full ${showMoreModal == true ? ' outline-none bg-white focus:bg-white focus:text-black focus:outline-none text-black' : 'text-white'}`}
                >
                  <span className="bg-white text-black rounded-full w-6 h-6 text-sm flex items-center justify-center mr-2">
                    {moreButtonText}
                  </span>
                  More +
                </button>
              </div>
            </nav>
            <div className="flex items-center justify-center text-white text-sm pt-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M16.929 13.4134C18.5509 13.4134 19.8658 12.0871 19.8658 10.4509C19.8658 8.81477 18.5509 7.4884 16.929 7.4884C15.3071 7.4884 13.9922 8.81477 13.9922 10.4509C13.9922 12.0871 15.3071 13.4134 16.929 13.4134Z"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M15.1675 16.2771H18.7431C20.7784 16.2771 22.4692 17.7659 22.8028 19.7229C22.9349 20.499 22.3479 21.2101 21.5669 21.2101H12.3437C11.5627 21.2101 10.9757 20.499 11.1078 19.7229C11.4414 17.7659 13.1322 16.2771 15.1675 16.2771Z"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M14.0964 11.1223L8.98621 16.2773L2.25234 9.54935L2.24314 9.54007C1.13518 8.45276 0.726283 6.82981 1.18535 5.34013C1.64442 3.85046 2.89286 2.74796 4.41725 2.48563C5.69913 2.26547 6.99356 2.6712 7.92174 3.55185L7.95686 3.58728L8.9628 4.61554L9.99467 3.61427L10.0407 3.56956C10.9237 2.73278 12.1387 2.3262 13.3578 2.48057L13.5619 2.51178C15.0737 2.78086 16.3121 3.87829 16.7695 5.357C17.048 6.25621 17.0095 7.20433 16.6917 8.05461"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
              <span className='text-[16px]'>SORT YOUR MATCHES</span>
            </div>

          </div>
        </div>
      </header>
      {showModal && (
        <div className="fixed z-50" style={{ top: modalPosition.top, left: window.innerWidth > 768 ? modalPosition.left - 225 : 0, width: window.innerWidth < 450 ? '100%' : 'auto' }}>
          <div className="bg-white sm:w-[550px] w-[450px] p-4 pb-8 border border-white relative rounded-lg shadow-md" style={{ width: window.innerWidth < 450 ? '100%' : 'auto' }}>
            <button onClick={toggleModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="bg-[#E0E0E1] bg-opacity-30 backdrop-blur-md rounded-full flex justify-center items-center w-full max-w-[250px] md:max-w-[350px] h-[70px] mt-[30px] sm:h-[60px] border border-[#BDBDBD66] p-2 sm:p-1 mx-auto">
              <button onClick={() => handleTabClick('seasons')} className={`relative px-4 flex-grow font-['Proxima Nova'] text-[16px] leading-[18px] text-center flex items-center justify-center rounded-full h-full ${activeTab === 'seasons' ? 'bg-white text-black' : 'text-black hover:bg-opacity-50 hover:backdrop-blur-lg hover:shadow-lg hover:scale-105 transition-all duration-200 focus:bg-[#FFFFFF] focus:text-black focus:outline-none'}`}>
                Seasons
                <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[1px] h-[70%] bg-gray-400 hover:w-[2px] transition-all duration-200"></span>
              </button>
              <button onClick={() => handleTabClick('months')} className={`relative px-4 flex-grow font-['Proxima Nova'] text-[16px] leading-[18px] text-center flex items-center justify-center rounded-full h-full ${activeTab === 'months' ? 'bg-white text-black' : 'text-black hover:bg-opacity-50 hover:backdrop-blur-lg hover:shadow-lg hover:scale-105 transition-all duration-200 focus:bg-[#FFFFFF] focus:text-black focus:outline-none'}`}>
                Months
                <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[1px] h-[70%] bg-gray-400 hover:w-[2px] transition-all duration-200"></span>
              </button>
              <button onClick={() => handleTabClick('dates')} className={`relative px-4 flex-grow font-['Proxima Nova'] text-[16px] leading-[18px] text-center flex items-center justify-center rounded-full h-full ${activeTab === 'dates' ? 'bg-white text-black' : 'text-black hover:bg-opacity-50 hover:backdrop-blur-lg hover:shadow-lg hover:scale-105 transition-all duration-200 focus:bg-[#FFFFFF] focus:text-black focus:outline-none'}`}>
                Dates
              </button>
            </div>
            {activeTab === 'seasons' && <Seasons fetchEvents={fetchEvents} handleSelection={handleSelection} />}
            {activeTab === 'months' && <Months fetchEvents={fetchEvents} handleSelection={handleSelection} />}
            {activeTab === 'dates' && <DatePicker fetchEvents={fetchEvents} handleSelection={handleSelection} />}
          </div>
        </div>
      )}
      {showWhoModal &&
        <div className="fixed z-50" style={{ top: whoModalPosition.top, left: window.innerWidth > 768 ? whoModalPosition.left - 270 : 0, width: window.innerWidth < 450 ? '100%' : 'auto' }}>
          <div className="bg-white sm:w-[550px] w-[450px]  p-4 pb-8 border border-white relative rounded-lg shadow-md" style={{ width: window.innerWidth < 450 ? '100%' : '' }}>
            <button onClick={() => setShowWhoModal(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Who fetchEvents={fetchEvents} />
          </div>
        </div>}
      {showMoreModal &&
        <div className="fixed z-50" style={{ top: moreModalPosition.top, left: window.innerWidth > 768 ? moreModalPosition.left - 365 : 0, width: window.innerWidth < 450 ? '100%' : 'auto' }}>
          <div className="bg-white w-[730px]  p-4 pb-8  border border-white relative shadow-md rounded-lg  " style={{ width: window.innerWidth < 650 ? '100%' : '' }}>
            <button onClick={() => setShowMoreModal(false)} className="absolute top-6 right-6 text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <More />
          </div>
        </div>}
    </>
  );
};

export default Header;
