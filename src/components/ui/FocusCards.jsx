"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FocusCards({ cards = [] }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="grid grid-cols-1 gap-8 p-4 w-full max-w-7xl mx-auto">
      {cards.map((card, idx) => (
        <motion.div
          key={card.title + idx}
          className="relative cursor-pointer rounded-xl overflow-hidden bg-white shadow-lg"
          layout
          onClick={() => setExpandedId(expandedId === idx ? null : idx)}
          initial={{ borderRadius: 16 }}
        >
          <motion.div
            className="relative h-64"
            layout
          >
            <img
              src={card.src}
              alt={card.title}
              className="object-cover w-full h-full"
            />
          </motion.div>

          <motion.div
            className="p-6"
            layout
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>

            <AnimatePresence>
              {expandedId === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-4"
                >
                  <div className="text-gray-700 text-sm">
                    {typeof card.content === "function" ? card.content() : card.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default FocusCards;