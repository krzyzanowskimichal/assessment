import { useEffect, useState } from "react";
import { Pagination, Table } from "@mantine/core";

import "./App.css";

function App() {
  const [activePage, setPage] = useState(1);

  const [users, setUsers] = useState([]);
  const [paginatedItems, setPaginatedItems] = useState([])
  const fetchData = () => {
    fetch("https://assessment-users-backend.herokuapp.com/users", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setPaginatedItems(users && users.slice(10 * activePage - 10, activePage * 10))
  }, [activePage, users])

  const rows = users && paginatedItems.map((user) => (
    <tr key={user.id}>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.created_at}</td>
    </tr>
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>{" "}
      <Pagination page={activePage} total={Math.round(users.length / 10)} onChange={setPage} />
    </div>
  );
}

export default App;
