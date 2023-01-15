import Swal from 'sweetalert2';

//function  before confirm choice
export const swalConfirm = async (title,icon,showCancelButton) => {
    const result = await Swal.fire({
        title: title,
        icon: icon,
        showCloseButton: false,
        showCancelButton: showCancelButton,
        focusConfirm: false,
        confirmButtonText:"OK",
        cancelButtonText:'Cancel'
    }) 
    return result;  
}


