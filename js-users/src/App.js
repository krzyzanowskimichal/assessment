import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";
import { GlobalProvider } from "./context/context";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: "mantine-color-scheme",
    defaultValue: "light"
  });

  const toggleColorScheme = (value) => setColorScheme(value || colorScheme === "dark" ? "light" : "dark");

  return (
    <GlobalProvider>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withNormalizeCSS withGlobalStyles>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="new" element={<AddEditUser />} />
            <Route path="/edit:id" element={<AddEditUser />} />
          </Routes>
        </MantineProvider>
      </ColorSchemeProvider>
    </GlobalProvider>
  );
}

export default App;
