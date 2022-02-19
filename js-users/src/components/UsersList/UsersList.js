import { useContext, useEffect, useState } from "react";
import { Button, Pagination, Paper, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GlobalContext } from "../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import UsersItem from "../UsersItem/UsersItem";

const UsersList = () => {
  let navigate = useNavigate();
  const { editUser, users } = useContext(GlobalContext);
  const [activePage, setPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState([]);

  useEffect(() => {
    setPaginatedItems(users && users.slice(10 * activePage - 10, activePage * 10));
  }, [activePage, users]);

  const handleUpdateStatus = (id) => (e) => {
    let selectedUser = users.find((item) => item.id === id);
    selectedUser.status = selectedUser.status === "active" ? "locked" : "active";
    editUser(selectedUser);
  };

  const mobileScreen = useMediaQuery("(max-width: 460px)");
  const tabletScreen = useMediaQuery("(max-width: 1024px)");

  return (
    <Paper sx={{ width: "100%" }}>
      <Paper
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "24px" }}
      >
        <Paper sx={{ display: "flex", justifyContent: "space-between", width: !tabletScreen ? "50%" : "90%" }}>
          <Title order={4} sx={{ alignSelf: "flex-end" }}>
            Users
          </Title>
          <Button
            size={mobileScreen ? "xs" : "sm"}
            leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
            onClick={() => navigate("/new")}
          >
            Add user
          </Button>
        </Paper>

        {paginatedItems.map((user) => (
          <UsersItem
          key={user.id}
            first_name={user.first_name}
            last_name={user.last_name}
            created={user.created_at}
            id={user.id}
            status={user.status}
            statusUpdate={handleUpdateStatus}
          />
        ))}

        <Pagination
          page={activePage}
          total={Math.round(users.length / 10)}
          onChange={setPage}
          size={mobileScreen ? "sm" : "md"}
          sx={{ alignSelf: "center", margin: "20px 0" }}
        />
      </Paper>
    </Paper>
  );
};

export default UsersList;
