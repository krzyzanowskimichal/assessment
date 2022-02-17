import { useContext, useEffect, useState } from "react";
import { Button, NativeSelect, TextInput } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/context";

const AddEditUser = () => {
  const { addUser, editUser, users } = useContext(GlobalContext);
  let navigate = useNavigate();
  let { id } = useParams();
  const [form, setForm] = useState({
    created_at: "",
    first_name: "",
    id: Number,
    last_name: "",
    status: "",
    updated_at: ""
  });
  const { first_name, last_name, status } = form;
  const [edit, setEdit] = useState(false);
  const onInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      setEdit(true);
      console.log(id);
      const selectedUser = users.find((item) => item.id === Number(id.substring(1)));
      setForm({ ...selectedUser });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("csdsad");
    const date = new Date().toISOString();
    if (first_name && last_name && status) {
      if (!edit) {
        console.log("git");
        addUser({ ...form, created_at: date, updated_at: date, id: 666 });
      } else {
        let editedUser = users.find((item) => item.id === Number(id.substring(1)));
        editedUser = { ...editedUser, first_name, last_name, updated_at: date };
        editUser(editedUser);
        setEdit(false);
      }
    }
    setTimeout(navigate("/"), 500);
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>link</button>
      <TextInput
        name="first_name"
        value={first_name}
        onChange={onInputChange}
        placeholder="Your name"
        label="Full name"
        required
      />
      <TextInput
        name="last_name"
        value={last_name}
        onChange={onInputChange}
        placeholder="Your name"
        label="Full name"
        required
      />
      <NativeSelect
        disabled={edit}
        label="Status"
        placeholder="Set status"
        required
        data={[
          { value: "active", label: "Active" },
          { value: "locked", label: "Locked" }
        ]}
        value={status}
        onChange={(e) => {
          setForm({ ...form, status: e.target.value });
        }}
      />
      <Button onClick={handleSubmit}>{edit ? "Edit user" : "Add new user"}</Button>
    </div>
  );
};

export default AddEditUser;
