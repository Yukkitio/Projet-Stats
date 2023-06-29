import Navbar from "../components/navbar";

export default function HomePageUi ({body}) {
    return (
        <div>
            <Navbar />
            {body}
        </div>
    )
}