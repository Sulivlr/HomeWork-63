import {Link, useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import {ApiPost} from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../componets/Spinner/Spinner';
import {format} from 'date-fns';

const Post = () => {

  const navigate = useNavigate();

  const params = useParams();

  const [post, setPost] = useState<ApiPost | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    const response = await axiosApi.get<ApiPost | null>('/posts/' + params.id + '.json');
    setPost(response.data);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);

  const deletePost = async () => {
    setIsLoading(true);
    try {
      await axiosApi.delete('/posts/' + params.id + '.json');
      navigate('/');
    } catch (error) {
      console.error('Error deleting post', error);
    } finally {
      setIsLoading(false);
    }
  };

  let postArea = <Spinner />;

  if (!isLoading && post) {
    postArea = (
      <div>
        <span className="text-muted" style={{fontSize: '10px'}}>Created on: {format(post.createdAt, 'dd.MMMM.yyyy HH:mm')}</span>
        <h1>{post.title}</h1>
        <div>{post.description}</div>
        <div>
          <div className="d-flex flex-row gap-2 mt-2">
            <button className="btn btn-primary" onClick={deletePost} disabled={isLoading}>Delete</button>
            <Link to={'/posts/' + params.id + '/edit'} className="btn btn-success">Edit</Link>
          </div>
        </div>

      </div>
    );
  } else if (!isLoading && !post) {
    postArea = (
      <h1>Not Found!</h1>
    );
  }

  return (
    postArea
  );
};

export default Post;