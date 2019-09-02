import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Article = props => (
  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
    <div className="flex-column">
      {props.article.name}
      <p>
        <small>by {props.article.author}</small>
      </p>
      <span className="badge badge-info badge-pill">
        {" "}
        {props.article.published} - {props.article.read_time}
      </span>
    </div>
    <div className="actions">
      <Link to={"/edit/" + props.article.id}>Edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteArticle(props.article.id);
        }}
      >
        Delete
      </a>
    </div>
  </li>
);

class ArticlesList extends Component {
  constructor(props) {
    super(props);

    this.deleteArticle = this.deleteArticle.bind(this);

    this.state = { articles: [] };
  }

  componentDidMount() {
    axios
      .get(" https://rocky-bayou-13628.herokuapp.com/api/articles")
      .then(response => this.setState({ articles: response.data }))
      .catch(error => console.log(error));
  }

  deleteArticle(id) {
    axios
      .delete(" https://rocky-bayou-13628.herokuapp.com/api/articles/" + id)
      .then(response => console.log(response.data.message));

    this.setState({
      articles: this.state.articles.filter(article => article.id !== id)
    });
  }

  articlesList() {
    return this.state.articles.map(article => {
      return (
        <Article
          article={article}
          deleteArticle={this.deleteArticle}
          key={article.id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Articles List</h3>
        <ul className="list-group">{this.articlesList()}</ul>
      </div>
    );
  }
}

export default ArticlesList;
