import UsersList from "../components/UsersList.js/UsersList";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column', padding: "20px", alignItems: 'center' }}>
      <Header />
      <UsersList />
    </div>
  );
};
export default Home;
