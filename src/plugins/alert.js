export default {
  alertData: {
    show: false,
    message: "",
    type: "error",
    isLastMessage: false,
  },
  close() {
    Object.assign(this.alertData, { show: false, message: "" });
  },
  show(type, message, isLastMessage) {
    Object.assign(this.alertData, { show: true, type, message, isLastMessage });
  },
  error(msg, isLastMessage = false) {
    this.close();
    this.show("error", msg, isLastMessage);
  },
  success(msg, isLastMessage = false) {
    this.show("success", msg, isLastMessage);
  },
  warn(msg, isLastMessage = false) {
    this.show("warning", msg, isLastMessage);
  },
};
