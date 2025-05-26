import { useNavigate } from "react-router-dom";
export default function AddImage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-uni");
  };
  return (
    <button className="addUniButton" onClick={handleClick}>
      <svg
        className="addImg"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  );
}
