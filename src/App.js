import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import CarCreateForm from './pages/cars/CarCreateForm';
import CarPage from './pages/cars/CarPage';
import ProductPage from './pages/cars/ProductPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import ProfilePage from './pages/profiles/ProfilePage';
import CarEditForm from './pages/cars/CarEditForm';
import UsernameForm from './pages/profiles/UsernameForm';
import UserPasswordForm from './pages/profiles/UserPasswordForm';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import NotFound from './components/NotFound';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ProductPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <ProductPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/saves"
            render={() => (
              <ProductPage
                message="No results found. Adjust the search keyword or save a post."
                filter={`saves__owner__profile=${profile_id}&ordering=-saves__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/cars/create" render={() => <CarCreateForm />} />
          <Route exact path="/cars/:id" render={() => <CarPage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/cars/:id/edit" render={() => <CarEditForm />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
