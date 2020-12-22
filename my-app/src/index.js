import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const datasByRow = [
  { user: "Leanne Graham", email: "Sincere@april.biz", phone: "1-770-736-8031 x56442" },
  { user: "Ervin Howell", email: "Shanna@melissa.tv", phone: "010-692-6593 x09125" },
  { user: "Clementine Bauch", email: "Nathan@yesenia.net", phone: "1-463-123-4447" }
];

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: "", email: "", phone: "" };
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(propertyName, e) {
    const change = {};
    change[propertyName] = e.target.value;
    this.setState(change);
  }

  handleClear() {
    this.setState({ user: "", email: "", phone: "" });
  }

  render() {
    return (
      <div className="row inputs">
        <Input
          name="user"
          change={this.handleChange.bind(this, "user")}
          value={this.state.user}
          placeholder="User name"
        />
        <Input
          name="email"
          change={this.handleChange.bind(this, "email")}
          value={this.state.email}
          placeholder="Email"
        />
        <Input
          name="phone"
          change={this.handleChange.bind(this, "phone")}
          value={this.state.phone}
          placeholder="Phone"
        />
        <div className="col-md-3">
          <AddButton
            newData={this.state}
            create={this.props.onCreate}
            clear={this.handleClear}
          />
        </div>
      </div>
    );
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }

  render() {
    return (
      <div className="col-md-3">
        <input
          type="text"
          name={this.props.name}
          placeholder={this.props.placeholder}
          onChange={this.props.change}
          value={this.props.value}
          className="form-control"
        />
      </div>
    );
  }
}

class Column extends React.Component {
  render() {
    return <td style={{ width: "30%" }}>{this.props.placeholder}</td>;
  }
}

class DeleteButton extends React.Component {
  onClick() {
    this.props.delete.call(null, this.props.uuid);
  }

  render() {
    return (
      <td style={{ width: "10%" }}>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.onClick.bind(this)}
        >
          Delete
        </button>
      </td>
    );
  }
}

class AddButton extends React.Component {
  onClick() {
    if (
      this.props.newData.user.length > 0 &&
      this.props.newData.email.length > 0
    ) {
      this.props.create.call(
        null,
        this.props.newData.user,
        this.props.newData.email,
        this.props.newData.phone
      );
      this.props.clear.call(null);
    }
  }

  render() {
    return (
      <button
        type="button"
        style={{ width: "100%" }}
        className="btn btn-success"
        onClick={this.onClick.bind(this)}
      >
        Add
      </button>
    );
  }
}

class Row extends React.Component {
  render() {
    return (
      <tr>
        <Column type="user" placeholder={this.props.user} />
        <Column type="email" placeholder={this.props.email} />
        <Column type="phone" placeholder={this.props.phone} />
        <DeleteButton uuid={this.props.uuid} delete={this.props.onDelete} />
      </tr>
    );
  }
}

class Table extends React.Component {
  render() {
    return (
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col" style={{ width: "30%" }}>
              Users name
            </th>
            <th scope="col" style={{ width: "30%" }}>
              Email
            </th>
            <th scope="col" style={{ width: "30%" }}>
              Phone
            </th>
            <th scope="col" style={{ width: "10%" }}></th>
          </tr>
        </thead>

        <tbody>
          {this.props.datas.map((data, i) => {
            return (
              <Row
                key={i}
                uuid={i}
                user={data.user}
                email={data.email}
                phone={data.phone}
                onDelete={this.props.onDelete}
              />
            );
          })}
        </tbody>
      </table>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datas: datasByRow, counter: datasByRow.lenght };
    this.onDelete = this.onDelete.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  onDelete(id) {
    const data_list = this.state.datas;
    data_list.splice(id, 1);
    this.setState({ datas: data_list, counter: data_list.lenght });
  }

  onCreate(user, email, phone) {
    this.setState({
      datas: this.state.datas.concat([{ user: user, email: email, phone: phone }])
    });
  }

  render() {
    return (
      <div className="table-responsive">
        <Inputs onCreate={this.onCreate} />
        <Table datas={this.state.datas} onDelete={this.onDelete} />
      </div>
    );
  }
}

class ApiClient {

    _apiData = 'https://jsonplaceholder.typicode.com';

    async getResource(url) {
        const response = await fetch(`${this._apiData}${url}`);

        if (!response.ok) {
            throw new Error(`Could not fetch  ${url}` + `, received ${response.status}`); // ловим ошибки сервера
        }
        return await response.json();
    }
    
    getAllUsers() {
        return this.getResource(`/users/`);
    }
    getUser(id) {
        return this.getResource(`/users/${id}`);
    }
}

const apiUsers = new ApiClient();

apiUsers
    .getAllUsers()
    .then((users) => {
        users.forEach((user) => {
            console.log(user.name);
        });
    })
    .catch((err) => {
        console.error('Could not fetch', err); // ошибки отсутствия данных (404)
    });



ReactDOM.render(<App />, document.getElementById("root"));
