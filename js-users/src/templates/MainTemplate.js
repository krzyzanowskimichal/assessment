import Header from "../components/Header/Header";
import { ActionIcon, Paper, useMantineColorScheme } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const MainTemplate = ({ children }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <>
      <Paper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <Header />
        <ActionIcon
          sx={{ marginRight: "20px" }}
          variant="outline"
          color={dark ? "yellow" : "blue"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
        </ActionIcon>
      </Paper>
      {children}
    </>
  );
};

export default MainTemplate;
