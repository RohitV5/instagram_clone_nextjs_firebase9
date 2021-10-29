import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtoms";
import { Dialog, Transition} from '@headlessui/react';
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import {addDoc, collection,doc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {ref, getDownloadURL, uploadString} from "@firebase/storage";
import {db, storage} from "../firebase";

function Modal() {
    const {data: session} = useSession();

    const [open, setOpen] = useRecoilState(modalState);
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(null);


    const addImageToPost = (e) =>{
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }


        reader.onload = (readerEvent) =>{
            setSelectedFile(readerEvent.target.result);
        }
    }

    const uploadPost = async () =>{
        if(loading) return;
        setLoading(true);

        // Create a post and add to firestore 'posts' collection
        // get the post id of the newly created post
        // upload the image to firebase storage with the postid
        // get the download url from the fb storage and update the original post with image

        // Approach for firebase 9
        const docRef = await addDoc(collection(db,'posts'),{   
                                username:session.user.username, 
                                caption: captionRef.current.value,
                                profileImg:session.user.image,
                                timestamp:serverTimestamp()
        })

        console.log("New doc added with Id", docRef.id)

        //storage bucket name
        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        await uploadString(imageRef, selectedFile, "data_url").then(async snapshot =>{
            const downloadUrl = await getDownloadURL(imageRef);
            await updateDoc(doc(db, 'posts', docRef.id ),{
                image: downloadUrl
            });
        });

        setOpen(false);
        setLoading(false);
        setSelectedFile(null);


    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={setOpen}>
                <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal content  */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0  translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 ">
                            <div>
                                {   selectedFile ? 
                                    <img src={selectedFile} onClick={()=>selectedFile(null)} /> 
                                    
                                    :
                                
                                    <div
                                        onClick={()=> filePickerRef.current.click()}
                                        className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full cursor-pointer"
                                    >
                                        <CameraIcon 
                                            className="w-6 h-6 text-red-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                }

                                <div >
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3" className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Upload a photo
                                        </Dialog.Title>
                                    </div>

                                    <div>
                                        <input 
                                            ref={filePickerRef} 
                                            type="file" hidden 
                                            onChange={addImageToPost} 
                                        />
                                    </div>
                                    
                                    <div className="mt-2">
                                        <input className="w-full text-center border-none focus:ring-0"
                                            type="text" 
                                            ref={captionRef}
                                            placeholder="Please enter a caption"
                                            
                                        />
                                    
                                    </div>
                                </div>


                                <div className="mt-5 sm:mt-6">
                                    <button 
                                        disabled={!selectedFile} 
                                        onClick={uploadPost} 
                                        type="button" 
                                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">
                                        {loading ? "Uploading...":"Upload Post"}
                                    </button>
                                </div>

                            </div>
                            

                        </div>
                    </Transition.Child>

                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
