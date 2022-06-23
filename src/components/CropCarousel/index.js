import styled from "@emotion/styled";
import { CropCard } from "./Card";
import Carousel from "./Carousel";
// import { cropsData } from "./cropsData";

export function Crops(props) {
  const { cropsData } = props;
  const Title = size => <h3>Total: {size} Crops Suggested</h3>;

  return (
    <Wrapper >
      <div className="container">
        <Carousel cardDist={25}
          navOnTop navTitle={Title.bind(null, cropsData.length)}
        >
          {
            cropsData.length > 0 ?
              (cropsData.map((crop, index) => (
                <CropCard key={index} crop={crop} />
              )))
              :
              <div>No Crop Suggestions</div>
          }
        </Carousel>
      </div>
    </Wrapper >
  );
}

const Wrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
  align-items: center;
  margin-left: 20px;
  width: 97%;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px #ccc;
  border-radius: 5px;

  & .container {
    padding: 15px 0;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;