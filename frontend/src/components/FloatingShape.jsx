import { motion } from 'framer-motion';

const FloatingShape = ({ color, size, top, left, delay }) => {
    return (
            <motion.div
                style={{ top, left }}
                animate={{ x: ["0%", "100%", "0%"], y: ["0%", "100%", "0%"], rotate: [0, 360], scale: [1.2, 1.5, 1] }}
                transition={{ ease: "easeOut", duration: 15, repeat: Infinity }}
                className={`absolute rounded-full ${color} ${size} ${delay} opacity-15 blur-xl`}
                aria-hidden="true"
            />
        
    )
}

export default FloatingShape;