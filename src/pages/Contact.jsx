import "../assets/css/contact.css";
import { EnvelopeOpenIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function Contact() {
    return <div className="page contact">
        <p className="heading">Contact me</p>
        <p className="paragraph">Feel free to contact me if you have any questions, or would like to work with me.</p>

        <div>
            <div>
                <EnvelopeOpenIcon height={24} />
                <a href="mailto:hmallen.cb@gmail.com">hmallen.cb@gmail.com</a>
            </div>
            <div>
                <PhoneIcon height={24} />
                +44 7942 642 970
            </div>
        </div>
    </div>;
}