//COMPONENTE BUTTON
import './Button.styles.css'; 

export const Button = ({searchValue,text, onClick, disabled}) =>{

    return !searchValue ? (
        <button  
            className='button'
            onClick={onClick}
            disabled={disabled}
            >
            {text}
        </button>
    ): null
}