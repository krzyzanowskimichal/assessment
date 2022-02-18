import { ActionIcon, Paper, Text, Title, useMantineColorScheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const UsersItem = ({ created, first_name, id, last_name, status, statusUpdate }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  let navigate = useNavigate();

  const formatDate = (str) => {
    const date = str.split(/\D+/);
    const newDate = new Date(Date.UTC(date[0], --date[1], date[2], date[3] - 1, date[4], date[5], date[6]));
    return format(newDate, "dd/MM/yyyy HH::mm:ss");
  };

  const mobileScreen = useMediaQuery("(max-width: 460px)");
  const tabletScreen = useMediaQuery("(max-width: 1024px)");

  return (
    <Paper
      sx={(theme) => ({
        display: "flex",
        justifyContent: "space-between",
        width: !tabletScreen ? "50%" : "90%",
        alignSelf: "center",
        backgroundColor: colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
        padding: mobileScreen ? "14px" : "24px"
      })}
    >
      <div>
        <Title sx={{ textDecoration: status === "locked" && "line-through", textDecorationThickness: "2px" }} order={mobileScreen ? 6 : 4}>
          {first_name} {last_name}
        </Title>
        <Text sx={{ textDecoration: status === "locked" && "line-through" }} size={mobileScreen ? "xs" : "md"}>
          {formatDate(created)}
        </Text>
      </div>
      <div style={{ display: "flex", gap: "12px", alignSelf: "center" }}>
        <ActionIcon
          size={mobileScreen ? "md" : "xl"}
          sx={(theme) => ({
            backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[4]
          })}
          onClick={statusUpdate(id)}
        >
          <FontAwesomeIcon icon={status === "locked" ? faUnlock : faLock} />
        </ActionIcon>

        <ActionIcon
          onClick={() => navigate(`/edit:${id}`)}
          size={mobileScreen ? "md" : "xl"}
          sx={(theme) => ({
            backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[4]
          })}
        >
          <FontAwesomeIcon icon={faUserPen} />{" "}
        </ActionIcon>
      </div>
    </Paper>
  );
};

export default UsersItem;
