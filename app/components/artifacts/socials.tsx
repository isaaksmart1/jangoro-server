import discord from "~/assets/img/discord.png";
import linkedin from "~/assets/img/linkedin.png";
import tiktok from "~/assets/img/tiktok.png";
import twitter from "~/assets/img/twitter.png";

export function Socials() {
  return (
    <div>
      <ul className="flex flex-wrap">
        <li className="social-icon p-2 mx-auto"></li>
      </ul>
      <ul className="flex flex-wrap justify-center">
        <li className="social-icon bg-purple-500 p-4 m-2">
          <a href="https://discord.com/invite/bapedUtcEv">
            <img src={discord} alt="Discord" className="h-12 w-12" />
          </a>
        </li>
        <li className="social-icon bg-oe-accent p-4 m-2">
          <img src={linkedin} alt="LinkedIn" className="h-12 w-12" />
        </li>
        <li className="social-icon bg-oe-white p-4 m-2">
          <a href="https://x.com/openended">
            <img src={twitter} alt="X" className="h-12 w-12" />
          </a>
        </li>
        <li className="social-icon bg-oe-white p-4 m-2">
          <a href="https://www.tiktok.com/@openended">
            <img src={tiktok} alt="TikTok" className="h-12 w-12" />
          </a>
        </li>
      </ul>
    </div>
  );
}
