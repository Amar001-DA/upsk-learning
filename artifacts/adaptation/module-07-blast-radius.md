\# Module 07 Blast Radius Analysis



\## Company Accounts Requirement



| Artifact            | Status    | Impact                                                         |

| ------------------- | --------- | -------------------------------------------------------------- |

| User data model     | MAJOR     | Add company\_name and can\_book\_for\_others fields                |

| Auth/JWT system     | MINOR     | Include can\_book\_for\_others claim in token/session context     |

| Booking flow (API)  | MAJOR     | Add booked\_for\_name and booked\_for\_email fields and validation |

| Booking flow (UI)   | MAJOR     | Show delegation fields when can\_book\_for\_others=true           |

| Provider dashboard  | MINOR     | Display booking owner and booking recipient                    |

| Search/listing      | NO IMPACT | Provider discovery unchanged                                   |

| Payment/billing     | MINOR     | Continue billing booking owner account                         |

| Interface contracts | MAJOR     | Update booking request/response contracts                      |

| Tickets completed   | NO IMPACT | Preserve completed work                                        |

| Tickets in progress | MINOR     | Update contracts where required                                |

| Tickets not started | MAJOR     | Re-evaluate against new requirement                            |



\## Compressed Timeline



\### MUST SHIP



\* Provider Registration

\* Provider Listing

\* Provider Availability

\* Booking Creation

\* Company Booking Support



\### SHOULD SHIP



\* Availability Management

\* Basic Payment Demo



\### CUT



\* Advanced Search Filters

\* Provider Analytics Dashboard

\* Reviews and Ratings

\* Notification Enhancements



