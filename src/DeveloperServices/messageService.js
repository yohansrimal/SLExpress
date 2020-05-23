import http from "./httpService";
import { apiUrl } from "../config.json";

const ticketSubmitEndpoint = apiUrl + "/tickets/submitTicket";
const replyEndpoint = apiUrl + "/tickets/userReply";
const ticketListEndpoint = apiUrl + "/tickets/getTickets";
const getTicketEndpoint = apiUrl + "/tickets/getTicket";

export function getTickets() {
  return http.get(ticketListEndpoint);
}

export function viewTicket(t_id) {
  return http.post(getTicketEndpoint, {
    ticketId: t_id,
  });
}

export function submitTicket(ticketTitle, ticketMsg) {
  return http.put(ticketSubmitEndpoint, {
    title: ticketTitle,
    ticketText: ticketMsg,
  });
}

export function reply(t_id, ticketMsg) {
  return http.put(replyEndpoint, {
    reply: ticketMsg,
    ticketId: t_id,
  });
}
