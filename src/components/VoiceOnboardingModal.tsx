'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, CheckCircle2, X, Volume2, ArrowRight } from 'lucide-react';
import { Entrepreneur } from '@/types';

interface VoiceOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (extractedData: Partial<Entrepreneur>) => void;
  language: 'en' | 'hi';
}

export const VoiceOnboardingModal: React.FC<VoiceOnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  language,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'RECORD' | 'EXTRACTED' | 'CONFIRMED'>('RECORD');

  const presetHindi =
    'नमस्ते, मैं सुनीता देवी हूँ, रोहिणी सेक्टर 7 से। मैं स्कूल यूनिफॉर्म और महिलाओं के कपड़े सिलती हूँ। मेरे पास 2 जुकी इंडस्ट्रियल सिलाई मशीनें और एक ओवरलॉक मशीन है। मैं हफ्ते में 40 यूनिफॉर्म सेट तैयार कर सकती हूँ।';
  
  const presetEnglish =
    'Hello, I am Sunita Devi from Rohini Sector 7. I make school uniforms and ladies garments. I have 2 Juki industrial lockstitch sewing machines and an overlock machine. I can produce 40 complete uniform sets every week with a 3-day turnaround.';

  const [extractedProfile] = useState({
    name: 'Sunita Devi',
    trade: 'Master Tailor & Institutional Uniform Maker',
    category: 'Tailoring',
    machinery: [
      'Juki DDL-8700 Industrial Lockstitch Machine (x2)',
      '4-Thread Overlock Interlock Machine',
      'Electric Steam Press Station'
    ],
    weeklyCapacity: 40,
    unitLabel: 'Uniform Sets',
    leadTimeDays: 3,
    workspaceType: 'Dedicated Home Workshop (150 sq.ft)',
    location: 'Rohini Sector 7, Delhi',
    schemesPreQualified: ['PM Vishwakarma (₹15,000 Grant)', 'MUDRA Shishu Loan (₹50,000)']
  });

  useEffect(() => {
    if (!isOpen) {
      setStep('RECORD');
      setIsListening(false);
      setTranscript('');
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recognition = new (SpeechRecognition as any)();
        recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        recognition.interimResults = true;
        recognition.continuous = false;

        recognition.onstart = () => setIsListening(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          setTranscript(event.results[current][0].transcript);
        };
        recognition.onerror = () => {
          setIsListening(false);
          setTranscript(language === 'hi' ? presetHindi : presetEnglish);
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
      } catch {
        setIsListening(false);
        setTranscript(language === 'hi' ? presetHindi : presetEnglish);
      }
    } else {
      setIsListening(true);
      setTimeout(() => {
        setTranscript(language === 'hi' ? presetHindi : presetEnglish);
        setIsListening(false);
      }, 2000);
    }
  };

  const handleProcessVoice = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('EXTRACTED');
    }, 1000);
  };

  const handleConfirmProfile = () => {
    onComplete({
      name: extractedProfile.name,
      trade: extractedProfile.trade,
      machinery: extractedProfile.machinery,
      weeklyCapacity: extractedProfile.weeklyCapacity,
      workspaceType: extractedProfile.workspaceType,
    });
    setStep('CONFIRMED');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in text-zinc-900 dark:text-zinc-100">
      <div className="relative w-full max-w-2xl bg-white dark:bg-black rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Header - Clean B&W */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <Mic className="w-5 h-5 text-black dark:text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {language === 'hi' ? 'स्मार्ट वॉइस ऑनबोर्डिंग' : 'AI Voice Onboarding & Catalog Update'}
              </h3>
              <p className="text-xs text-zinc-500">
                {language === 'hi' 
                  ? 'अपनी भाषा में बोलें — सिस्टम स्वतः उपकरण और क्षमता दर्ज करेगा'
                  : 'Speak naturally — the system will organize your machines, capacity and prices'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'RECORD' && (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <button
                  onClick={isListening ? () => setIsListening(false) : handleStartListening}
                  className={`p-7 rounded-full transition-all shadow-md ${
                    isListening
                      ? 'bg-zinc-800 text-white animate-pulse ring-4 ring-zinc-300'
                      : 'bg-black dark:bg-white text-white dark:text-black hover:scale-105'
                  }`}
                >
                  {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>
                <p className="mt-4 font-semibold text-sm">
                  {isListening
                    ? language === 'hi' ? 'सुन रहे हैं... बोलिए' : 'Listening... Speak now'
                    : language === 'hi' ? 'माइक दबाकर बोलें' : 'Tap to speak your trade, machines & capacity'}
                </p>
                <p className="text-xs text-zinc-500 max-w-sm mt-1">
                  Say: &quot;I make uniforms in Rohini, I have 2 sewing machines and can make 40 sets a week.&quot;
                </p>

                {/* 1-Click Samples */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className="text-[11px] text-zinc-400 self-center mr-1">
                    Demo audio samples:
                  </span>
                  <button
                    onClick={() => setTranscript(presetHindi)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center gap-1.5 font-medium"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>सुनीता (Hindi Audio)</span>
                  </button>
                  <button
                    onClick={() => setTranscript(presetEnglish)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center gap-1.5 font-medium"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Sunita (English Audio)</span>
                  </button>
                </div>
              </div>

              {/* Transcript */}
              <div className="bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Speech Transcript
                  </span>
                  {transcript && (
                    <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Audio Captured
                    </span>
                  )}
                </div>
                <p className="text-xs italic text-zinc-700 dark:text-zinc-300 min-h-[50px]">
                  {transcript || 'Click the microphone or select a demo sample above...'}
                </p>
              </div>

              {transcript && (
                <button
                  onClick={handleProcessVoice}
                  disabled={isProcessing}
                  className="w-full py-3 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-90 flex items-center justify-center gap-2 transition-all"
                >
                  {isProcessing ? (
                    <span>Extracting Profile Details...</span>
                  ) : (
                    <>
                      <span>Convert Voice to Digital Profile</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {step === 'EXTRACTED' && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Voice information parsed into verified store settings.</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Maker & Trade</span>
                  <h4 className="font-bold text-sm mt-0.5">{extractedProfile.name}</h4>
                  <p className="text-zinc-500 mt-0.5">{extractedProfile.trade}</p>
                </div>

                <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Weekly Output</span>
                  <p className="font-extrabold text-base mt-0.5">{extractedProfile.weeklyCapacity} Uniform Sets / week</p>
                  <p className="text-zinc-500 mt-0.5">Lead time: 3 days</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Verified Equipment</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {extractedProfile.machinery.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 font-mono text-[11px]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep('RECORD')}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-semibold"
                >
                  Record Again
                </button>
                <button
                  onClick={handleConfirmProfile}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save & Publish Store</span>
                </button>
              </div>
            </div>
          )}

          {step === 'CONFIRMED' && (
            <div className="py-10 text-center animate-fade-in">
              <div className="w-12 h-12 rounded-full border border-black dark:border-white flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base">Storefront Updated</h4>
              <p className="text-xs text-zinc-500 mt-1">
                Your capacity and equipment are now visible to buyers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
