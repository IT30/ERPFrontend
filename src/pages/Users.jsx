import React, { Component } from "react";
import { variables } from "../Variables";
import { useNavigate } from "react-router-dom";

export class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      modalTitle: "",
      IDUser: 0,
      Email: "",
      Username: "",
      FirstName: "",
      LastName: "",
      Adress: "",
      City: "",
      Phone: "",
      UserRole: "",
      ProfilePictureURL: "default.jpg",
      PhotoPath: variables.PHOTO_URL,
      PwdHash: "",
    };
  }

  refreshList() {
    fetch(variables.API_URL + "users", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status == 403) {
          useNavigate("/home");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ users: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeEmail = (e) => {
    this.setState({ Email: e.target.value });
  };
  changeUsername = (e) => {
    this.setState({ Username: e.target.value });
  };
  changeFirstName = (e) => {
    this.setState({ FirstName: e.target.value });
  };
  changeLastName = (e) => {
    this.setState({ LastName: e.target.value });
  };
  changeAdress = (e) => {
    this.setState({ Adress: e.target.value });
  };
  changeCity = (e) => {
    this.setState({ City: e.target.value });
  };
  changePhone = (e) => {
    this.setState({ Phone: e.target.value });
  };
  changeUserRole = (e) => {
    this.setState({ UserRole: e.target.value });
  };
  changePwdHash = (e) => {
    this.setState({ PwdHash: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Users",
      IDUser: 0,
      Email: "",
      Username: "",
      FirstName: "",
      LastName: "",
      Adress: "",
      City: "",
      Phone: "",
      UserRole: "",
      ProfilePictureURL: "default.jpg",
      PwdHash: "",
    });
  }
/*   editClick(user) {
    this.setState({
      modalTitle: "Edit User",
      IDUser: user.idUser,
      Email: user.email,
      Username: user.username,
      FirstName: user.firstName,
      LastName: user.lastName,
      Adress: user.adress,
      City: user.city,
      Phone: user.phone,
      UserRole: user.userRole,
      ProfilePictureURL: user.profilePictureURL,
      PwdHash: user.pwdHash,
    });
  } */

  createClick() {
    fetch(variables.API_URL + "users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProfilePictureURL: this.state.ProfilePictureURL,
        Email: this.state.Email,
        Username: this.state.Username,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Adress: this.state.Adress,
        City: this.state.City,
        Phone: this.state.Phone,
        PwdHash: this.state.PwdHash,
      }),
    })
      .then((res) => "Created successfuly")
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

 /*  updateClick() {
    fetch(variables.API_URL + "users", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IDUser: this.state.IDUser,
        Email: this.state.Email,
        Username: this.state.Username,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Adress: this.state.Adress,
        City: this.state.City,
        Phone: this.state.Phone,
        UserRole: this.state.UserRole,
        ProfilePictureURL: this.state.ProfilePictureURL,
      }),
    })
      .then((res) => "Updated successfuly")
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  } */

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "users/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
        .then((res) => "Deleted successfuly")
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(variables.API_URL + "users/photo", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ ProfilePictureURL: data });
      });
  };

  render() {
    const {
      users,
      modalTitle,
      IDUser,
      Email,
      Username,
      FirstName,
      LastName,
      Adress,
      City,
      Phone,
      UserRole,
      PhotoPath,
      ProfilePictureURL,
      PwdHash,
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Add Users
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>IDUser</th>
              <th>Email</th>
              <th>Username</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Adress</th>
              <th>City</th>
              <th>Phone</th>
              <th>UserRole</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.idUser}>
                <td>{user.idUser}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.adress}</td>
                <td>{user.city}</td>
                <td>{user.phone}</td>
                <td>{user.userRole}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(user)}
                    disabled="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(user.idUser)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Email</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Email}
                        onChange={this.changeEmail}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Username</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Username}
                        onChange={this.changeUsername}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">First name</span>
                      <input
                        type="text"
                        className="form-control"
                        value={FirstName}
                        onChange={this.changeFirstName}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Last name</span>
                      <input
                        type="text"
                        className="form-control"
                        value={LastName}
                        onChange={this.changeLastName}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Adress</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Adress}
                        onChange={this.changeAdress}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">City</span>
                      <input
                        type="text"
                        className="form-control"
                        value={City}
                        onChange={this.changeCity}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Phone</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Phone}
                        onChange={this.changePhone}
                      />
                    </div>

                    {IDUser != 0 ? (
                      <div className="input-group mb-3">
                        <span className="input-group-text">User Role</span>
                        <input
                          type="text"
                          className="form-control"
                          value={UserRole}
                          onChange={this.changeUserRole}
                        />
                      </div>
                    ) : null}

                    <div className="input-group mb-3">
                      <span className="input-group-text">Password</span>
                      <input
                        type="text"
                        className="form-control"
                        value={PwdHash}
                        onChange={this.changePwdHash}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-50 bd-highlight">
                    <img
                      width="250px"
                      height="250px"
                      src={PhotoPath + ProfilePictureURL}
                    />
                    <input
                      className="m-2"
                      type="file"
                      onChange={this.imageUpload}
                    />
                  </div>
                </div>

                {IDUser == 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {/* {IDUser != 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
