import Nav from "../../components/Nav/Nav";
import { RoundedButton } from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import TextBox from "../../components/textbox/TextBox";
import { textBoxTypes } from "../../lib/filterConstants";

const Contact = () => {
  return (
    <>
      <Nav />
      <div className="mt-32 px-40">
        <p className="text-4xl font-medium mb-10 mt-10 text-center">
          Contac us
        </p>
        <p className="text-center mb-10">
          Got question or any queries want to contact us?{" "}
        </p>
        <div className="px-72">
          <p className="my-2 text-blueGray-500 text-md leading-relaxed">
            Your email
          </p>
          <TextBox
            placeholder="email@gmail.com"
            type={textBoxTypes.Email}
            onChange={() => {}}
            value=""
          />
          <p className="my-2 text-blueGray-500 text-md leading-relaxed">
            Subject
          </p>
          <TextBox
            placeholder="Let us know how can we help you"
            type={textBoxTypes.Text}
            onChange={() => {}}
            value=""
          />
          <p className="my-2 text-blueGray-500 text-md leading-relaxed">
            Your message
          </p>
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Leave a comment ..."
            onChange={() => {}}
            value=""
          ></textarea>
          <div className="mt-10">
            <RoundedButton
              text="Submit"
              className="bg-[#d25a5f] text-white hover:bg-[#c72a2fe3] mr-4"
              onClickButton={() => {}}
            />
            <RoundedButton
              text="Cancel"
              className="bg-white text-black hover:bg-[#d1d1d1e3] border"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
