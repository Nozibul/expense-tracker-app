import Balance from "./components/Balance";
import From from "./components/From";
import Layout from "./components/Layout";
import Transactions from "./components/Transactions";


function App() {
  return (
    <Layout>
      <Balance />
      <From />
      <Transactions />
    </Layout>
  );
}

export default App;
