"use client"

import React from "react"
import { motion } from "motion/react"

interface LoadingProps {
  fullScreen?: boolean
}

const Loading = ({ fullScreen = true }: LoadingProps) => {
  return (
    <div className={`${fullScreen ? "fixed inset-0 z-[9999]" : "relative w-full py-20"} flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm`}>
      <div className="relative flex items-center justify-center">
        {/* Book Container */}
        <div className="relative h-20 w-16 perspective">
          {/* Cover */}
          <div className="absolute inset-0 rounded-l-md border-r-2 border-indigo-700 bg-indigo-600 shadow-xl" />

          {/* Flipping Page */}
          <motion.div
            animate={{ rotateY: [0, -180, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 origin-left rounded-r-md bg-stone-100 shadow-inner"
            style={{ transformOrigin: 'left' }}
          />

          {/* Pages behind */}
          <div className="absolute inset-1 rounded-r-sm bg-stone-50" />
        </div>
      </div>

      {/* Text */}
      <div className="mt-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-indigo-700 tracking-tight">
          FaithBridge Academy
        </h2>
        <motion.p
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-sm text-muted-foreground"
        >
          জ্ঞান অর্জনের পথে...
        </motion.p>
      </div>
    </div>
  )
}

export default Loading