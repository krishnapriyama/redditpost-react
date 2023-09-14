import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [redditData, setRedditData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('https://www.reddit.com/r/reactjs.json')
      .then((response) => {
        setRedditData(response.data.data.children);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Reddit data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-blue-500 py-4 text-white text-center">
        <h1 className="text-2xl font-bold">Reddit Posts</h1>
      </header>

      <div className="container mx-auto py-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {redditData.map((post, index) => (
              <div className="bg-white border border-gray-300 rounded-lg p-4 max-w-md" key={index}>
                <h2 className="text-lg font-semibold">{post.data.title}</h2>
                <p className="mt-2 text-sm overflow-hidden overflow-ellipsis max-w-xs">
                  {post.data.selftext}
                </p>
                <a
                  href={post.data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 font-semibold mt-2 inline-block"
                >
                  Read More
                </a>
                <p className="mt-2">Score: {post.data.score}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
