import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Create = ({ match }) => {
  console.log(match);
  return <div>{match.params.id}</div>;
};

export default Create;
