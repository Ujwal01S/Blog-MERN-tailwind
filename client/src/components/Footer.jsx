import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterTitle,
} from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const FooterCom = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Anoymous
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow  US" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>

                <Footer.Link
                  href="https://www.discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <FooterTitle title="legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            href="#"
            by="Anoymous's Blog"
            year={new Date().getFullYear}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={FaFacebookF} />
            <Footer.Icon href="#" icon={FaInstagramSquare} />
            <Footer.Icon href="#" icon={FaGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
