import React, { useState, useRef, useEffect } from 'react';
import Seasons from './seasons';
import Months from '../Months/Months';
import DatePicker from '../DatePicker/DatePicker';
import Who from '../Who/who';
import More from '../More/More';

const Header = ({ selectedSeason, handleSeasonsSelected }) => {
  const [showModal, setShowModal] = useState(false);
  const [showWhoModal, setShowWhoModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [whoModalPosition, setWhoModalPosition] = useState({ top: 0, left: 0 });
  const [moreModalPosition, setMoreModalPosition] = useState({ top: 0, left: 0 });
  const [activeTab, setActiveTab] = useState('seasons');
  const buttonRef = useRef(null);
  const whoButtonRef = useRef(null);
  const moreButtonRef = useRef(null);

  const toggleModal = (event) => {
    const rect = event.target.getBoundingClientRect();
    setModalPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX - 290 }); // Center horizontally
    setShowModal(!showModal);
    setShowWhoModal(false);
    setShowMoreModal(false);
  };

  const toggleWhoModal = (event) => {
    const rect = event.target.getBoundingClientRect();
    setWhoModalPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX - 290 }); // Center horizontally
    setShowWhoModal(!showWhoModal);
    setShowModal(false);
    setShowMoreModal(false);
  };

  const toggleMoreModal = (event) => {
    const rect = event.target.getBoundingClientRect();
    setMoreModalPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX - 290 }); // Center horizontally
    setShowMoreModal(!showMoreModal);
    setShowModal(false);
    setShowWhoModal(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    if (showModal || showWhoModal || showMoreModal) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [showModal, showWhoModal, showMoreModal]);

  return (
    <>
      <header className="relative w-full h-[306px] bg-cover bg-center rounded-[30px] sm:h-60" style={{ backgroundImage: `url('/images/map-main.jpg')`, backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-[30px]">
          <div className="container mx-auto h-full flex flex-col justify-center items-center px-4 py-6">
            <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-bold text-center font-serif">Personalize your experience</h1>
            <nav className="flex flex-col justify-center items-center w-full max-w-md">
              <div className="bg-[#A3A3A34D] bg-opacity-30 backdrop-blur-md rounded-full flex justify-center w-full max-w-[386px] h-[70px] mt-[30px] sm:h-[60px] border border-[#BDBDBD66] p-2 sm:p-1">
                <button ref={buttonRef} onClick={toggleModal} className={`px-4 flex-grow font-['Proxima Nova'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center hover:bg-opacity-50 hover:backdrop-blur-lg hover:shadow-lg hover:scale-105 transition-all duration-200 rounded-full h-full ${showModal === true ? ' outline-none bg-white focus:bg-white focus:text-black focus:outline-none text-black' : 'text-white'}`}>When</button>
                <button ref={whoButtonRef} onClick={toggleWhoModal} className={`px-4 flex-grow font-['Proxima Nova'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center hover:bg-opacity-50 hover:backdrop-blur-lg hover:shadow-lg hover:scale-105 transition-all duration-200 focus:bg-white focus:text-black focus:outline-none rounded-full h-full ${showWhoModal == true ? ' outline-none bg-white focus:bg-white focus:text-black focus:outline-none text-black' : 'text-white'}`}>Who</button>
                <button ref={moreButtonRef} onClick={toggleMoreModal} className={`px-4 flex-grow font-['Proxima Nova'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center hover:bg-opacity-50 hover:backdrop-blur-lg hover:shadow-lg hover:scale-105 transition-all duration-200 focus:bg-white focus:text-black focus:outline-none rounded-full h-full ${showMoreModal == true ? ' outline-none bg-white focus:bg-white focus:text-black focus:outline-none text-black' : 'text-white'}`}>More +</button>
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
        <div className="fixed z-50" style={{ top: modalPosition.top, left: modalPosition.left }}>
          <div className="bg-white w-[657px] p-4 pb-8  border border-white relative rounded-lg shadow-md">
            <button onClick={toggleModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="bg-[#E0E0E1] bg-opacity-30 backdrop-blur-md rounded-full flex justify-center items-center w-full max-w-[300px] h-[70px] mt-[30px] sm:h-[60px] border border-[#BDBDBD66] p-2 sm:p-1 mx-auto">
              <button onClick={() => handleTabClick('seasons')} className={`px-4 flex-grow font-['Proxima Nova']  text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center rounded-full h-full ${activeTab === 'seasons' ? 'bg-white text-black' : 'text-black hover:bg-opacity-50 hover:backdrop-blur-lg hover:shadow-lg hover:scale-105 transition-all duration-200 focus:bg-[#FFFFFF] focus:text-black focus:outline-none'}`}>Seasons</button>
              <button onClick={() => handleTabClick('months')} className={`px-4 flex-grow font-['Proxima Nova'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center rounded-full h-full ${activeTab === 'months' ? 'bg-white text-black' : 'text-black hover:bg-opacity-50 hover:backdrop-blur-lg hover:shadow-lg hover:scale-105 transition-all duration-200 focus:bg-[#FFFFFF] focus:text-black focus:outline-none'}`}>Months</button>
              <button onClick={() => handleTabClick('dates')} className={`px-4 flex-grow font-['Proxima Nova'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center rounded-full h-full ${activeTab === 'dates' ? 'bg-white text-black' : 'text-black hover:bg-opacity-50 hover:backdrop-blur-lg hover:shadow-lg hover:scale-105 transition-all duration-200 focus:bg-[#FFFFFF] focus:text-black focus:outline-none'}`}>Dates</button>
            </div>
            {activeTab === 'seasons' && <Seasons selectedSeason={selectedSeason} handleSeasonsSelected={handleSeasonsSelected} />}
            {activeTab === 'months' && <Months handleSeasonsSelected={handleSeasonsSelected} />}
            {activeTab === 'dates' && <DatePicker handleSeasonsSelected={handleSeasonsSelected} />}
          </div>
        </div>
      )}
      {showWhoModal &&
        <div className="fixed z-50" style={{ top: whoModalPosition.top, left: whoModalPosition.left + 50 }}>
          <div className="bg-white w-[580px] p-4 pb-8  border border-white relative rounded-lg shadow-md">
            <button onClick={() => setShowWhoModal(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Who />
          </div>
        </div>}
      {showMoreModal &&
        <div className="fixed z-50" style={{ top: moreModalPosition.top, left: moreModalPosition.left }}>
          <div className="bg-white w-[730px]  p-4 pb-8  border border-white relative shadow-md rounded-lg  ">
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
