import React, { useState } from 'react';

const travellers = [
  { label: 'Solo', icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0003 2.66797C12.3184 2.66797 9.33366 5.65274 9.33366 9.33463C9.33366 13.0165 12.3184 16.0013 16.0003 16.0013C19.6822 16.0013 22.667 13.0165 22.667 9.33463C22.667 5.65274 19.6822 2.66797 16.0003 2.66797ZM16.0003 5.33464C18.2095 5.33464 20.0003 7.1255 20.0003 9.33464C20.0003 11.5438 18.2095 13.3346 16.0003 13.3346C13.7912 13.3346 12.0003 11.5438 12.0003 9.33464C12.0003 7.1255 13.7912 5.33464 16.0003 5.33464ZM25.3275 25.0454C25.1761 21.4977 22.252 18.668 18.667 18.668H13.3337L13.0445 18.6741C9.49673 18.8255 6.66699 21.7496 6.66699 25.3346V28.0013L6.67596 28.1568C6.75298 28.8199 7.31654 29.3346 8.00033 29.3346C8.73671 29.3346 9.33366 28.7377 9.33366 28.0013L9.33366 25.3346L9.34045 25.0996C9.46211 22.9999 11.2034 21.3346 13.3337 21.3346H18.667L18.902 21.3414C21.0018 21.4631 22.667 23.2044 22.667 25.3346V28.0013L22.676 28.1568C22.753 28.8199 23.3165 29.3346 24.0003 29.3346C24.7367 29.3346 25.3337 28.7377 25.3337 28.0013V25.3346L25.3275 25.0454Z" fill="white"/>
  </svg>
   },
  { label: 'Couple', icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.6665C8.31812 2.6665 5.33335 5.65127 5.33335 9.33317C5.33335 13.0151 8.31812 15.9998 12 15.9998C15.6819 15.9998 18.6667 13.0151 18.6667 9.33317C18.6667 5.65127 15.6819 2.6665 12 2.6665ZM12 5.33317C14.2092 5.33317 16 7.12403 16 9.33317C16 11.5423 14.2092 13.3332 12 13.3332C9.79088 13.3332 8.00002 11.5423 8.00002 9.33317C8.00002 7.12403 9.79088 5.33317 12 5.33317ZM21.3272 25.044C21.1758 21.4962 18.2517 18.6665 14.6667 18.6665H9.33335L9.04417 18.6727C5.49643 18.8241 2.66669 21.7482 2.66669 25.3332L2.66669 27.9998L2.67566 28.1553C2.75268 28.8185 3.31624 29.3332 4.00002 29.3332C4.7364 29.3332 5.33335 28.7362 5.33335 27.9998L5.33335 25.3332L5.34014 25.0981C5.46181 22.9984 7.20311 21.3332 9.33335 21.3332H14.6667L14.9017 21.34C17.0015 21.4616 18.6667 23.2029 18.6667 25.3332V27.9998L18.6757 28.1553C18.7527 28.8185 19.3162 29.3332 20 29.3332C20.7364 29.3332 21.3334 28.7362 21.3334 27.9998V25.3332L21.3272 25.044ZM20.0417 3.84245C20.2243 3.12908 20.9507 2.69885 21.6641 2.8815C24.6139 3.63679 26.6771 6.29482 26.6771 9.33984C26.6771 12.3849 24.6139 15.0429 21.6641 15.7982C20.9507 15.9808 20.2243 15.5506 20.0417 14.8372C19.859 14.1239 20.2893 13.3975 21.0026 13.2148C22.7726 12.7617 24.0105 11.1668 24.0105 9.33984C24.0105 7.51283 22.7726 5.91801 21.0026 5.46484C20.2893 5.28219 19.859 4.55582 20.0417 3.84245ZM24.3333 18.9088C23.6203 18.7248 22.8931 19.1535 22.709 19.8665C22.5249 20.5795 22.9537 21.3068 23.6667 21.4908C25.4245 21.9447 26.6563 23.5254 26.6667 25.3408L26.6667 27.9998L26.6757 28.1553C26.7527 28.8184 27.3162 29.3332 28 29.3332C28.7364 29.3332 29.3334 28.7362 29.3334 27.9998V25.3332L29.3249 25.0312C29.1781 22.1262 27.1654 19.64 24.3333 18.9088Z" fill="white"/>
  </svg>
   },
  { label: 'Family', icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.224 1.92591C10.6325 1.3132 11.4603 1.14764 12.073 1.55611C14.3076 3.04585 16.0001 6.67253 16.0001 9.33217C16.0001 10.0686 15.4031 10.6655 14.6668 10.6655C13.9304 10.6655 13.3334 10.0686 13.3334 9.33217C13.3334 7.51562 12.0366 4.73678 10.5938 3.77491C9.98113 3.36644 9.81556 2.53861 10.224 1.92591ZM23.4065 4.88951C22.7938 4.48098 21.966 4.64647 21.5574 5.25914C21.1489 5.8718 21.3144 6.69964 21.9271 7.10817C24.3386 8.71622 25.992 11.2364 26.5066 14.0889C26.5721 14.4519 26.785 14.7715 27.0948 14.9718L27.2545 15.0866C27.7645 15.4924 28.0482 16.1255 28.0044 16.784C27.9562 17.5084 27.5193 18.1498 26.8628 18.4598L26.7249 18.5352C26.4595 18.7012 26.2595 18.9564 26.1627 19.2576C24.7451 23.6693 20.6413 26.6611 16.0074 26.6611C11.3736 26.6611 7.26979 23.6693 5.85218 19.2576C5.73928 18.9063 5.4858 18.6174 5.15208 18.4598L4.97861 18.3673C4.41936 18.0325 4.05427 17.4426 4.01047 16.784C3.96228 16.0597 4.31044 15.366 4.92008 14.9718L5.04676 14.8789C5.28766 14.6793 5.45212 14.4 5.50825 14.0889C6.01248 11.2941 7.6104 8.81575 9.94796 7.20298C10.5541 6.7848 10.7064 5.95444 10.2882 5.34832C9.87006 4.7422 9.0397 4.58985 8.43358 5.00803L8.07319 5.26561C5.58457 7.10743 3.81793 9.75574 3.06975 12.7507L2.99077 13.0895L2.81317 13.2477C1.80451 14.1938 1.25599 15.5525 1.34968 16.961L1.37675 17.2408C1.54163 18.5374 2.24201 19.6972 3.29207 20.4478L3.4881 20.5788L3.56929 20.798C5.54266 25.913 10.4726 29.3277 16.0074 29.3277L16.3926 29.3222C21.77 29.168 26.5181 25.7941 28.4456 20.798L28.5254 20.5788L28.7228 20.4478C29.8479 19.6436 30.5715 18.3696 30.6652 16.961L30.6754 16.6801C30.6837 15.3732 30.1431 14.1307 29.2017 13.2477L29.0241 13.0895L28.9494 12.768C28.1509 9.55309 26.1798 6.73876 23.4065 4.88951ZM20.2666 20.3798C19.7406 19.8644 18.8964 19.873 18.3811 20.399C17.7541 21.0389 16.896 21.3995 16.0001 21.3995C15.1043 21.3995 14.2461 21.0389 13.6192 20.399C13.1038 19.873 12.2596 19.8644 11.7336 20.3798C11.2076 20.8952 11.199 21.7393 11.7144 22.2653C12.8429 23.4171 14.3876 24.0662 16.0001 24.0662C17.6126 24.0662 19.1573 23.4171 20.2858 22.2653C20.8012 21.7393 20.7926 20.8952 20.2666 20.3798ZM17.7334 1.86551C17.2916 1.2764 16.4559 1.15701 15.8668 1.59884C15.2777 2.04067 15.1583 2.8764 15.6001 3.46551C17.3325 5.77535 18.0001 7.51115 18.0001 9.33217C18.0001 10.0686 18.5971 10.6655 19.3334 10.6655C20.0698 10.6655 20.6668 10.0686 20.6668 9.33217C20.6668 6.88652 19.7905 4.60829 17.7334 1.86551ZM12.0134 14.6655C12.7498 14.6655 13.3468 15.2625 13.3468 15.9988C13.3468 16.6826 12.832 17.2462 12.1689 17.3232L12.0001 17.3322C11.2637 17.3322 10.6668 16.7352 10.6668 15.9988C10.6668 15.3151 11.1815 14.7515 11.8446 14.6745L12.0134 14.6655ZM21.3468 15.9988C21.3468 15.2625 20.7498 14.6655 20.0134 14.6655L19.8446 14.6745C19.1815 14.7515 18.6668 15.3151 18.6668 15.9988C18.6668 16.7352 19.2637 17.3322 20.0001 17.3322L20.1689 17.3232C20.8321 17.2462 21.3468 16.6826 21.3468 15.9988Z" fill="white"/>
  </svg>
  
   },
  { label: 'Friends', icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.33333 9.33463C9.33333 5.65274 12.3181 2.66797 16 2.66797C19.6819 2.66797 22.6667 5.65274 22.6667 9.33463C22.6667 13.0165 19.6819 16.0013 16 16.0013C12.3181 16.0013 9.33333 13.0165 9.33333 9.33463ZM20 9.33464C20 7.1255 18.2091 5.33464 16 5.33464C13.7909 5.33464 12 7.1255 12 9.33464C12 11.5438 13.7909 13.3346 16 13.3346C18.2091 13.3346 20 11.5438 20 9.33464ZM2 22.668C2 18.9861 4.98477 16.0013 8.66667 16.0013C12.3486 16.0013 15.3333 18.9861 15.3333 22.668C15.3333 26.3499 12.3486 29.3346 8.66667 29.3346C4.98477 29.3346 2 26.3499 2 22.668ZM12.6667 22.668C12.6667 20.4588 10.8758 18.668 8.66667 18.668C6.45753 18.668 4.66667 20.4588 4.66667 22.668C4.66667 24.8771 6.45753 26.668 8.66667 26.668C10.8758 26.668 12.6667 24.8771 12.6667 22.668ZM23.3333 16.0013C19.6514 16.0013 16.6667 18.9861 16.6667 22.668C16.6667 26.3499 19.6514 29.3346 23.3333 29.3346C27.0152 29.3346 30 26.3499 30 22.668C30 18.9861 27.0152 16.0013 23.3333 16.0013ZM23.3333 18.668C25.5425 18.668 27.3333 20.4588 27.3333 22.668C27.3333 24.8771 25.5425 26.668 23.3333 26.668C21.1242 26.668 19.3333 24.8771 19.3333 22.668C19.3333 20.4588 21.1242 18.668 23.3333 18.668Z" fill="white"/>
  </svg>
   },
];

const ChooseTravellers = () => {
  const [selectedTravellers, setSelectedTravellers] = useState<string[]>([]);

  const handleTravellerClick = (label: string) => {
    const updatedTravellers = selectedTravellers.includes(label)
      ? selectedTravellers.filter(traveller => traveller !== label)
      : [...selectedTravellers, label];

    setSelectedTravellers(updatedTravellers);

    const url = new URL(window.location.href);
    url.searchParams.set('travellers', updatedTravellers.map(traveller => traveller.toLowerCase()).join(','));
    window.history.pushState({}, '', url.pathname + url.search);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white">
      <div className="flex justify-center  items-center text-center w-full">
        <h2 className="text-xl font-bold text-black text-center items-center">Choose your travellers</h2>
      </div>
      <div className="flex justify-around w-full mt-4">
        {travellers.map((traveller) => (
          <div
            key={traveller.label}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleTravellerClick(traveller.label)}
          >
            <div
              className={`flex items-center justify-center w-16 h-16 rounded-full text-3xl ${
                selectedTravellers.includes(traveller.label) || selectedTravellers.length === 0 ? 'bg-teal-500 text-white' : 'bg-gray-500 text-white'
              }`}
            >
              {traveller.icon}
            </div>
            <span className="mt-2 text-black">{traveller.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseTravellers;