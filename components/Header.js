import Image from "next/image";
import { HeartIcon, MenuIcon, PaperAirplaneIcon, PlusCircleIcon, SearchIcon, UserGroupIcon } from '@heroicons/react/outline';
import {HomeIcon} from '@heroicons/react/solid';


function Header() {
  return (
    <div className="shadow-sm">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* {Left} */}
        <div className="relative hidden w-24 h-24 cursor-pointer lg:inline-grid">
          <Image src="https://links.papareact.com/ocw" layout="fill" objectFit="contain"/>
        </div>

        <div className="relative flex-shrink-0 w-10 cursor-pointer lg:hidden" flex-shrink-0>
          <Image src="https://links.papareact.com/jjm" layout="fill" objectFit="contain"/>
        </div>

        {/* {Middle- search for an input field} */}
        <div className="flex items-center max-w-xs ">
            <div className="relative p-3 mt-1 rounded-md ">
                <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none ">
                    <SearchIcon className="w-5 h-5 text-gray-500"/>
                </div>
                <input className="block w-full pl-10 border-gray-300 rounded-md bg-gray-50 sm:text-sm focus:ring-black focus:border-black" type="text" placeholder="Search"/>
            </div>
        </div>


        {/* {Right} */}

        <div className="flex items-center justify-end space-x-4">
            <HomeIcon className="navBtn"/>
            <div className="relative navBtn">
              <PaperAirplaneIcon className="rotate-45 navBtn"/>
              <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-2 animate-pulse">3</div>
            </div>
            
            <PlusCircleIcon className="navBtn"/>
            <UserGroupIcon className="navBtn"/>
            <HeartIcon className="navBtn" />
            <MenuIcon className="cursor-pointer h6 md:hidden"/>

            <img src="https://links.papareact.com/3ke" alt="profile pic" className="h-10 rounded-full cursor-pointer"/>
            
        </div>
      </div>
    </div>
  );
}

export default Header;
