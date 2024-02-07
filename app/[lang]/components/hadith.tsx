'use client';

import Image from 'next/image';
import { useState } from 'react';
import Praise from '@/public/Praise.png';
import type { HadithProps } from '../lib/type';
import { getRandom } from '../utils';
import { Random } from './icons';

export default function Hadith({ hadiths: { hadiths }, locale, dict }: HadithProps) {
  const [randomNumber, getRandomNumber] = useState(10);
  const hadith = hadiths.data[randomNumber];

  return (
    <>
      <button
        onClick={() => getRandomNumber(getRandom(0, 49))}
        aria-label="Get random hadith"
        className="absolute border-2 border-yellow-400 border-b-0 -top-[51px] left-[5%] bg-green-800 p-3 rounded-t-lg"
      >
        <Random className="fill-yellow-400" />
      </button>
      <div className="w-full space-y-10">
        <h1>{dict?.hadith.heading}</h1>
        <p className="flex">
          {dict?.hadith?.source && `${dict.hadith.source}: `}
          {locale === 'en' ? (
            <>
              {hadith.chapter?.chapterNumber && `${hadith.chapter.chapterNumber} - `}
              {hadith.chapter?.chapterEnglish}
            </>
          ) : (
            <>
              {hadith.chapter?.chapterNumber && `${hadith.chapter.chapterNumber} - `}
              {hadith.chapter?.chapterArabic}
            </>
          )}
          {', '}
          {dict?.hadith?.hadith} {hadith.hadithNumber}
        </p>
        <blockquote className="px-4 max-w-[55ch] text-xl text-inherit leading-8">
          {locale === 'en' ? hadith.hadithEnglish : hadith.hadithArabic}
        </blockquote>
      </div>
      <div>
        <Image src={Praise} width={400} height={400} alt={''} />
      </div>
    </>
  );
}
