import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditArticle extends Component {
  constructor(props) {
    super(props);

    this.onChangeArticleName = this.onChangeArticleName.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeReadTime = this.onChangeReadTime.bind(this);
    this.onChangePublishedDate = this.onChangePublishedDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      author: "",
      read_time: "",
      published: ""
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/articles/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          name: response.data.name,
          author: response.data.author,
          read_time: response.data.read_time,
          published: new Date(response.data.published)
        });
      });
  }

  onChangeArticleName(e) {
    this.setState({ name: e.target.value });
  }
  onChangeAuthor(e) {
    this.setState({ author: e.target.value });
  }
  onChangeReadTime(e) {
    this.setState({ read_time: e.target.value });
  }
  onChangePublishedDate(date) {
    this.setState({ published: date });
  }

  onSubmit(e) {
    e.preventDefault();

    const article = {
      name: this.state.name,
      author: this.state.author,
      read_time: this.state.read_time,
      published: this.state.published
    };

    console.log(article);

    axios
      .post(
        "http://localhost:5000/api/articles/" + this.props.match.params.id,
        article
      )
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Article</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onChangeArticleName}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              value={this.state.author}
              onChange={this.onChangeAuthor}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Read Time(min):</label>
            <input
              type="text"
              value={this.state.read_time}
              onChange={this.onChangeReadTime}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.published}
                onChange={this.onChangePublishedDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Article"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditArticle;
