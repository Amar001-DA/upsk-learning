\# Module 08 Integration Test Plan



\## Test 1



Name:

Booking Creation Propagation



Components:

Provider API

Availability API

Booking API



Setup:

Provider exists

Slot exists



Steps:



1\. View provider

2\. Select slot

3\. Create booking



Expected:

Booking confirmed



Contracts Validated:

provider\_id

slot\_id

booking\_id



\---



\## Test 2



Name:

Delegated Company Booking



Components:

Auth

Booking API



Setup:

Manager role user



Steps:



1\. Create booking for employee

2\. Submit booking



Expected:

Booking created successfully



Contracts Validated:

role

department

booked\_for\_email



\---



\## Test 3



Name:

Concurrent Booking Protection



Components:

Availability API

Booking API



Setup:

Single available slot



Steps:



1\. User A books slot

2\. User B books same slot



Expected:

One success

One slot\_not\_available error



Contracts Validated:

slot availability

conflict handling

error response schema



