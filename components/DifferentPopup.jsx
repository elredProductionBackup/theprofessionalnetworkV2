import { useState } from 'react';
import { professors } from '../data/professors';
import { RxCross2 } from 'react-icons/rx';

export default function DifferentPopup({ isOpen, onClose, professor }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
      <div className="bg-white md:h-[570px] h-[620px] md:w-[800px] w-auto md:mx-0 mx-2 rounded-[30px] md:p-8 md:pt-8 pt-[50px] relative overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-300 shadow-md"
        >
          <RxCross2 size={20} />
        </button>
        <div className="h-full flex flex-col items-center justify-center">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {professors.map((prof, index) => (
              <div
                key={index}
                className="md:w-[230px] md:h-[230px] w-[180px] h-[150px] bg-[#eaf0f7] rounded-[20px] flex flex-col items-center justify-center md:p-4 p-2 border-2 border-white"
                style={{ boxShadow: '8px 8px 20px 4px #98989833' }}
              >
                <img
                  src={prof.image}
                  alt={prof.name}
                  className="md:w-[100px] md:h-[100px] w-[70px] h-[70px] rounded-full object-cover mb-3"
                />

                <h3 className="md:text-[28px] text-[18px] font-inter font-medium leading-[110%] tracking-[-2px] text-black mb-2 text-center">{prof.name}</h3>
                <div className="flex items-center gap-2  md:w-[210px]">
                  <img src={prof.schoolLogo} alt={`${prof.school} logo`} className="md:w-6 md:h-6 w-[12px] h-[12px] object-contain rounded-sm" />
                  <p className="md:text-[14px] text-[10px] text-center text-[#333333] font-regular leading-[140%] font-inter w-auto ">{prof.school}</p>


                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
