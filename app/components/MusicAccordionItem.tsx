'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { MusicPiece } from '../types';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import StopIcon from './icons/StopIcon';

interface MusicAccordionItemProps {
  piece: MusicPiece;
}

export default function MusicAccordionItem({ piece }: MusicAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stopPlayback = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  return (
    <div className="border-b border-gray-200">
      <div 
        className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="p-1.5 rounded hover:bg-gray-100"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              stopPlayback();
            }}
            className="p-1.5 rounded hover:bg-gray-100"
          >
            <StopIcon />
          </button>
          <span className="ibm-plex-mono-medium text-sm">{piece.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="ibm-plex-mono-light text-xs text-gray-500">
            {new Date(piece.dateAdded).toLocaleDateString()}
          </span>
          <span className={`text-gray-400 text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            +
          </span>
        </div>
      </div>

      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-3 py-2 bg-gray-50">
            {piece.description && (
              <p className="ibm-plex-mono-regular text-sm mb-3">{piece.description}</p>
            )}
            {piece.coverArt && (
              <div className="w-32 h-32 relative mb-3">
                <Image
                  src={piece.coverArt}
                  alt={`Cover art for ${piece.title}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <audio
              ref={audioRef}
              src={piece.audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 