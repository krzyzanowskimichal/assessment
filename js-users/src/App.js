import { useEffect, useState } from "react";
import { Pagination, Paper, Table } from "@mantine/core";
import { format } from 'date-fns'
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
  }, [activePage, users, setUsers])

  const displayDate = (str) => {
    const x = str.split(/\D+/);
    const newDate = new Date(Date.UTC(x[0], --x[1], x[2], x[3] - 1, x[4], x[5], x[6]))
    return format(newDate, 'dd/MM/yyyy HH::mm:ss')
  }

  const handleClick = (id) => e => {
    let newArr = [...users]
    newArr.find(item => item.id === id).status = (newArr.find(item => item.id === id).status === 'active' ? 'locked' : 'active'); 
    setUsers(newArr)
    console.log(id)
  }
 

  const rows = users && paginatedItems.map((user) => (
    <tr key={user.id}>
      <td style={{textDecoration: user.status === "locked" && "line-through"}}>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{displayDate(user.created_at)}</td>
      <td><button onClick={handleClick(user.id)}>CLICK</button></td>
    </tr>
  ));


  return (
    <div>
      <Paper sx={{height: '420px'}}>
      <Table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Created at</th>
            <th>Activate/Lock</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>{" "}
      </Paper>
      <Pagination page={activePage} total={Math.round(users.length / 10)} onChange={setPage} />
    </div>
  );
}

export default App;
