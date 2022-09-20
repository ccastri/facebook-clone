import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase';
import Post from './Post';
import { doc, orderBy, setDoc, serverTimestamp, collection, query } from "firebase/firestore"


function Posts() {
    // const [snapshot, loading, error] = useCollection(query, options);
    // useCollection(
    //   query(
    //     collection(getFirestore(app), "channels", channelId, "messages"),
    //     orderBy("timestamp", "asc")
    //   )
    // );
    const [realtimePosts] = useCollection(
        query(
            collection(db, "posts", orderBy("timestamp", "desc"))));
    return (
        <div>{
            realtimePosts.docs.map(posts => (
                <Post
                    key={post.id}
                    name={post.data().name}
                    message={post.data().message}
                    email={post.data().email}
                    timestamp={post.data().timestamp}
                    image={post.data().image}
                    postImage={post.data().postImage}
                />
            ))}
        </div>
    )
}

export default Posts