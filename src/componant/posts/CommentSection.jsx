// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { apiServices } from "../../services/api";
// import Posts from './Posts';

// export default function CommentSection({ postId, showAll,  }) {
//   const [comments, setComments] = useState([]);

// async function loadComments() {
//   try {
//     const response = await apiServices.getPostComments(postId);
//     setComments(response.data.comments);
//     console.log(response.data.comments)
//   } catch (err) {
//     console.log(err);
//   }
// }

//   useEffect(() => {
//     loadComments();
//   },  [postId]);

//   return (
//     <div className="px-4 pb-3">
//       {/* COMMENTS */}
//       <div className="space-y-2 mb-2">
//         {(showAll ? comments : comments.slice(0, 2)).map((c) => (
//           <div key={c._id} className="flex gap-2">
//             <img
//               src={c.commentCreator?.photo || "https://i.pravatar.cc/150"}
//               className="w-7 h-7 rounded-full object-cover"
//             />

//             <div className="bg-gray-100 rounded-2xl px-3 py-2 text-sm">
//               <span className="font-semibold block">
//                 {c.commentCreator?.name}
//               </span>
//               {c.content}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* SEE MORE */}
//       {!showAll && comments.length > 2 && (
//         <Link
//           to={`/post/${postId}`}
//           className="text-sm text-gray-500 hover:underline block"
//         >
//           See more comments
//         </Link>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiServices } from "../../services/api";

export default function CommentSection({ postId, showAll }) {
  const [comments, setComments] = useState([]);
  
  async function loadComments() {
    try {
      const response = await apiServices.getPostComments(postId);
      setComments(response.data.comments);
    } catch (err) {
      console.log("Comments Error:", err.response?.data);
    }
  }

  useEffect(() => {
    if (!postId) return;
    loadComments();
  }, []);

  return (
    <div className="px-4 pb-3">
      <div className="space-y-2 mb-2">
        {(showAll ? comments : comments.slice(0, 2)).map((c) => (
          <div key={c._id} className="flex gap-2">
            <img
              src={c.commentCreator?.photo || "https://i.pravatar.cc/150"}
              className="w-7 h-7 rounded-full object-cover"
            />

            <div className="bg-gray-100 rounded-2xl px-3 py-2 text-sm">
              <span className="font-semibold block">
                {c.commentCreator?.name}
              </span>
              {c.content}
            </div>
          </div>
        ))}
      </div>

      {!showAll && comments.length > 2 && (
        <Link
          to={`/post/${postId}`}
          className="text-sm text-gray-500 hover:underline block"
        >
          See more comments
        </Link>
      )}
    </div>
  );
}
