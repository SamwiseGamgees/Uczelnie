import './MenuButton.css';

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
}

export default function MenuButton({children, ...props} : buttonProps){
    return(
        <button className='menuButton' {...props}>{children}</button>
    );
}