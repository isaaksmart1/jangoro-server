import twitter from "~/assets/img/twitter.png";
import slack from "~/assets/img/slack.png"; // Add your Slack logo

export function Socials() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <ul className="flex flex-wrap justify-center space-x-4">
        <li>
          <a href="https://x.com/JangoroOfficial" className="group">
            <div className="p-4 bg-blue-400 rounded-full shadow-lg hover:bg-blue-500 transition duration-300">
              <img
                src={twitter}
                alt="X"
                className="h-12 w-12 group-hover:scale-110 transition-transform"
              />
            </div>
          </a>
        </li>

        <li>
          <a href="https://join.slack.com/t/jangoro/signup" className="group">
            <div className="p-4 bg-white rounded-full shadow-lg hover:bg-green-400 transition duration-300">
              <img
                src={slack}
                alt="Slack"
                className="h-12 w-12 group-hover:scale-110 transition-transform"
              />
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}
