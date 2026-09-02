import NavBar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';

import { SmallImageCard } from '../components/cards.tsx';

import defaultImage from '../images/lights.jpg';

export default function WebPage(){
    return (
        <div>
            <NavBar selected={4} />
            <SmallImageCard image={defaultImage} title="Title" description="Description" />
            <Footer includeProjectButton={true} includeContactButton={true} />
            
        </div>
    );
}