import './Navigate.css'
import { Link } from "react-router-dom";
const Navigate = () => {
    return (
        <div>
    <div class="bg-img">
    <div class="container">
      <div class="topnav">
        <Link to="/History"> History </Link> 
        <Link to="/Hadith"> Hadith </Link> 
      </div>
    </div>
  </div>
  </div>
    );
}

export default Navigate;