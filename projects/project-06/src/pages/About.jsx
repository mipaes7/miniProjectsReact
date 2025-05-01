import { Link } from '../Link'

const AboutPage = () => {
  return (<>
    <h1>About</h1>
    <div>
      <img src='https://avatars.githubusercontent.com/u/165817758?v=4' alt='miguelFoto' />
      <p>Creating a React Router clone</p>
    </div>
    <Link to='/'>Home</Link>
  </>)
}

export default AboutPage