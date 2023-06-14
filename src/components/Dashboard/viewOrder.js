import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const navigate = useNavigate();
const dispatch = useDispatch();

function viewOrder(event, orderID) {
  event.preventDefault();
  axios
    .post(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/get-order`, {
      orderID,
    })
    .then((res) => {
      dispatch(setOrder(res));
      navigate("/view-order");
    })
    .catch((err) => toast.error("Oops, something went wrong!"));
}

export default viewOrder;
