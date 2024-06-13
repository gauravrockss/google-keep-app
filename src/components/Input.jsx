const Input = props => {
    const { name, id, placeholder, type } = props;
    return (
        <input
            name={name}
            id={id}
            placeholder={placeholder}
            type={type}
            className={name}
        />
    );
};

export default Input;
