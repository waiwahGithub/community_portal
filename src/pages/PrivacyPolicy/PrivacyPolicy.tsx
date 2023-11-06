import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import SideBar from "../../components/SideBar/SideBar";
import Card from "../../components/card/Card";

const PrivacyPolicy = () => {
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
          <p className="ml-4 mb-5 text-2xl font-bold">Privacy Policy</p>
          <hr className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          <p className="ml-4 mb-5 text-md font-bold">Terms and Conditions</p>
          <p className="ml-4 mb-5 text-md">
            These terms and conditions outline the rules and regulations for the
            use of Company Name's Website, located at Website.com. By accessing
            this website we assume you accept these terms and conditions.
          </p>
          <p className="ml-4 mb-5 text-md">
            Do not continue to use Website Name if you do not agree to take all
            of the terms and conditions stated on this page.{" "}
          </p>
          <p className="ml-4 mb-5 text-md">
            The following terminology applies to these Terms and Conditions,
            Privacy Statement and Disclaimer Notice and all Agreements:
            “Client”, “You” and “Your” refers to you, the person log on this
            website and compliant to the Company's terms and conditions. “The
            Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company.
            “Party”, “Parties”, or “Us”, refers to both the Client and
            ourselves. All terms refer to the offer, acceptance and
            consideration of payment necessary to undertake the process of our
            assistance to the Client in the most appropriate manner for the
            express purpose of meeting the Client's needs in respect of
            provision of the Company's stated services, in accordance with and
            subject to, prevailing law of Netherlands. Any use of the above
            terminology or other words in the singular, plural, capitalization
            and/or he/she or they, are taken as interchangeable and therefore as
            referring to same.
          </p>
          <p className="ml-4 mb-5 text-md font-bold">Cookies</p>
          <p className="ml-4 mb-5 text-md">
            We employ the use of cookies. By accessing Website Name, you agreed
            to use cookies in agreement with the Company Name's Privacy Policy.
          </p>
          <p className="ml-4 mb-5 text-md">
            Most interactive websites use cookies to let us retrieve the user's
            details for each visit. Cookies are used by our website to enable
            the functionality of certain areas to make it easier for people
            visiting our website. Some of our affiliate/advertising partners may
            also use cookies.
          </p>
          <p className="ml-4 mb-5 text-md font-bold">License</p>
          <p className="ml-4 mb-5 text-md">
            Unless otherwise stated, Company Name and/or its licensors own the
            intellectual property rights for all material on Website Name. All
            intellectual property rights are reserved. You may access this from
            Website Name for your own personal use subjected to restrictions set
            in these terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
