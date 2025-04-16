import DrawTitle from "./DrawTitle/DrawTitle";
import Title from "./Authors/Authors";
import './Intro.css';

export default function Intro() {
  return (
    <div className="intro">
      <DrawTitle />
      <div className="authors">
        <Title text="byy Samuel and Jan"></Title>
      </div>
    </div>
  );
}
