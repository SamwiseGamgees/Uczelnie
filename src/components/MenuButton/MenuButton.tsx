import './MenuButton.css';

interface buttonProps{
    children: React.ReactNode;
}

export default function MenuButton({children} : buttonProps){
    return(
        <button className='menuButton'>{children}</button>
    );
}