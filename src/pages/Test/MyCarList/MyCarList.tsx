import React, { useEffect, useState } from "react";
import Nav from "../../../components/Nav/Nav";
import banner from "../../assets/img/home-banner.png";
import ImageContainer from "../../../components/image/Image";
import SearchBox from "../../../components/searchbox/SearchBox";
import Card from "../../../components/card/Card";
import useGetCarDetailsQuery from "../../../hooks/use-GetCarDetailsQuery";
import Footer from "../../../components/footer/Footer";
import useGetUserDetailsQuery from "../../../hooks/use-GetUserDetailsQuery";
import useUpdateCarStatusQuery from "../../../hooks/use-UpdateCarStatusQuery";

interface Props {
  border: string;
}

const Home = () => {
  const [filterName, setFilterName] = useState<string>("");
  const carData = useGetCarDetailsQuery();
  const userData = useGetUserDetailsQuery();
  const [jwtToken, setJWTToken] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const localInfoQuery = JSON.parse(jwtToken);
  const [carId, setCarId] = useState<any>();
  const [carStatus, setCarStatus] = useState<any>();
  const [isCardBtnClicked, setIsCardBtnClicked] = useState<boolean>(false);
  const updateCarStatusQuery = useUpdateCarStatusQuery(
    isCardBtnClicked,
    carId,
    carStatus
  );

  const onCardBtnClicked = (carId: any, carStatus: any) => {
    setCarId(carId);

    if (carStatus === "0") {
      setCarStatus("1");
    } else {
      setCarStatus("0");
    }

    setIsCardBtnClicked(true);
  };

  useEffect(() => {
    if (updateCarStatusQuery.isFetched) {
      alert("Status updated");
      window.location.reload();
    }
  }, [updateCarStatusQuery.isFetched]);

  const [isCarListEmptyByProfile, setIsCarListEmptyByProfile] = useState<any>();

  useEffect(() => {
    carData?.data?.body.map((car: any, index: any) => {
      // Find the user with the matching carId
      const matchingUser = carData?.data?.body?.find(
        (car: any) => localInfoQuery.username === car.userEmail
      );

      setIsCarListEmptyByProfile(matchingUser);
    });
  }, [isCarListEmptyByProfile, carData]);

  return (
    <div>
      <Nav />
      <div className="mb-24">
        <div className="container mx-auto px-4 md:px-12 mt-40">
          <p className="text-3xl font-bold">My Car List</p>
        </div>
        <div className={`container mx-auto px-4 md:px-12`}>
          {!isCarListEmptyByProfile && (
            <p>Your car list empty, please upload your car to sell now</p>
          )}
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
            {carData?.data &&
              carData?.data?.body
                ?.filter((car: any) =>
                  car.make.toLowerCase().includes(filterName.toLowerCase())
                )
                .filter(
                  (car: any) => car.userEmail === localInfoQuery?.username
                )
                .map((car: any, index: any) => {
                  // Find the user with the matching carId
                  const matchingUser = userData?.data?.body?.find(
                    (user: any) => user.username === car.userEmail
                  );

                  const createdDateTimeArray = car.createdDateTime; // Replace with the actual property name

                  // Convert the array to a JavaScript Date object
                  const createdDateTime = new Date(
                    createdDateTimeArray[0],
                    createdDateTimeArray[1] - 1, // Months are zero-based
                    createdDateTimeArray[2],
                    createdDateTimeArray[3],
                    createdDateTimeArray[4],
                    createdDateTimeArray[5]
                  );

                  // Format the date as a user-friendly string
                  const formattedDateTime = createdDateTime.toLocaleString();

                  return (
                    <Card
                      key={index}
                      carMake={car.make}
                      carModel={car.model}
                      datePosted={formattedDateTime}
                      sellerName={matchingUser?.firstName}
                      className="lg:w-1/4 md:w-1/2"
                      cardImgSrc={car.carProfileImg}
                      profileImgSrc={matchingUser?.profileImage}
                      btnText={car.status === "0" ? "Activated" : "Deactivated"}
                      btnClassName={
                        car.status === "0" ? "bg-green-300" : "bg-red-300"
                      }
                      btnOnClickHandler={() =>
                        onCardBtnClicked(car.carId, car.status)
                      }
                      isBtnVisible={true}
                    />
                  );
                })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
