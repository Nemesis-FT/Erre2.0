const customStyle = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? '#272121' : '#e1500b',
        backgroundColor: state.isSelected ? '#E0C097' : '#272121',
        padding: "8px",
        textAlign: "left",
        hover: "black",
    }),
    container: (provided, state) => ({
        ...provided,
        backgroundColor: "transparent",
        color: "white",
        "border-width": '0 0 2px 0',
        "border-radius": '4px 4px 0 0',

    }),
    control: (provided, state) => ({
        alignItems: "center",
        backgroundColor: "rgba(var(--bluelib-color-r), var(--bluelib-color-g), var(--bluelib-color-b), 0.05)",
        outline: "0px",
        borderRadius: "4px",
        borderWidth: "2px",
        borderStyle: "solid",
        display: "flex",
        flexWrap: "wrap",
        position: "relative",
        minHeight: "38px",
        transition: "all 100ms",
        boxSizing: "border-box",
        "border-color": 'rgba(var(--bluelib-color-r), var(--bluelib-color-g), var(--bluelib-color-b), 0.3)'
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        const color = ""

        return {...provided, opacity, transition, color};
    },
    valueContainer: (provided, state) => ({
        ...provided,
        color: "white"
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: ""
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: '#272121',
        borderRadius: "4px",
        borderWidth: "2px",
        borderStyle: "solid",
        "border-color": 'rgba(var(--bluelib-color-r), var(--bluelib-color-g), var(--bluelib-color-b), 0.3)'
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        backgroundColor: "rgba(var(--bluelib-color-r), var(--bluelib-color-g), var(--bluelib-color-b), 0.3)",
        width:"2px"
    })
}

export default customStyle