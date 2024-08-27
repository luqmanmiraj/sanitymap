import React, { useState, useRef } from 'react';
import Seasons from './seasons';
import Months from '../Months/Months';
import DatePicker from '../DatePicker/DatePicker';
import Who from '../Who/who';
import More from '../More/more'; // Import the More component

const Header = ({selectedSeason, handleSeasonsSelected}) => {
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

  return (
    <>
      <header className="relative w-full h-[306px] bg-cover bg-center rounded-[30px] sm:h-60" style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1675705847874-42dc5e36750f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, backgroundSize: '100% 100%' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-[30px]">
          <div className="container mx-auto h-full flex flex-col justify-center items-center px-4 py-6">
            <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-bold text-center">Personalize your experience</h1>
            <nav className="flex flex-col justify-center items-center w-full max-w-md">
              <div className="bg-[#A3A3A34D] bg-opacity-30 backdrop-blur-md rounded-full flex justify-center w-full max-w-[386px] h-[70px] mt-[30px] sm:h-[60px] border border-[#BDBDBD66] p-2 sm:p-1">
                <button ref={buttonRef} onClick={toggleModal} className="text-white px-4 flex-grow font-['var(--FontFamilyParagraph)'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center hover:bg-opacity-50 focus:bg-white focus:text-black focus:outline-none rounded-full h-full">When</button>
                <button ref={whoButtonRef} onClick={toggleWhoModal} className="text-white px-4 flex-grow font-['var(--FontFamilyParagraph)'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center hover:bg-opacity-50 focus:bg-white focus:text-black focus:outline-none rounded-full h-full">Who</button>
                <button ref={moreButtonRef} onClick={toggleMoreModal} className="text-white px-4 flex-grow font-['var(--FontFamilyParagraph)'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center hover:bg-opacity-50 focus:bg-white focus:text-black focus:outline-none rounded-full h-full">More +</button>
              </div>
            </nav>
          </div>
        </div>
      </header>
      {showModal && (
        <div className="fixed z-50" style={{ top: modalPosition.top, left: modalPosition.left }}>
          <div className="bg-white w-[580px] p-4 pb-8  border border-white relative">
            <button onClick={toggleModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="bg-[#E0E0E1] bg-opacity-30 backdrop-blur-md rounded-full flex justify-center items-center w-full max-w-[300px] h-[70px] mt-[30px] sm:h-[60px] border border-[#BDBDBD66] p-2 sm:p-1 mx-auto">
                <button onClick={() => handleTabClick('seasons')} className={`px-4 flex-grow font-['var(--FontFamilyParagraph)'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center rounded-full h-full ${activeTab === 'seasons' ? 'bg-white text-black' : 'text-black hover:bg-opacity-50 focus:bg-[#FFFFFF] focus:text-black focus:outline-none'}`}>Seasons</button>
                <button onClick={() => handleTabClick('months')} className={`px-4 flex-grow font-['var(--FontFamilyParagraph)'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center rounded-full h-full ${activeTab === 'months' ? 'bg-white text-black' : 'text-black hover:bg-opacity-50 focus:bg-[#FFFFFF] focus:text-black focus:outline-none'}`}>Months</button>
                <button onClick={() => handleTabClick('dates')} className={`px-4 flex-grow font-['var(--FontFamilyParagraph)'] text-[18px] sm:text-[14px] lg:text-[20px] leading-[18px] text-center flex items-center justify-center rounded-full h-full ${activeTab === 'dates' ? 'bg-white text-black' : 'text-black hover:bg-opacity-50 focus:bg-[#FFFFFF] focus:text-black focus:outline-none'}`}>Dates</button>
              </div>
          {activeTab === 'seasons' && <Seasons selectedSeason={selectedSeason} handleSeasonsSelected={handleSeasonsSelected} />}
          {activeTab === 'months' && <Months handleSeasonsSelected={handleSeasonsSelected} />}
          {activeTab === 'dates' && <DatePicker handleSeasonsSelected={handleSeasonsSelected}   />}
          </div>
        </div>
      )}
      {showWhoModal && 
      <div className="fixed z-50" style={{ top: whoModalPosition.top, left: whoModalPosition.left }}>
        <div className="bg-white w-[580px] p-4 pb-8  border border-white relative">
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
        <div className="bg-white w-[580px] p-4 pb-8  border border-white relative">
            <button onClick={() => setShowMoreModal(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <More /> {/* Call the More component */}
         </div>
      </div>}
    </>
  );
};

export default Header;
