import { useContext, useEffect, useState, useRef } from "react";
import { Button, NativeSelect, Select, TextInput, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/context";
import MainTemplate from "../templates/MainTemplate";

const AddEditUser = () => {
  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);
  const inputSelect = useRef(null);

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

  const [validation, setValidation] = useState({
    firstName: false,
    lastName: false,
    select: false
  });

  const { first_name, last_name, status } = form;
  const [edit, setEdit] = useState(false);

  const onInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e) => {
    setForm({ ...form, status: e });
  };

  useEffect(() => {
    if (id) {
      setEdit(true);
      const selectedUser = users.find((item) => item.id === Number(id.substring(1)));
      setForm({ ...selectedUser });
    }
  }, [id]);

  const validate = () => {
    setValidation({
      ...validation,
      firstName: inputFirstName.current.value.length < 2 || inputFirstName.current.value.length > 15 ? true : false,
      lastName: inputLastName.current.value.length < 2 || inputLastName.current.value.length > 25 ? true : false,
      select: inputSelect.current.value === "" ? true : false
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    const date = new Date().toISOString();
    if (first_name && last_name && status) {
      if (!edit) {
        addUser({ ...form, created_at: date, updated_at: date, id: 666 });
        setTimeout(navigate("/"), 500);
      } else {
        let editedUser = users.find((item) => item.id === Number(id.substring(1)));
        editedUser = { ...editedUser, first_name, last_name, updated_at: date };
        editUser(editedUser);
        setEdit(false);
        setTimeout(navigate("/"), 500);
      }
    }
  };

  const tabletScreen = useMediaQuery("(max-width: 1024px)");
  const smallScreen = useMediaQuery("(max-width: 350px)")

  return (
    <MainTemplate>
      <div
        style={{
          margin: "80px auto",
          width: tabletScreen ? "80%" : "50%"
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextInput
            name="first_name"
            value={first_name}
            onChange={onInputChange}
            onBlur={validate}
            placeholder="Enter user's first name..."
            label="First name"
            ref={inputFirstName}
            error={validation.firstName && "Must be 2 to 15 characters long"}
            styles={{
              root: { position: "relative"},
              error: { position: "absolute", top: smallScreen ? -1 : -2.7 , left:75, fontSize: smallScreen ? "12px" : "14px" },
            }}          />
          <TextInput
            name="last_name"
            value={last_name}
            onChange={onInputChange}
            onBlur={validate}
            placeholder="Enter user's last name..."
            label="Last name"
            ref={inputLastName}
            error={validation.lastName && "Must be 2 to 25 characters long"}
            styles={{
              root: { position: "relative"},
              error: { position: "absolute", top: smallScreen ? -0.5 : -2.7, left: 75, fontSize: smallScreen ? "12px" : "14px" },
            }}
          />
            <Select
              disabled={edit}
              label="Status"
              error={validation.select && "Please select the status"}
              placeholder="Set status"
              ref={inputSelect}
              data={[
                { value: "active", label: "Active" },
                { value: "locked", label: "Locked" }
              ]}
              value={status}
              onChange={onSelectChange}
              styles={{
                root: { position: "relative"},
                error: { position: "absolute", lineHeight: "20px", top: smallScreen ? -2 : -2, left: 45, fontSize: smallScreen ? "12px" : "14px" },
              }}
            />

          <Button sx={{ marginTop: "20px", width: "100%" }} type="submit">
            {edit ? "Edit user" : "Add new user"}
          </Button>
          <Text size="sm" sx={{ cursor: "pointer", alignSelf: "center" }} onClick={() => navigate("/")}>
            Cancel
          </Text>
        </form>
      </div>
    </MainTemplate>
  );
};

export default AddEditUser;
