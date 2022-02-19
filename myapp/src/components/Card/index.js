import { Skeleton } from "antd";
import PropTypes from "prop-types";

const Card = ({ avatar_url, id, login }) => {
  return id ? (
    <div className="item" key={id}>
      <img alt={login} src={avatar_url} />
      <h3>{login}</h3>
      <p>Lorem Dollar ipsum..... test data</p>
    </div>
  ) : (
    <Skeleton />
  );
};

Card.propTypes = {
  avatar_url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired,
};

export default Card;
