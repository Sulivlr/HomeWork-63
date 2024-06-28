import Appbar from './componets/AppBar/Appbar';
import {Route, Routes} from 'react-router-dom';
import Posts from './Containers/Posts/Posts';
import NewPost from './Containers/NewPost/NewPost';
import Post from './Containers/Post/Post';

const App = () => {
  return (
    <>
      <header>
        <Appbar />
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Posts/>} />
          <Route path="/new-post" element={<NewPost/>} />
          <Route path="/posts/:id" element={<Post/>} />
          <Route path="/posts/:id/edit" element={<NewPost/>} />
          <Route path="*" element={<h1>This Page Doesn't exist</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
