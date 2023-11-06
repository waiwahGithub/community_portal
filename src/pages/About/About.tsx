import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import SideBar from "../../components/SideBar/SideBar";
import Card from "../../components/card/Card";

const About = () => {
  const widthSize = WidthSizeDetection();

  return (
    <div className="bg-[#F0F2F5] min-h-screen ">
      <Nav />
      <SideBar />
      <div className="flex pt-28">
        <div
          className={`flex ${
            widthSize.mediumDevice ? "w-2/12 mr-14" : "w-3/12 mr-5"
          } `}
        ></div>
        <div
          className={`${widthSize.mediumDevice ? "basis-9/12" : "basis-7/12"}`}
        >
          <p className="ml-4 mb-5 text-2xl font-bold">About us</p>
          <hr className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          <p className="ml-4 mb-5 text-md font-bold">Our team</p>
          <p className="ml-4 mb-5 text-md">
            Make confident decisions through relevant content, actionable
            insights and world-class service with car portal.
          </p>
          <div className=" flex">
            <div className="column">
              <Card
                carMake="Jane Doe"
                carModel="CEO & Founder"
                datePosted="2021-11-09"
                sellerName="jane@example.com"
                cardImgSrc="https://www.w3schools.com/w3images/team1.jpg"
              />
            </div>

            <div className="column">
              <Card
                carMake="Mike Ross"
                carModel="Art Director"
                datePosted="2021-11-09"
                sellerName="mike@example.com"
                cardImgSrc="https://www.w3schools.com/w3images/team2.jpg"
              />
            </div>
          </div>
          <div className=" flex">
            <div className="column">
              <Card
                carMake="John Doe"
                carModel="Designer"
                datePosted="2021-11-09"
                sellerName="john@example.com"
                cardImgSrc="https://www.w3schools.com/w3images/team3.jpg"
              />
            </div>

            <div className="column">
              <Card
                carMake="Ross"
                carModel="Technician"
                datePosted="2021-11-09"
                sellerName="mike@example.com"
                cardImgSrc="https://www.w3schools.com/w3images/team4.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
