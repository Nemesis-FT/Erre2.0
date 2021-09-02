const customStyle ={
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black',
        padding: 1,
        textAlign: "left"
    }),
    container: (provided, state) => ({
        ...provided,
        backgroundColor: "transparent",
        color: "transparent",
        borderRadius: "0px"
    }),
    control: (provided, state) => ({
        ...provided,
        backgroundColor: "transparent",
        outline: "0px",
        color: "white"
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {...provided, opacity, transition};
    }
}

export default customStyle