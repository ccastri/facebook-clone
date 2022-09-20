import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { EmojiHappyIcon } from "@heroicons/react/outline"
import { VideoCameraIcon, CameraIcon } from "@heroicons/react/solid"
import { useRef, useState } from 'react';
import { db, storage } from '../firebase';
import { ref, getDownloadURL, getStorage, uploadBytesResumable } from "firebase/storage";
import { doc, collection, setDoc, addDoc, serverTimestamp } from "firebase/firestore"
// import firebase from 'firebase';

function InputBox() {

    const { data: session, status } = useSession();
    const inputRef = useRef(null);
    const filePickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState(null);

    const sendPost = async (e) => {
        e.preventDefault();
        if (!inputRef.current.value) return;
        const colRef = collection(db, 'posts')

        await addDoc(colRef, {
            message: inputRef.current.value,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            timestamp: serverTimestamp(),
        }).then(document => {
            if (imageToPost) {
                const storage = getStorage()
                // const path = `posts/${doc.id}`
                const storageRef = ref(storage, `posts/${document.id}`);

                const uploadTask = uploadBytesResumable(storageRef, imageToPost, 'data_url')
                // const uploadTask = storage.ref(`posts/${doc.id}`).putString(imageToPost, 'data_url')
                uploadTask.on(
                    'state_changed',
                    null,
                    err => console.log(err),
                    () => {
                        // const colRef = collection(db, 'posts')
                        //When upload completes
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((URL) => {
                                setDoc(doc(db, "posts", document.id),
                                    {
                                        postImage: URL
                                    },
                                    {
                                        merge: true
                                    });
                            })
                    })
                removeImage();
            }
        });
        inputRef.current.value = "";
    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = readerEvent => {
            setImageToPost(readerEvent.target.result);
        };
    };

    const removeImage = () => setImageToPost(null);
    return (
        <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">

            <div className=" flex space-x-4 items-center p-4">
                <Image
                    className="rounded-full"
                    src={session.user.image}
                    alt=""
                    width={40}
                    height={40}
                    layout="fixed"
                />
                <form className="flex flex-1">
                    <input
                        className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                        type="text"
                        ref={inputRef}
                        placeholder={` What's on your mind ${session.user.name}?`} />
                    <button hidden type="submit" onClick={sendPost}>Submit</button>
                </form>
                {imageToPost && (
                    <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                        <img className="h-10 object-contain cursor-pointer" src={imageToPost} alt="" />
                        <p className="text-xs text-red-500 text-center">remove</p>
                    </div>
                )}

            </div>
            <div className="flex justify-evenly p-3 border-t">

                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500" />
                    <p className="text-xs sm:text-sm placeholder:xl:text-base">Live video</p>
                </div>
                <div onClick={() => filePickerRef.current.click()} className="inputIcon">
                    <CameraIcon className="h-7 text-green-400" />
                    <input
                        type="file"
                        onChange={addImageToPost}
                        ref={filePickerRef}
                        hidden />
                    <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                </div>
                <div className="inputIcon">
                    <EmojiHappyIcon className='h-7 text-yellow-300' />
                    <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox