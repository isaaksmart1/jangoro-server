import { motion } from "framer-motion";

export const AIChatCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="flex justify-center items-center p-5 mt-5"
    >
      {/* Pulsating AI Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-[350px] rounded-lg bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white p-4 relative shadow-lg shadow-blue-500/30"
      >
        <div className="flex items-center gap-3">
          {/* Icon Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-10 h-10 bg-white/20 flex justify-center items-center rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
          </motion.div>
          <h4 className="text-white text-lg m-0">Instant AI Assistance</h4>
        </div>

        <p className="text-white/80 mt-2">
          A bot that gathers insights and drives action from your survey data.
        </p>

        {/* Animated Messages */}
        <div className="mt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-blue-500/20 rounded-lg p-3 mb-2 shadow-md shadow-purple-500/30"
          >
            <p className="text-white">
              Hello! This survey shows an overall positive sentiment towards
              buying this product, suggesting an 85% satisfaction rating.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-purple-500/20 rounded-lg p-3 mb-2 shadow-md shadow-blue-500/30"
          >
            <p className="text-white">Can you help me summarize this survey?</p>
          </motion.div>
        </div>

        {/* Animated 'Ask AI...' button with moving neon glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          className="relative flex justify-between items-center mt-4 bg-purple-500/30 p-3 rounded-lg cursor-pointer overflow-hidden group shadow-md shadow-blue-500/30 border-2 border-transparent"
        >
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 rounded-lg border-[2px] border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-padding"
          ></motion.div>
          <p className="text-white relative z-10">Ask AI...</p>
          <span className="text-white text-lg mr-2 relative z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
