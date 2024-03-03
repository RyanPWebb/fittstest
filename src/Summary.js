import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Conclusion from "./Conclusion";

const Summary = () => {
    const { avg, difficulty } = useParams()
    return ( 
        <div>
            <h2>Difficulty {difficulty} Completed!</h2>
            <h3>Average Time: {avg}</h3>

            {/* <h2>STOP! Have Ryan Write down your time!</h2> */}
            {difficulty < 6 &&
            <Link to={`/test/${Number(difficulty)+1}`}>
                <button type="button">Next Difficulty</button>
            </Link>}

            {
                difficulty >=6 &&
                <Conclusion/>
        
            }
        </div>
     );
}
 
export default Summary;