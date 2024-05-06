import "./Footer.css";
import { WhatsAppOutlined, PhoneOutlined, InstagramOutlined } from "@ant-design/icons";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <WhatsAppOutlined />
            <PhoneOutlined />
            <InstagramOutlined />
        </div>
    );
}

export default Footer;
