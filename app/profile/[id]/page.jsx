"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  //
  const userId = params.id;
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (userId) fetchPosts();
  }, [userId]);

  //   const handleEdit = (post) => {
  //     router.push(`/update-prompt?id=${post._id}`);
  //   };

  //   const handleDelete = async (post) => {
  //     const hasConfirmed = confirm(
  //       "Are you sure you want to delete this prompt?"
  //     );

  //     if (hasConfirmed) {
  //       try {
  //         await fetch(`/api/prompt/${post._id.toString()}`, {
  //           method: "DELETE",
  //         });

  //         const filteredPosts = myPosts.filter((item) => item._id !== post._id);

  //         setMyPosts(filteredPosts);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  return (
    <>
      {console.log("User ID params = ", params)}
      <Profile
        name={userName}
        desc={`Welcome to ${userName} personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination`}
        data={userPosts}
      />
    </>
  );
};

export default UserProfile;
