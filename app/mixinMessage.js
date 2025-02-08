import { serializeError } from "eth-rpc-errors";

export default {
  methods: {

    getMessage(error) {
      let message;
       if (error.response) {
        message =  error.response.data.message;
       } else if (error.message) {
         message = error.message;
        let rer = serializeError(error.message);
        message = rer.data.originalError;
        console.log({message});
        if (message.includes("execution reverted:"))
          message = rer.data.originalError
            .split("execution reverted: ")[1]
            .split("\n")[0];
      }
      else {
        message = error;
      }
      return message;
    },

    showErrorMessage(error) {
      console.log(error);


      this.$toast.error(this.getMessage(error), {
        position: "bottom-right",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.79,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
    showSuccess() {
      this.$toast.success(`Success`, {
        position: "bottom-right",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.79,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },

  }
}