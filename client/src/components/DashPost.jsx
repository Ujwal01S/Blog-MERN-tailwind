import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link } from "react-router-dom";

const DashPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  console.log(userPosts);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-200 scr">
      {currentUser.isAdmin && userPosts.length > 0 ? (

      <Table>
        <TableHead>
          <TableHeadCell>Date updates</TableHeadCell>
          <TableHeadCell>Post Image</TableHeadCell>
          <TableHeadCell>Post Title</TableHeadCell>
          <TableHeadCell>Category</TableHeadCell>
          <TableHeadCell>Delete</TableHeadCell>
          <TableHeadCell>
            <spam>Edit</spam>
          </TableHeadCell>
        </TableHead>
        {userPosts.map((post) => (
          <TableBody className="divide-y">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>
                {new Date(post.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Link to={`/post/${post.slug}`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-20 h-10 object-cover bg-gray-500"
                  />
                </Link>
              </TableCell>

              <TableCell>
                <Link
                  to={`/post/${post.slug}`}
                  className="fond-medium text-gray-900 dark:text-white"
                >
                  {post.title}
                </Link>
              </TableCell>

              <TableCell>{post.category}</TableCell>

              <TableCell>
                <spam className="font-medium text-red-600 hover:underline cursor-pointer">
                  Delete
                </spam>
              </TableCell>

              <TableCell>
                <Link to={`/update-post/${post._id}`}>
                  <spam className="font-medium text-green-600 hover:underline cursor-pointer">
                    Edit
                  </spam>
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
      ) : 
      (<p> You don not have content</p>)
      }
    </div>
  );
};

export default DashPost;
