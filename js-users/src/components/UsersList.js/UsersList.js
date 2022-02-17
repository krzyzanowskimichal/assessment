import { useContext, useEffect, useState, useReducer } from "react";
import { Pagination, Paper, Table } from "@mantine/core";
import { format } from "date-fns";
import { GlobalContext } from "../../context/context";
import { useNavigate } from 'react-router-dom'

const UsersList = () => {
  const { editUser, users } = useContext(GlobalContext);

  let navigate = useNavigate()
  const [activePage, setPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState([]);

  useEffect(() => {
    setPaginatedItems(users && users.slice(10 * activePage - 10, activePage * 10));
  }, [activePage, users]);

  const displayDate = (str) => {
    const x = str.split(/\D+/);
    const newDate = new Date(Date.UTC(x[0], --x[1], x[2], x[3] - 1, x[4], x[5], x[6]));
    return format(newDate, "dd/MM/yyyy HH::mm:ss");
  };

  const handleUpdateStatus = (id) => (e) => {
    let selectedUser = users.find((item) => item.id === id);
    selectedUser.status = selectedUser.status === "active" ? "locked" : "active";
    editUser(selectedUser);
    console.log(id);
  };

  const rows =
    users &&
    paginatedItems.map((user) => (
      <tr key={user.id}>
        <td style={{ textDecoration: user.status === "locked" && "line-through" }}>{user.first_name}</td>
        <td style={{ textDecoration: user.status === "locked" && "line-through" }}>{user.last_name}</td>
        <td style={{ textDecoration: user.status === "locked" && "line-through" }}>{displayDate(user.created_at)}</td>
        <td>
          <button style={{ width: "70px" }} onClick={handleUpdateStatus(user.id)}>
            {user.status === "locked" ? "Activate" : "Lock"}
          </button>
          <button onClick={() => navigate(`/edit:${user.id}`)}>Edit</button>
        </td>
      </tr>
    ));

  return (
    <div>
      <button
        onClick={() => {
          console.log(users);
        }}
      >
        asdsad
      </button>
      <button
        onClick={() => navigate("/add")}
      >
        link
      </button>
      <Paper>
        <Table>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Created at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>{" "}
        <Pagination page={activePage} total={Math.round(users.length / 10)} onChange={setPage} sx={{ width: "100%" }} />
      </Paper>
    </div>
  );
};

export default UsersList;
