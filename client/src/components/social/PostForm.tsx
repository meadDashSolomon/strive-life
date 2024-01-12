import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../auth/context/AuthProvider";

/**
 * Declares the global interface for the modal object.
 */
interface Modal {
  showModal: VoidFunction;
  close: VoidFunction;
}
declare global {
  interface Window {
    new_post_modal: Modal;
  }
}

/**
 * PostForm component allows users to create new posts.
 */
function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photos, setPhotos] = useState([]);
  const user = useContext(AuthContext);

  // Opens the modal for creating a new post
  function openModal() {
    window.new_post_modal.showModal();
  }

  // Closes the modal without submitting
  function handleClose(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.new_post_modal.close();
  }

  // Submits the new post data to the server
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const post = {
      title,
      body,
      photos,
      id: user.auth.id,
    };

    axios
      .post(import.meta.env.VITE_SERVER_URL + "/posts", post, {
        withCredentials: true,
      })
      .then(() => {
        window.new_post_modal.close();
        document.getElementById("new_post_form")?.reset();
      })
      .catch((err: Error) => {
        console.error("Oops, something went wrong:", err.message);
      });
  }

  return (
    <>
      <button
        className="btn btn-secondary text-primary hover:bg-accent hover:border-accent"
        onClick={openModal}>
        New Post
      </button>
      <dialog
        id="new_post_modal"
        className="modal-box bg-neutral">
        <button
          type="button"
          className="btn btn-circle btn-secondary hover:bg-accent hover:border-accent text-primary absolute right-3 top-3"
          onClick={handleClose}>
          X
        </button>
        <h3 className="text-2xl">New Post</h3>
        <div className="mt-5">
          <form
            method="dialog"
            id="new_post_form"
            onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <input
                type="text"
                className="input input-bordered input-secondary bg-primary text-secondary m-1"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
              <textarea
                className="textarea textarea-bordered textarea-lg textarea-secondary bg-primary text-secondary m-1"
                onChange={(e) => {
                  setBody(e.target.value);
                }}
                required
              />
              <input
                type="file"
                className="file-input file-input-secondary hover:file-input-accent text-secondary bg-primary"
                onChange={() => {
                  setPhotos([]);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-secondary hover:bg-accent hover:border-accent text-primary mt-4">
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default PostForm;
