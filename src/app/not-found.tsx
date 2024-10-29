import { useTranslations } from 'next-intl'
import Image from 'next/image';
import Link from 'next/link'
 
export default function NotFound() {
  const error = useTranslations('not_found_error');
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <div className='w-[100px] h-[100px]'>
        <Image src="/images/monkey.png" alt="not_found" height={100} width={100}/>
      </div>
      <h2 className='text-[20px] font-medium'>{error('title')}</h2>
      <p>{error('message')}</p>
      <Link className="underline hover:text-blue-400" href="/">{error('go_back')}</Link>
    </div>
  )
}