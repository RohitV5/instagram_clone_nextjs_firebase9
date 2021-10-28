

import {BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon} from '@heroicons/react/outline';
import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid';
function Post({id, username, userImg, img, caption}) {
    return (
        <div className="bg-white border rounded-sm my-7">
            {/* Header */}
            <div className="flex items-center p-5 ">
                <img src={userImg} className="object-contain w-12 h-12 p-1 mr-3 border rounded-full" alt=""></img>
                <p className="flex-1 font-bold">{username}</p>
                <DotsHorizontalIcon className="h-5" />
            </div>

            {/* img */}
            <img src={img} className="object-cover w-full" alt="" />

            {/* Buttons */}
            <div className="flex justify-between px-4 pt-5">
                <div className="flex space-x-4">
                    <HeartIcon className="btn"/>
                    <ChatIcon className="btn"/>
                    <PaperAirplaneIcon className="btn"/>
                </div>
                <BookmarkIcon className="btn"/>
            </div>



            {/* caption */}
            <p className="p-5 truncate">
                <span className="mr-1 font-bold ">{username}</span>
                {caption}
            </p>

            {/* comments */}

            {/* input box */}
            <form className="flex items-center p-4">
                <EmojiHappyIcon className="h-7" />
                <input type="text" placeholder="Add a comment..." className="flex-1 border-none outline-none focus:ring-0"/>
                <button className="font-semibold text-blue-400" > Post</button>
            </form>
        </div>
    )
}

export default Post
