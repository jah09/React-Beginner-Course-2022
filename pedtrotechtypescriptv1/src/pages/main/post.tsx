import { Post as IPost } from "./main";
import {
  getDocs,
  collection,
  addDoc,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props {
  post: IPost;
}

interface Like {
  userId: string;
  likeId: string;
}
export const Post = (props: Props) => {
  // const [postsLists, setPostsLists] = useState<Post[] | null>(null);
  const [likes, setLike] = useState<Like[] | null>(null);
  const [user] = useAuthState(auth);
  const { post } = props;
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);

    setLike(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLike((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log("error is ", err);
    }
  };

  const RemoveLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likesID = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likesID);
      await deleteDoc(likeToDelete);
      if (user) {
        setLike(
          (prev) => prev && prev?.filter((like) => like.likeId !== likesID)
        );
      }
    } catch (err) {
      console.log("error is ", err);
    }
  };
  return (
    <div style={{background:'whitesmoke'}}>
      
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={hasUserLiked ? RemoveLike : addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p>Likes: {likes?.length}</p>}
      </div>
    </div>
  );
};
