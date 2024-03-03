import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div>
            <h1>Welcome to the Fitt's Test</h1>
            <p>By Ryan Webb</p>
            <p>Click between the two squares as quickly as possible.</p>
            <Link to="/test/2">
                <button type="button">Begin</button>
            </Link>
        </div>
     );
}
 
export default Home;