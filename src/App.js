import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.module.css';
import { axiosReq } from './api/axiosDefaults';
import Container from 'react-bootstrap/Container';
import SignInForm from './pages/auth/SignInForm';

function App() {
  const getCapsule = async () => {
    const response = await axiosReq.get("/capsules");
    const data = response.data;
    console.log(data);
  };

  return (
    <div className="App">
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
        </Switch>
      </Container>

    </div>
  );
}

export default App;
