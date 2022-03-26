import "./TextInput.styles.css"

export const TextInput = ({searchValue, handleChange}) =>{
    return(
        <>
            <div>
                {!!searchValue && (
                    <h1>Search value: {searchValue}</h1>
                )}
            </div>
            <input
                className="text-input-container"
                type="search"
                onChange={handleChange}
                value={searchValue} 
                placeholder="Type your search"
            />
            <br/>
            <br/>
            <br/>
        </>
    );
}