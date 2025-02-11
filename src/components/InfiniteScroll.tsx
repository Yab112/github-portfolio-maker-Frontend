"use client";
import { techStack } from "../../data/staticdata"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDatabase } from "react-icons/fa"

interface InfiniteScrollProps {
    speed?: number
}

const iconMap: { [key: string]: React.ComponentType } = {
    FaReact,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaGitAlt,
    FaDatabase,
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ speed = 12 }) => {
    const controls = useAnimationControls()
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth)
        }
    }, [])

    useEffect(() => {
        if (containerWidth > 0) {
            controls.start({
                x: [-containerWidth, 0],
                transition: {
                    duration: containerWidth / speed,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                },
            })
        }
    }, [containerWidth, controls, speed])

    return (
        <div className="relative overflow-hidden mt-16" ref={containerRef}>
            <motion.div className="flex " animate={controls} style={{ width: `${containerWidth }px` }}>
                {[...Array(2)].map((_, groupIndex) => (
                    <div key={groupIndex} className="flex" style={{ width: `${containerWidth}px` }}>
                        {techStack.map((tech, index) => {
                            const IconComponent = iconMap[tech.icon]
                            return (
                                <div
                                    key={`${tech.id}-${groupIndex}-${index}`}
                                    className="flex flex-col items-center justify-center"
                                    style={{ width: `${containerWidth / techStack.length}px`, marginRight: '0.5rem' }}
                                >
                                    <div className={`text-6xl mb-2 ${tech.color}`}>
                                        <IconComponent />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

export default InfiniteScroll
