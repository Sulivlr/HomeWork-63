import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { ApiPost } from '../../types';
import axiosApi from '../../axiosApi';
import { enqueueSnackbar } from 'notistack';

const NewPost = () => {
  const navigate = useNavigate();

  const [newPost, setNewPost] = useState<ApiPost>({
    createdAt: new Date().toISOString(),
    description: '',
    title: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      await axiosApi.post('/posts.json', newPost);
      navigate('/');
    } catch (e) {
      enqueueSnackbar('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input required type="text" value={newPost.title} onChange={onFieldChange} className="form-control" name="title" id="title" placeholder="Title" />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control" value={newPost.description} onChange={onFieldChange} name="description" id="description" rows="3" placeholder="Description"></textarea>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading}>Save</button>
    </form>
  );
};

export default NewPost;
