interface SlackIconProps {
  count?: number;
}

interface ThresholdMessage {
  threshold: number;
  message: string;
}

// Define thresholds and their messages together, ordered from lowest to highest
const THRESHOLD_MESSAGES: ThresholdMessage[] = [
  { threshold: 0, message: "All good in the hood! 😎" },
  { threshold: 5, message: "You might actually read these 📬" },
  { threshold: 10, message: "Still manageable... barely 😅" },
  { threshold: 25, message: "Nothing a good coffee can't fix ☕" },
  { threshold: 50, message: "Just another Monday morning 🥱" },
  { threshold: 75, message: "Someone discovered @channel 😱" },
  { threshold: 100, message: "Your notifications are breeding 🐰" },
  { threshold: 150, message: "Getting spicy in here! 🌶️" },
  { threshold: 200, message: "The calm before the storm ⛈️" },
  { threshold: 300, message: "Time to pretend you're in a meeting 📅" },
  { threshold: 400, message: "Your mouse is already sweating 🖱️💦" },
  { threshold: 500, message: "Coffee break's over, buddy! ☕" },
  { threshold: 750, message: "Did you forget to mute #general again? 🤦‍♂️" },
  {
    threshold: 1000,
    message: "Someone's been having fun while you were away 🎉",
  },
  {
    threshold: 1250,
    message: "Your keyboard is about to file for emotional damage ⌨️",
  },
  { threshold: 1500, message: "Might as well call in sick today 🤒" },
  { threshold: 1750, message: "Have you considered witness protection? 🕵️‍♂️" },
  { threshold: 2000, message: "Oh, you're f*cked! 💀" },
  { threshold: 2500, message: "Time to fake a power outage 🔌" },
  {
    threshold: 3000,
    message: "Legend says they're still @here-ing to this day 👻",
  },
  {
    threshold: 5000,
    message: "Just declare bankruptcy and start a new life 🏃‍♂️💨",
  },
];

const getNextThreshold = (currentCount: number): number => {
  // Find the current threshold index
  const currentIndex = THRESHOLD_MESSAGES.findIndex(
    ({ threshold }) => threshold === currentCount
  );

  // If current count matches a threshold, go to next one
  if (currentIndex !== -1) {
    const nextIndex = (currentIndex + 1) % THRESHOLD_MESSAGES.length;
    return THRESHOLD_MESSAGES[nextIndex].threshold;
  }

  // Find the next higher threshold
  const nextMessage = THRESHOLD_MESSAGES.find(
    ({ threshold }) => threshold > currentCount
  );

  // If no higher threshold exists, wrap around to first
  if (!nextMessage) {
    return THRESHOLD_MESSAGES[0].threshold;
  }

  return nextMessage.threshold;
};

const getNotificationMessage = (count: number): string => {
  // Find the highest threshold that's lower than the count
  const { message } =
    THRESHOLD_MESSAGES.slice()
      .reverse()
      .find(({ threshold }) => count > threshold) ?? THRESHOLD_MESSAGES[0];
  return message;
};

export const SlackIcon = ({ count = 637 }: SlackIconProps) => {
  const nextCount = getNextThreshold(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative inline-block">
        {/* White background with rounded edges */}
        <div className="bg-white rounded-4xl p-4 shadow-lg">
          {/* Slack Icon */}
          <svg
            className="w-32 h-32"
            viewBox="0 0 2447.6 2452.5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipRule="evenodd" fillRule="evenodd">
              {/* Bottom-right square */}
              <path
                d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
                fill="#36c5f0"
              />
              {/* Top-right square */}
              <path
                d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
                fill="#2eb67d"
              />
              {/* Top-left square */}
              <path
                d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
                fill="#ecb22e"
              />
              {/* Bottom-left square */}
              <path
                d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
                fill="#e01e5a"
              />
            </g>
          </svg>
        </div>

        {/* Notification Badge */}
        {count > 0 && (
          <div className="absolute -top-3 -right-3 bg-red-500 text-white text-sm font-bold rounded-full min-w-[2.5rem] h-10 flex items-center justify-center px-2">
            {count}
          </div>
        )}
      </div>

      {/* Message */}
      {count > -1 && (
        <div className="text-xl text-center font-semibold text-white bg-gray-800/80 px-6 py-3 rounded-md backdrop-blur-sm">
          {getNotificationMessage(count)}
        </div>
      )}

      {/* Next Threshold Link */}
      <a
        href={`?count=${nextCount + 1}`}
        className="mt-50 px-5 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-colors duration-200 text-center"
      >
        {`-> Click to feed the notifications! 🍔 <-`}
      </a>
    </div>
  );
};
