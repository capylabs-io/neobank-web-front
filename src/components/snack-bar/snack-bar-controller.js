import { defineStore } from "pinia";
import _ from 'lodash';
export const snackBarController = defineStore("snackBarController", {
    state: () => ({
        icon: "",
        message: "",
        color: "",
        timeout: 5000,
        show: false
    }),
    actions: {
        success(message) {
            this.icon = 'mdi-check-circle';
            this.message = message;
            this.color = 'success';
            this.timeout = 4000;
            this.show = true;
        },
        commonError(err) {
            let message = 'Please try again'
            // strapi error
            const apiError = _.get(err, 'response.data.message')
            console.error(apiError, err)
            if (apiError) {
              if (apiError instanceof Array) {
                let errMsg = _.first(apiError)
                if (errMsg) errMsg = errMsg.messages
                if (errMsg) errMsg = _.first(errMsg)
                if (errMsg) errMsg = errMsg.message
                if (errMsg) message = errMsg
              } else if (apiError instanceof String) {
                message = apiError
              }
            }
            this.error(message)
          },
          error(message) {
            this.icon = 'mdi-alert-circle-outline';
            this.message = message;
            this.color = 'error';
            this.timeout = 5000;
            this.show = true;
          },
        close() {
            this.show = false;
        }
    }
})