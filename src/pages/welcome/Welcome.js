import { Link, Navigate } from 'react-router-dom';
import '../../App.scss'
import './Welcome.scss'
import { useSelector } from "react-redux";
export default function Dashboard() {

  const { isLoggedIn } = useSelector(state => state.auth);

  const navbarInfo = {
    showSearch: false,
    showAddBtn: false,
    showLogOut: false
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="welcosme">
      <header className="app-header">
        <br></br>
        <h1>Descoperă totul într-un singur loc</h1>
        <p>  De la obiectele tale neutilizate la comori pentru alții</p>
        {/* <div className='hide-on-mobile'>
          <p>Please log in to continue.</p>
          <Link to="/login"><button type="button">Login</button></Link>
        </div> */}
      </header>
    </div>
  );
}