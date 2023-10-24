"use client";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question:
        "Can I use the game keys purchased from your platform in any country?",
      answer:
        "The availability of game keys and regional restrictions may vary depending on the publisher and game. We strive to offer global availability for most game keys; however, certain keys may be region-specific. It's important to review the product details or consult our customer support to ensure compatibility with your country or region before purchasing a game key.",
      showAnswer: false,
    },
    {
      id: 2,
      question: "How often do you update your game key inventory?",
      answer:
        "We regularly update our inventory of game keys for PC, Xbox, PlayStation, and Nintendo platforms. We strive to provide a wide selection of the latest and popular games. New game keys are added as they become available, and we recommend visiting our website or subscribing to our newsletter for updates on new releases and promotions.",
      showAnswer: false,
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods, including major credit cards (Visa, Mastercard, American Express), PayPal, and digital wallets such as Apple Pay and Google Pay. During the checkout process, you can select your preferred payment method and proceed with the transaction securely.",
      showAnswer: false,
    },
    {
      id: 4,
      question:
        "What should I do if I encounter technical issues or key-related problems?",
      answer:
        "If you experience any technical issues or key-related problems, please submit a ticket through our support page or contact our customer support team via email. Provide detailed information about the issue you're facing, including any error messages you encounter. Our support team will assist you in resolving the problem and getting back to you as soon as possible.",
      showAnswer: false,
    },
    // Add more questions here if needed
  ]);

  const handleButtonClick = (id: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? { ...question, showAnswer: !question.showAnswer }
          : question
      )
    );
  };

  return (
    <div className="bg-firstColor">
      <div className="lg:px-40 md:px-32 md:py-24 px-10 py-10">
        <div className="text-4xl pb-8">
          <h2 className="text-2xl md:text-4xl text-[#e6bbff]">
            Frequently Asked Questions
          </h2>
        </div>
        <hr className="border-[#5A189A]" />
        {questions.map((question) => (
          <div key={question.id} className="text-xl pt-4 ">
            <button
              className="flex w-full justify-between items-center pb-4"
              onClick={() => handleButtonClick(question.id)}
            >
              <p className="text-xl text-[#e6bbff]">{question.question}</p>

              <span>{question.showAnswer ? <FiMinus /> : <FiPlus />}</span>
            </button>
            <AnimatePresence>
              {question.showAnswer && (
                <motion.div
                  className="text-lg text-justify pb-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <p className="mr-6 md:mr-10"> {question.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <hr className="border-[#5A189A]" />
          </div>
        ))}
      </div>
    </div>
  );
}
