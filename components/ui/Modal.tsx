"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Elevated Popover container (Level 2 glass) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={cn(
              "w-full max-w-lg bg-white/[0.05] backdrop-blur-[40px] border border-white/15 rounded-3xl p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative z-10 rim-light max-h-[85vh] overflow-y-auto custom-scrollbar",
              className
            )}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              {title ? (
                <h3 className="font-sans text-[20px] font-semibold tracking-wide uppercase text-on-surface">
                  {title}
                </h3>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-primary/40 text-on-surface-variant hover:text-primary transition-all flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="relative text-on-surface-variant">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default Modal;
