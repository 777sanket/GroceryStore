export default {
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(400%)" },
        },
        moveLeft: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        moveRight: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "-100% 100%" },
        },
      },
    },
  },
};
