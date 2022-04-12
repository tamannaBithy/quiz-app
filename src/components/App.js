import Home from '../pages/Home';
import Signup from '../pages/Signup';
import '../styles/App.css';
import Layout from './Layout';

function App() {
  return (
    <Layout>
      <Home />
      <Signup />
    </Layout>
  );
}

export default App;
