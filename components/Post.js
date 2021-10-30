

import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from '@firebase/firestore';
import {BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon} from '@heroicons/react/outline';
import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { useEffect,useState } from 'react';
import { db } from '../firebase';
function Post({id, username, userImg, img, caption}) {
    const {data:session} = useSession();

    const [comment,setComment]=useState("");
    const [comments, setComments] = useState([]);

    //set comments whenever comments are updated in firebase
    useEffect(
        ()=>
        onSnapshot(
            query(
                collection(db, 'posts', id, "comments"),
                orderBy('timestamp','desc')
            ),
            (snapshot)=>setComments(snapshot.docs)
        ),
        [db]
    )

    const sendComment = async(e) =>{
        console.log(comment)
        e.preventDefault();


        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db,'posts', id, 'comments'), {
            comment: commentToSend,
            username:session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        });
    }


    
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
            {session && (
            <div className="flex justify-between px-4 pt-5">
                <div className="flex space-x-4">
                    <HeartIcon className="btn"/>
                    <ChatIcon className="btn"/>
                    <PaperAirplaneIcon className="btn"/>
                </div>
                <BookmarkIcon className="btn"/>
            </div>
            )} 




            {/* caption */}
            <p className="p-5 truncate">
                <span className="mr-1 font-bold ">{username}</span>
                {caption}
            </p>

            {/* comments */}
            {
                comments.length > 0 &&
                (
                    <div className="h-20 ml-10 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                        {comments.map((comment)=>
                            <div key={comment.id} className="flex items-center mb-3 space-x-2">
                                <img className="rounded-full h-7" src={comment.data().userImage} alt="" />
                                <p className="flex-1 text-sm">
                                    <span className="font-bold">
                                        {comment.data().username}
                                    </span>
                                    <span>
                                        {comment.data().comment}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                )
            }

            {/* input box */}
            {session && (
                <form className="flex items-center p-4">
                    <EmojiHappyIcon className="h-7" />
                    <input 
                        type="text" 
                        placeholder="Add a comment..." 
                        className="flex-1 border-none outline-none focus:ring-0"
                        onChange={e => {setComment(e.target.value);console.log(comment)}}
                        placeholder="Add a comment"
                        className = "flex-1 border-none outline-none focus:ring-0"
                    />
                    <button disabled={!comment.trim()} type="submit" onClick={sendComment} className="font-semibold text-blue-400" > Post</button>
                </form>
            )}

        </div>
    )
}

export default Post
