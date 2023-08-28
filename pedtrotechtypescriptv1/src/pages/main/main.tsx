import React, { useEffect } from "react";
import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post } from "./post";

export interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  username: string;
}
export const Main = () => {
  const postsRef = collection(db, "posts");
  const [postsLists, setPostsLists] = useState<Post[] | null>(null);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsLists(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div >
      {postsLists?.map((post) => (
        <Post post={post}/>
      ))}
    </div>
  );
};
