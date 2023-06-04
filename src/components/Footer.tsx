import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoDiscord,
  IoHomeSharp,
  IoStorefrontSharp,
  IoGameController,
} from "react-icons/io5";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerFirst">
        <div className="footerConnect">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="footerSocial">
          <a href="#!" className="footerLinkSVG">
            <IoLogoFacebook />
          </a>
          <a href="#!" className="footerLinkSVG">
            <IoLogoInstagram />
          </a>
          <a href="#!" className="footerLinkSVG">
            <IoLogoTwitter />
          </a>
          <a href="#!" className="footerLinkSVG">
            <IoLogoDiscord />
          </a>
        </div>
      </div>
      <hr />
      <div className="footerMain ">
        <div className="footerGrid">
          <div className="">
            <h6 className="footerGridTtle">
              <IoHomeSharp />
              <p> Gaming Platform </p>
            </h6>
            <p>For every question we are here with an answer.</p>
          </div>
          <div className="">
            <h6 className="footerGridTtle">Useful links</h6>
            <div className="footerGridParagraph">
              <a href="/" className="footerGridLink">
                <IoHomeSharp />
                <p>Home</p>
              </a>
            </div>
            <div className="footerGridParagraph">
              <a href="/store" className="footerGridLink">
                <IoStorefrontSharp />
                <p>Store</p>
              </a>
            </div>
            <div className="footerGridParagraph">
              <a href="/games" className="footerGridLink">
                <IoGameController />
                <p>Games</p>
              </a>
            </div>
          </div>
          <div className="">
            <h6 className="footerGridTtle">About</h6>
            <div className="footerGridParagraph">
              <Link href="about" className="footerGridLink">
                About Us
              </Link>
            </div>
            <div className="footerGridParagraph">
              <Link href="contact" className="footerGridLink">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="">
            <h6 className="footerGridTtle">Help</h6>
            <div className="footerGridParagraph">
              <Link href="help/faq" className="footerGridLink">
                FAQ
              </Link>
            </div>
            <div className="footerGridParagraph">
              <Link href="help/return" className="footerGridLink">
                Return Policy
              </Link>
            </div>
            <div className="footerGridParagraph">
              <Link href="help/ticket" className="footerGridLink">
                Create a ticket
              </Link>
            </div>
            <div className="footerGridParagraph">
              <Link href="/gdpr" className="footerGridLink">
                GDPR
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footerCopyright">
        <span>© 2023 Copyright</span>
      </div>
    </footer>
  );
}
