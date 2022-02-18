import UsersList from "../components/UsersList/UsersList";
import MainTemplate from "../templates/MainTemplate";
import { Paper } from "@mantine/core";

const Home = () => {
  return (
    <MainTemplate>
      <Paper sx={{ display: "flex", flexDirection: "column", padding: "13px" }}>
        <UsersList />
      </Paper>
    </MainTemplate>
  );
};
export default Home;
