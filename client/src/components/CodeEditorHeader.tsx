"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const CodeEditorHeader = () => {
  const [code] = useState<string[]>([
    "interface User {",
    "  id: string;",
    "  role: 'student' | 'teacher' | 'dev';",
    "  courses: Course[];",
    "}",
    "",
    "function WelcomeMessage({ user }: { user: User }) {",
    "  return (",
    "    <div className='p-4 bg-blue-900/20'>",
    "      <h1>Welcome, {user.role}!</h1>",
    "      <p>You have {user.courses.length} courses</p>",
    "    </div>",
    "  )",
    "}",
  ]);

  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % code.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [code.length]);

  const highlightSyntax = (line: string) => {
    const elements = line.split(/(\{|\}|\(|\)|\<|\>|'|`|\$|\{|\})/g);

    return elements.map((part, i) => {
      if (part.match(/(interface|function|return)/))
        return (
          <span key={i} className="text-blue-400">
            {part}
          </span>
        );
      if (part.match(/(User|Course)/))
        return (
          <span key={i} className="text-emerald-400">
            {part}
          </span>
        );
      if (part.match(/['`]/))
        return (
          <span key={i} className="text-orange-300">
            {part}
          </span>
        );
      if (part.match(/(role|courses)/))
        return (
          <span key={i} className="text-purple-300">
            {part}
          </span>
        );
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/80 rounded-xl p-4 sm:p-6 font-mono text-sm sm:text-lg w-full h-[350px] sm:h-[440px] shadow-2xl border border-gray-700 backdrop-blur-sm flex flex-col"
    >
      <div className="flex mb-4 space-x-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>

      <div className="flex-1 grid grid-rows-6 gap-1 overflow-auto">
        {code.map((line, index) => (
          <motion.div
            key={index}
            className="flex items-start"
            initial={{ opacity: 0.5 }}
            animate={{
              opacity: index === currentLine ? 1 : 0.7,
              backgroundColor:
                index === currentLine
                  ? "rgba(76, 29, 149, 0.1)"
                  : "transparent",
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-gray-500 w-6 sm:w-8 flex-shrink-0">
              {index + 1}
            </span>
            <div className="flex-1 whitespace-pre">
              <span
                className={`${
                  index === currentLine ? "text-purple-300" : "text-gray-300"
                }`}
              >
                {highlightSyntax(line)}
              </span>
              {index === currentLine && (
                <motion.span
                  className="ml-1 inline-block w-2 bg-purple-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CodeEditorHeader;
