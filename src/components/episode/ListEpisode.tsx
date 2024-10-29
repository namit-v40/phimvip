import React from 'react';
import Link from 'next/link';

interface Episode {
  ep_id: number;
  ep_name: string;
}

interface ListEpisodeProps {
  slug: string;
  episodes: Episode[];
  currentEpId: string;
}

export default function ListEpisode({ slug, episodes, currentEpId }: ListEpisodeProps) {

  return (
    <div className="w-full rounded-lg overflow-auto lg:max-h-[310px] xl:max-h-[510px] 3xl:max-h-[750px]">
      <div className="py-[2px] px-4 border-l-4 mb-4">
        <h3 className="text-[15px] xl:text-[17px] 3xl:text-[23px] font-semibold">TẬP</h3>
      </div>
      <ul className="flex flex-wrap gap-2 text-[14px] sm:text-[16px]">
        {episodes.map((ep) => (
          <Link key={ep.ep_id} href={`/movie/${slug}/ep/${ep.ep_id}`} scroll={true}>
            <li className={`py-1 px-5 lg:py-2 lg:px-4 mb-1 cursor-pointer rounded-lg ${
                ep.ep_id === parseInt(currentEpId)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 hover:bg-gray-600 bg-opacity-30 backdrop-blur'
              }`}
            >
              {ep.ep_name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}