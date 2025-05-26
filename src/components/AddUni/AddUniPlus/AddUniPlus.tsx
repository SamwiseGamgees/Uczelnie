import './AddUniPlus.css';
import { useNavigate } from 'react-router-dom';

export default function AddUniPlus() {
  const navigate = useNavigate();
  return (
    <div className="addUniBox">
      <img src="/media/plus.svg" alt="Add university" className="addUniIcon" onClick={() => navigate('/add-uni')}/>
    </div>
  );
}
