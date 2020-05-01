import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
toast.configure();

export default function Toaster ( message , toastType ) {
  // toast.dismiss();

  const options = {
    type: toastType, // error, success, info, warning, dark, default
    position : 'top-center', // top-left,top-center,top-right,bottom-left,bottom-center,bottom-right
    autoClose: 6000, // default time to live on screnn false to keep it alive
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    pauseOnFocusLoss: true,
    rtl: false, // right-to left
    newestOnTop: true,
    progress: undefined, // to show default proress bar 0.0 to 1.0
    toastId: message
    // onOpen: () => window.alert('Called when I open'),
    // onClose: () => window.alert('Called when I close')
  };
  toast(message, options);

}
