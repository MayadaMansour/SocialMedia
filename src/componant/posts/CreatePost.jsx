import { useRef, useState } from "react";
import axios from "axios";

export default function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileRef = useRef();
  const token = localStorage.getItem("token");

  // upload image
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImage(null);
    setPreview(null);
    fileRef.current.value = "";
  }

  // submit
  async function handleSubmit() {
    if (!text.trim() && !image) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("body", text);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        "https://route-posts.routemisr.com/posts",
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setText("");
      removeImage();
      onPostCreated?.(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow w-full max-w-2xl p-4">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src="https://i.pravatar.cc/40"
          className="w-11 h-11 rounded-full"
        />

        <div>
          <p className="font-semibold">Mayada Mansour</p>

          <div className="bg-gray-100 text-sm px-3 py-1 rounded-full inline-flex items-center gap-1 cursor-pointer hover:bg-gray-200">
            🌍 Public ▾
          </div>
        </div>
      </div>

      {/* TEXTAREA */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind, Mayada?"
        className="w-full min-h-[120px] resize-none outline-none text-lg placeholder-gray-400"
      />

      {/* IMAGE PREVIEW */}
      {preview && (
        <div className="relative mt-3">
          <img
            src={preview}
            className="rounded-xl max-h-[400px] w-full object-cover"
          />

          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-black/60 text-white w-8 h-8 rounded-full"
          >
            ✕
          </button>
        </div>
      )}

      <hr className="my-4" />

      {/* ACTIONS */}
      <div className="flex items-center justify-between">
        <div className="flex gap-6 text-gray-600">
          <button
            onClick={() => fileRef.current.click()}
            className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg"
          >
            🖼️ Photo/video
          </button>

          <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg">
            😊 Feeling/activity
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!text.trim() && !image}
          className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2
            ${
              !text.trim() && !image
                ? "bg-blue-200 text-white cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
        >
          {loading ? "Posting..." : "Post"} ➤
        </button>
      </div>

      <input
        type="file"
        hidden
        ref={fileRef}
        accept="image/*"
        onChange={handleImage}
      />
    </div>
  );
}
