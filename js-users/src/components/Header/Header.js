import { Title } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "20px" }}>
      <div
        style={{
          padding: "6px",
          backgroundColor: "#1C7ED6",
          borderRadius: "50%",
          height: "34px",
          width: "34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "6px"
        }}
      >
        <FontAwesomeIcon style={{ color: "#fff", fontSize: "14px" }} icon={faUserGroup} />
      </div>
      <Title order={3}>User List</Title>
    </div>
  );
};

export default Header;
