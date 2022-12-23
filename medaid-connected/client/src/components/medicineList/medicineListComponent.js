import React, { useState, createRef } from "react";
import "./style.scss";
import Skeleton from "react-loading-skeleton";
import { Images } from "../../utils/Images";

const Index = ({ medicines, loading, message }) => {
  const [staticArr] = useState([...Array(16).keys()]);
  const cardBody = createRef();

  // Check Loading
  if (loading) {
    return (
      <div>
        <div className="container py-3">
          <div className="row px-2 px-sm-0">
            {staticArr.map((i) => {
              return (
                <div className="col-6 col-md-4 col-lg-3 p-2" key={i}>
                  <div className="card rounded-0 border-0">
                    <Skeleton
                      animation={true}
                      count={1}
                      width={cardBody.width}
                      height={200}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="medicines-list-component">
      <div className="container">
        <div className="row px-2 px-sm-0">
          {medicines &&
            medicines.map((medicine, i) => (
              <div className="col-6 col-md-4 col-lg-3 p-2" key={i}>
                <div className="card medicine-card">
                  <div className="card-body">
                    <div className="content">
                      <img
                        src={Images.Medicine}
                        alt=""
                      />
                      <h5>----</h5>
                      <h6>
                        <b>{medicine.name}</b>
                      </h6>
                      <p className="text-capitalize">
                        Price: {medicine.price} tk/piece
                      </p>

                      {/* <p className="text-capitalize">{medicine._id}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
