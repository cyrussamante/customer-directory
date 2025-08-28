import { useEffect, useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerCard.css";
import type { Customer } from '../types/appState';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { getImage } from "../api/imagesAPI";


interface props {
    customer: Customer,
}

export default function CustomerCard({ customer }: props): ReactElement {

    const userRole = useSelector((state: RootState) => state.app.user.role);
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.app.token);

    const handleViewDetails = () => navigate(`/customers/${customer.id}`);

    const [profileImageUrl, setProfileImageUrl] = useState<string>("default-profile.png");

    useEffect(() => {
        const fetchImage = async () => {
            let imgSrc = "default-profile.png";

            if (customer?.imageUrl) {
                try {
                    const response = await getImage(customer.imageUrl, token);
                    imgSrc = URL.createObjectURL(response.data);
                    console.log(imgSrc)
                } catch (error: any) {
                    if (error?.response?.status === 401 || error?.response?.status === 404) {
                        imgSrc = "default-profile.png";
                    } else {
                        imgSrc = "default-profile.png";
                    }
                }
            }
            setProfileImageUrl(imgSrc);
        };
        fetchImage();
        return () => {
            if (profileImageUrl.startsWith("blob:")) {
                URL.revokeObjectURL(profileImageUrl);
            }
        };
    }, [customer, token]);

    return (
        <div className="card">
            <div className="icon">
                {userRole !== "ADMIN" && <VisibilityOffIcon />}
            </div>
            <div className="cardBody">
                <img className="customerImg" src={profileImageUrl} alt={customer.name} />
                <p>{customer.name}</p>
                <button disabled={userRole !== "ADMIN"} onClick={handleViewDetails}>View Details</button>
            </div>
        </div>
    )
}