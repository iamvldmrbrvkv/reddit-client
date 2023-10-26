import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import Root from "../components/Root/Root";
import Subreddit from "../features/Subreddit/Subreddit/Subreddit";
import FullPostWithComments from "../features/Comments/FullPostWithComments/FullPostWithComments";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Subreddit />} />
      <Route path="r/:subredditName" element={<Subreddit />} />
      <Route path="r/:subreddit/comments/:id/:title" element={<FullPostWithComments />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
