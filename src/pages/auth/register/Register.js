import React, { useState } from "react";
import '../Auth.scss';
import Carousel from '../../../components/caroucel/CaroucelComponent';
import PersonalDetails from "./components/PersonalDetails";
import UserPassword from "./components/UserPassword";

export default function Register() {
  const [step, setstep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    city: ''
  })

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };


  const handleInputData = input => e => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [input]: value
    }));
  }

  switch (step) {
    case 1:
      return (
        <div className="auth">
          <body>
            <div className="row">
              <div className="column left">
                <Carousel />
              </div>
              <div className="column right">
                <PersonalDetails
                  nextStep={nextStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </div>
            </div>
          </body>
          <footer>
          </footer>
        </div>
      );

    case 2:

      return (
        <div className="auth">
          <body>
            <div className="row">
              <div className="column left">
                <Carousel />
              </div>
              <div className="column right">
                <UserPassword
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </div>
            </div>
          </body>
          <footer>
          </footer>
        </div>
      );

    default:
    // do nothing
  }
}
