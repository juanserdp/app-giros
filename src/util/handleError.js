import swal from "sweetalert";
export function handleError({ graphQLErrors, networkError, error }) {
  if (graphQLErrors) {
    if(graphQLErrors[0]) swal("Error!", graphQLErrors[0].message, "error");
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`, "from ModalAsesor.js");
    if (networkError.result.errors[0].message)
      swal("Error!", networkError.result.errors[0].message, "error");
  }
  if(error){
    swal("Error!", error, "error");
  }
}
