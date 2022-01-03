import 'material-icons/iconfont/material-icons.css';
import './styles/main.scss';
import Layout from './components/Layout';
import CsvReader from './components/CsvReader';

function App() {
  return (
    <div className="App">
      <Layout>
        <CsvReader />
      </Layout>
    </div>
  );
}

export default App;
