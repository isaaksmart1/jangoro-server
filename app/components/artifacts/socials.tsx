import discord from "~/assets/img/discord.png";
import linkedin from "~/assets/img/linkedin.png";
import tiktok from "~/assets/img/tiktok.png";
import twitter from "~/assets/img/twitter.png";

export function Socials() {
  return (
    <div>
      <ul className="flex flex-wrap">
        <li className="social-icon p-2 mx-auto">
          <a
            href="https://www.producthunt.com/posts/openended?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-openended"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=727318&theme=dark"
              alt="OpenEnded - Discover&#0044;&#0032;create&#0032;&#0038;&#0032;collaborate&#0032;on&#0032;Ideas&#0046; | Product Hunt"
              style={{ width: 250, height: 54 }}
              width="250"
              height="54"
            />
          </a>
        </li>
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
