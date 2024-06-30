const Colors = {
    white: '#FFFFFF',
    whiteShade: "#F4F4FE",
    black : '#111111',

    textColor1: '#24252C',
    textColor2: '#6E6A7C',
    textColor3: '#7C7C7C',
    textColor4: '#444444',

    primary: '#5F33E1',
    hintTextColor: '#9E9E9E',
    inActiveInput: '#FAFAFA',
    activeInput: '#F1EDFC',
    divider : '#D6D6D6',

    numberContainer : '#DDDDDD',
    selectedTile: '#EBEBEB',

    listTextBackground: '#F4F4F4',

    selectionColor : '#C2C2C2',

    blue: "#D1EAED",

    gray : "#616161",

    error : "#F67C69"
}

export default Colors;

const addOpacity = (color: string, opacity: number): string => {
    const normalizedOpacity = Math.max(0, Math.min(opacity, 1));
   
    const [r, g, b] = color.match(/\w\w/g)?.map((hex) => parseInt(hex, 16)) || [0, 0, 0];
    
    return `rgba(${r}, ${g}, ${b}, ${normalizedOpacity})`;
};

export {addOpacity};