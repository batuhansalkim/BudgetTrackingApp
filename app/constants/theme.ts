export const COLORS = {
    primary: "#2196F3",
    secondary: "#4CAF50",
    white: "#FFFFFF",
    black: "#000000",
    gray: "#757575",
    lightGray: "#F5F5F5",
    error: "#FF5252",
    success: "#4CAF50",
    warning: "#FFC107",
    info: "#2196F3",
    transparent: 'transparent',
    modalBackground: 'rgba(0, 0, 0, 0.5)',
};

export const SIZES = {
    base: 8,
    small: 12,
    font: 14,
    medium: 16,
    large: 18,
    extraLarge: 24,
    padding: 16,
    margin: 16,
    radius: 12,
};

export const FONTS = {
    regular: "System",
    medium: "System",
    bold: "System-Bold",
    light: "System",
};

export const SHADOWS = {
    light: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    medium: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    dark: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
}; 